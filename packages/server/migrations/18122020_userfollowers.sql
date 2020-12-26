create table userFollowers (
    userUuid     varchar(255) not null,
    followerUuid varchar(255) not null,
    constraint userFollowers_userUuid_followerUuid_uindex unique (userUuid, followerUuid),
    constraint userFollowers_users_uuid_fk foreign key (userUuid) references users (uuid) on delete cascade,
    constraint userFollowers_users_uuid_fk_2 foreign key (followerUuid) references users (uuid) on delete cascade
);

