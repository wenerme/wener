------------------------
-- get current tenant id as text
------------------------
CREATE OR REPLACE FUNCTION public.current_tenant_id() RETURNS text
    LANGUAGE plpgsql
    STABLE
    PARALLEL SAFE
AS
$$
DECLARE
    tid text := coalesce(
            nullif(current_setting('tenant.id', true), '')::text,
            ((regexp_match(current_user, '(^|_)tenant_([^_]+)$'))[1])::text
        );
BEGIN
    IF tid IS NULL THEN
        RAISE EXCEPTION 'Missing tenant in context'
            USING HINT = 'Please check your execution context';
    END IF;
    RETURN tid;
END;
$$;

------------------------
-- get current user id as text
------------------------
CREATE OR REPLACE FUNCTION public.current_user_id() RETURNS text
    LANGUAGE plpgsql
    STABLE
    PARALLEL SAFE
AS
$$
DECLARE
    uid text := nullif(current_setting('user.id', true), '')::text;
BEGIN
    IF uid IS NULL THEN
        RAISE EXCEPTION 'Missing user in context'
            USING HINT = 'Please check your execution context';
    END IF;
    RETURN uid;
END;
$$;
