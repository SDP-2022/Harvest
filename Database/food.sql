create table food
(
    "Food_Name"    text not null
        constraint food_pk
            primary key,
    "Description"  text,
    "Image"        text,
    "Calories"     integer,
    "Seasonality"  text,
    "Growth"       text,
    "Harvest_Time" text,
    "Sow_Time"     text,
    "Plant_Time"   text,
    "Subtypes"     text
);

alter table food
    owner to ylclcwauogzhtt;

create unique index food_food_name_uindex
    on food ("Food_Name");

