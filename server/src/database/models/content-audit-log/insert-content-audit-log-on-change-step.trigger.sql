-- Trigger to insert new row into content_audit_log whenever
-- a step is updated/created

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
  $$
  LANGUAGE plpgsql;

CREATE TRIGGER insert_content_audit_log_on_change_step_tr AFTER INSERT OR UPDATE ON steps
  FOR EACH ROW
    EXECUTE PROCEDURE insert_content_audit_log_on_change_step_fn();