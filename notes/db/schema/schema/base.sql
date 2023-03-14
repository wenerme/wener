create table if not exists invite_state_type
(
    value text primary key,
    label text not null
);

insert into invite_state_type (value, label)
values ('Pending', '待处理'),
       ('Accepted', '已接受'),
       ('Rejected', '已拒绝'),
       ('Expired', '已失效')
on conflict (value) do update set label=excluded.label;

create table if not exists invoice_type
(
    value text primary key,
    label text not null
);
comment on table invoice_type is '发票类型';
insert into invoice_type (value, label)
values ('Normal', '普通发票'),
       ('Special', '专业发票'),
       ('VAT', '增值税专用发票')
on conflict (value) do update set label=excluded.label;

