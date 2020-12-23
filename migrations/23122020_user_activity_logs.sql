create table userActivityLogs
(
    uuid      varchar(40)                                      not null,
    type      enum ('ratings', 'recommendations', 'watchlist') not null,
    createdAt datetime default CURRENT_TIMESTAMP               not null,
    userUuid  varchar(255)                                     not null,
    entity    enum ('movies', 'shows')                         not null,
    slug      varchar(255)                                     not null,
    payload   json                                             null,
    constraint userActivityLogs_uuid_uindex
        unique (uuid),
    constraint userActivityLogs_users_uuid_fk
        foreign key (userUuid) references users (uuid)
            on delete cascade
);

