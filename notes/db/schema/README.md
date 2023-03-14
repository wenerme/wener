## Rules

- singularity

## i18n

1. multi column
    ```sql
    create table article
    (
        title    text,
        title_en text
    );
    ```
2. by message id
   ```sql
   create table message
   (
       id    text,
       text  text,
       en    text,
       en_US text,
       cn    text,
       zh_CN text
   );
   ```
3. by jsonb
   ```sql
   create table message
   (
       id    text,
       title jsonb
   );
   insert into message (id, title) 
   values ('help','{"zh_CN":"","en":""}'::jsonb);
   ```