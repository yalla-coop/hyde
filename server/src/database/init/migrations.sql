DROP TABLE IF EXISTS "migrations" CASCADE;

CREATE TABLE "migrations" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"run_on" timestamp NOT NULL DEFAULT NOW()
);


INSERT INTO "migrations" ("name") VALUES
  ('/20221123121141-add-org-status'),
  ('/20221124140906-remove-backup-email-unique-constraint'),
  ('/20221201042815-add-deleted-status-for-organisations');