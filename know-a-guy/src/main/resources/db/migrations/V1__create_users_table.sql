CREATE TYPE user_role   AS ENUM ('client', 'professional', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'paused', 'inactive');

CREATE TABLE IF NOT EXISTS users (
    user_id              uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
    f_name               varchar      NOT NULL,
    l_name               varchar,
    profile_picture_path varchar,
    bio                  varchar,
    email                varchar      NOT NULL UNIQUE,
    username             varchar      UNIQUE,
    password_hash        varchar      NOT NULL,
    role                 user_role    NOT NULL,
    status               user_status  NOT NULL,
    zip                  char(5),
    city                 varchar,
    created_at           timestamptz  NOT NULL DEFAULT now(),
    updated_at           timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_f_name ON users (f_name);
CREATE INDEX idx_users_zip    ON users (zip);
CREATE INDEX idx_users_city   ON users (city);
CREATE INDEX idx_users_status ON users (status);

CREATE FUNCTION set_updated_at() RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
