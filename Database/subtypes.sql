create table subtypes
(
    "Subtype" text not null
        constraint subtypes_pk
            primary key,
    "Type"    text
        constraint subtypes_types_type_fk
            references types
);

alter table subtypes
    owner to ylclcwauogzhtt;

create unique index subtypes_subtype_uindex
    on subtypes ("Subtype");

