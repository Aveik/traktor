alter table users add slug varchar(255) not null after uuid;
create unique index users_slug_uindex on users (slug);

