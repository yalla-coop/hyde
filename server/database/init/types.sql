DROP TYPE IF EXISTS user_roles CASCADE;
DROP TYPE IF EXISTS user_statuses CASCADE;
DROP TYPE IF EXISTS organisation_types CASCADE;
DROP TYPE IF EXISTS stage_types CASCADE;
DROP TYPE IF EXISTS content_audit_log_types CASCADE;

CREATE TYPE user_roles AS ENUM('ADMIN', 'SUPER_ADMIN');
CREATE TYPE user_statuses AS ENUM('ACTIVE', 'DELETED');
CREATE TYPE organisation_types AS ENUM('A', 'B'); -- need list of those
CREATE TYPE stage_types AS ENUM('BEFORE_CLAIMING', 'CLAIMING', 'AFTER_CLAIMING');
CREATE TYPE content_audit_log_types AS ENUM('ADD', 'UPDATE', 'DELETE');
