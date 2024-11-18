BEGIN;

-- Add slug column to the "steps" table
ALTER TABLE "steps" ADD COLUMN "slug" TEXT UNIQUE;

-- Create or replace the slugify function
CREATE OR REPLACE FUNCTION slugify(input TEXT) RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      trim(regexp_replace(input, '[^a-zA-Z0-9]+', '-', 'g')),  -- Replace non-alphanumeric with '-'
      '^-+|-+$',                                              -- Trim leading/trailing hyphens
      '',                                                     -- Replace with empty string
      'g'                                                     -- Global replacement
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Populate slug for existing records
DO $$
DECLARE
  record RECORD;
  unique_slug TEXT;
BEGIN
  FOR record IN SELECT "id", "title" FROM "steps" WHERE "slug" IS NULL LOOP
    unique_slug := slugify(record.title);

    -- Ensure unique slugs
    WHILE EXISTS (SELECT 1 FROM "steps" WHERE "slug" = unique_slug AND "id" != record.id) LOOP
      unique_slug := slugify(record.title) || '-' || substring(gen_random_uuid()::TEXT FROM 1 FOR 8);
    END LOOP;

    UPDATE "steps"
    SET "slug" = unique_slug
    WHERE "id" = record.id;
  END LOOP;
END $$;


ALTER TABLE content_audit_log ADD COLUMN step_slug VARCHAR(255);

-- Backfill step_slug in content_audit_log table
UPDATE content_audit_log
SET step_slug = s.slug
FROM steps s
WHERE content_audit_log.step_id = s.id
  AND content_audit_log.step_slug IS NULL;

-- Update behavior of the content audit log trigger
-- Step 1: Drop the existing trigger and function
DROP TRIGGER IF EXISTS insert_content_audit_log_on_change_step_tr ON steps;
DROP FUNCTION IF EXISTS insert_content_audit_log_on_change_step_fn;

-- Step 2: Redefine the updated function
CREATE OR REPLACE FUNCTION insert_content_audit_log_on_change_step_fn()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO content_audit_log AS cal (
      user_id,
      step_id,
      step_slug,
      type,
      updated_content
    ) VALUES (
      COALESCE(NEW.updated_by, NEW.created_by),
      NEW.id,
      NEW.slug,
      CASE
        WHEN TG_OP = 'INSERT' THEN 'ADD'
        WHEN TG_OP = 'DELETE' THEN 'DELETE'
        ELSE 'UPDATE'
      END::content_audit_log_types,
      row_to_json(NEW.*)
    );
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

-- Step 3: Recreate the trigger with the updated function
CREATE TRIGGER insert_content_audit_log_on_change_step_tr
  AFTER INSERT OR UPDATE ON steps
  FOR EACH ROW
  EXECUTE PROCEDURE insert_content_audit_log_on_change_step_fn();

-- Create function to generate slugs for new rows
CREATE OR REPLACE FUNCTION generate_slug_on_insert_fn()
  RETURNS TRIGGER AS $$
  BEGIN
    -- Generate the slug from the title
    NEW.slug := slugify(NEW.title);

    -- Ensure unique slug by checking for collisions
    WHILE EXISTS (SELECT 1 FROM "steps" WHERE "slug" = NEW.slug AND "id" != NEW.id) LOOP
      NEW.slug := NEW.slug || '-' || substring(gen_random_uuid()::TEXT FROM 1 FOR 8);
    END LOOP;

    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

-- Create trigger to invoke the function before insert
CREATE TRIGGER generate_slug_on_insert
  BEFORE INSERT ON "steps"
  FOR EACH ROW
  EXECUTE PROCEDURE generate_slug_on_insert_fn();

COMMIT;
