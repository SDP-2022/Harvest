create table types
(
    "Type"      text not null
        constraint supertypes_pk
            primary key,
    "Supertype" text
);

alter table types
    owner to ylclcwauogzhtt;

create unique index supertypes_type_uindex
    on types ("Type");

