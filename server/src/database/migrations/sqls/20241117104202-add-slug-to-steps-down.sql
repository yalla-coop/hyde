BEGIN;

-- Remove the updated trigger for content audit log on steps changes
DROP TRIGGER IF EXISTS insert_content_audit_log_on_change_step_tr ON steps;

-- Remove the updated function for logging changes to content_audit_log
DROP FUNCTION IF EXISTS insert_content_audit_log_on_change_step_fn;

-- Recreate the original function for logging changes to content_audit_log
CREATE OR REPLACE FUNCTION insert_content_audit_log_on_change_step_fn()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO content_audit_log AS cal (
      user_id,
      step_id,
      type,
      updated_content
    ) VALUES (
      COALESCE(NEW.updated_by, NEW.created_by),
      NEW.id,
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

-- Recreate the original trigger for content audit log on steps changes
CREATE TRIGGER insert_content_audit_log_on_change_step_tr
  AFTER INSERT OR UPDATE ON steps
  FOR EACH ROW
  EXECUTE PROCEDURE insert_content_audit_log_on_change_step_fn();

-- Remove the trigger for generating slugs on insert
DROP TRIGGER IF EXISTS generate_slug_on_insert ON steps;

-- Remove the function for generating slugs
DROP FUNCTION IF EXISTS generate_slug_on_insert_fn;

-- Remove the slugify function
DROP FUNCTION IF EXISTS slugify;

-- Remove the slug column from the steps table
ALTER TABLE "steps" DROP COLUMN IF EXISTS "slug";

-- Drop the step_slug column from the content_audit_log table
ALTER TABLE "content_audit_log" DROP COLUMN IF EXISTS "step_slug";

COMMIT;
