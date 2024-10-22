create table users(
    id serial primary key,
    created_by varchar(50),
    created_date timestamp default now(),
    updated_by varchar(50),
    updated_date timestamp default now(),
    firstname text not null,
    lastname text not null,
    email varchar(100) not null unique,
    password varchar(100)
)

create table roles(
	role_id serial primary key,
	created_by varchar(100) not null,
	created_date timestamp default now(),
	updated_by varchar(100) not null,
	updated_date timestamp default now(),
	rolename_th text not null,
	rolename_en text not null,
	active_status bool default true
)

create table category(
	category_id serial primary key,
	created_by varchar(100) not null,
	created_date timestamp default now(),
	updated_by varchar(100) not null,
	updated_date timestamp default now(),
	category_name_th text not null,
	category_name_en text not null,
	active_status bool default true
)

create table employee(
	employee_id serial primary key,
	user_id int references users(user_id) on delete cascade,
	created_by varchar(100) not null,
	created_date timestamp default now(),
	updated_by varchar(100) not null,
	updated_date timestamp default now(),
	first_name text not null,
	last_name text not null,
	date_of_birth date not null,
	gender varchar(10) not null check(gender in ('male', 'female', 'other')),
	salary NUMERIC(10, 2) NOT NULL,
	active_status bool default true,
	tel varchar(10),
	hire_date date not null,
	issue_date date not null
)

create table product(
	prod_id serial primary key,
	category_id int references category(category_id) on delete cascade,
	created_by varchar(100) not null,
	created_date timestamp default now(),
	updated_by varchar(100) not null,
	updated_date timestamp default now(),
	prod_name_th text not null,
	prod_name_en varchar(100) not null,
	desc_th text,
	desc_en varchar(255),
	prod_cost NUMERIC(7,2) not null,
	quatity int not null,
	available int not null,
	tax int default 7,
	remark text
)




INSERT INTO roles(created_by, created_date, updated_by, updated_date, rolename_th, rolename_en, active_status) 
VALUES ('admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP, 'ผู้ดูแล', 'admin',true)