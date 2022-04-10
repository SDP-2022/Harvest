create table log
(
    "Log_No"      integer default nextval('"Log_Log_No_seq"'::regclass) not null,
    "User_ID"     varchar                                               not null
        constraint log_accounts_user_id_fk
            references accounts,
    "Food_Name"   text                                                  not null
        constraint log_food_food_name_fk
            references food,
    "Date_Logged" date                                                  not null,
    "Weight"      numeric(6, 2)
);

alter table log
    owner to ylclcwauogzhtt;

create unique index log_log_no_uindex
    on log ("Log_No");

