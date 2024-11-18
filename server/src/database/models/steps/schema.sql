DROP TABLE IF EXISTS "steps" CASCADE;

CREATE TABLE "steps" (
  "id" SERIAL PRIMARY KEY,
  "stage" stage_types,
  "step_order" INT,
  "title" TEXT,
  "slug" TEXT UNIQUE,
  "description" TEXT,
  "page_title" TEXT,
  "page_description" TEXT,
  "how_long_does_it_take" JSONB,
    -- {
    --   time_range_text: '' //30 to 45 mins
    -- }
  "where_do_you_need_to_go" JSONB,
    -- {
    --   link: '', //[PHONE, LINK]
    --   type: '',
    --   title: ''
    -- }
  "things_you_will_need" JSONB[],
    -- [
    --   {
    --     title: '',
    --     description: '',
    --     this_can_include: [''],
    --     tips: ['']
    --   }
    -- ]
  "what_you_will_need_to_know" JSONB[],
    -- [
    --   {
    --     title: '',
    --     description: '',
    --     this_can_include: [''],
    --     tips: ['']
    --   }
    -- ]
  "top_tip" TEXT,
  "other_tips" TEXT[],
  "is_optional" BOOLEAN default false,
  "created_by" INTEGER REFERENCES users(id),
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_by" INTEGER REFERENCES users(id),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "steps"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE INDEX "idx_steps_slug" ON "steps" ("slug");