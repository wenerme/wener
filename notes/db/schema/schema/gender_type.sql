create table if not exists gender_type
(
    value text primary key,
    label text not null
);
comment on table gender_type is '性别';

insert into gender_type(value, label)
values ('Female', '女'),
       ('Male', '男')
on conflict (value) do update set label=excluded.label;
