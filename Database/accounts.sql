create table accounts
(
    "Username"           varchar,
    "Email"              varchar,
    "User_ID"            varchar not null
        constraint accounts_pk
            primary key,
    "Date_Last_Accessed" date,
    "Date_Joined"        date
);

alter table accounts
    owner to ylclcwauogzhtt;

create unique index accounts_user_id_uindex
    on accounts ("User_ID");

