create table users(
id serial primary key,
username varchar(255) unique not null ,
email varchar(255) not null,
age int not null,
info text,
address JSONB DEFAULT  '{"city":"", "street":""}' not null
);

alter table users
add constraint users_address_valid
check (
(address->'city') is not null
	and
jsonb_typeof(address->'city') = 'string'
	and
(address->'street') is not null
	and
jsonb_typeof(address->'street') = 'string'
);
create table posts(
id serial primary key,
created_at Date not null,
title varchar(255) not null,
text text not null,
user_id int references users
);