DROP TABLE IF EXISTS "migrations" CASCADE;

CREATE TABLE "migrations" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"run_on" timestamp NOT NULL DEFAULT NOW()
);


INSERT INTO "migrations" ("name") VALUES
  ('/20221123121141-add-org-status'),
  ('/20221124140906-remove-backup-email-unique-constraint'),
  ('/20221201042815-add-deleted-status-for-organisations'),
  ('/20221214090033-add-languages-tables'),
  ('/20221214173721-convert-json-to-jsonb'),
  ('/20230125051040-add-all-fields-translated-to-steps-i18n'),
  ('/20241117104202-add-slug-to-steps');
