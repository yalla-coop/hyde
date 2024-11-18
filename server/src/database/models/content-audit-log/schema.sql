DROP TABLE IF EXISTS "content_audit_log" CASCADE;

CREATE TABLE "content_audit_log" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES users(id),
  "step_id" INTEGER REFERENCES steps(id),
  "step_slug" VARCHAR(255),
  "landing_page_content_id" INTEGER REFERENCES landing_page_content(id),
  "type" content_audit_log_types NOT NULL,
  "updated_content" JSON,
    -- {
    --   type: 'STEP', // ['STEP', 'LANDING']
    --   content_id: '',
    --   title: '',
    --   ...all_setp_or_landing_content_here
    -- }

  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "content_audit_log"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();