CREATE TABLE IF NOT EXISTS "users"
(
    "user_id"       text(255) NOT NULL PRIMARY KEY,
    "email"         text(255) NOT NULL,
    "display_name"  text(255) NOT NULL,
    "first_name"    text(255) NOT NULL,
    "last_name"     text(255) NOT NULL,
    "avatar"        blob,
    "creation_date" text      NOT NULL,
    "password_hash" blob,
    "totp_secret"   text(64),
    "mfa_type"      text(64),
    "uuid"          text(36)  NOT NULL
);
CREATE TABLE IF NOT EXISTS "groups"
(
    "group_id"      integer          NOT NULL PRIMARY KEY,
    "display_name"  text(255) UNIQUE NOT NULL,
    "creation_date" text             NOT NULL,
    "uuid"          text(36)         NOT NULL
);
CREATE TABLE IF NOT EXISTS "memberships"
(
    "user_id"  text(255) NOT NULL,
    "group_id" integer   NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("group_id") REFERENCES "groups" ("group_id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "jwt_refresh_storage"
(
    "refresh_token_hash" integer   NOT NULL PRIMARY KEY,
    "user_id"            text(255) NOT NULL,
    "expiry_date"        text      NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "jwt_storage"
(
    "jwt_hash"    integer               NOT NULL PRIMARY KEY,
    "user_id"     text(255)             NOT NULL,
    "expiry_date" text                  NOT NULL,
    "blacklisted" integer DEFAULT FALSE NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "password_reset_tokens"
(
    "token"       text(255) NOT NULL PRIMARY KEY,
    "user_id"     text(255) NOT NULL,
    "expiry_date" text      NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);