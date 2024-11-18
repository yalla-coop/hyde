-- Create function to generate slug
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

-- Create a trigger to automatically generate slugs for new rows in "steps"
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

-- Create the trigger to invoke the function before insert
CREATE TRIGGER generate_slug_on_insert
  BEFORE INSERT ON "steps"
  FOR EACH ROW
  EXECUTE PROCEDURE generate_slug_on_insert_fn();
