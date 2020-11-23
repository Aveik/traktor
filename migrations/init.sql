create table traktor.users (
    uuid varchar(255) not null,
    refreshToken varchar(255) not null,
    constraint users_uuid_uindex unique (uuid),
    constraint users_refreshToken_uindex unique (refreshToken)
);

