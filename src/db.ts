import { DataSource } from "typeorm";
import { User } from "./entities/Users";
import { Order } from "./entities/Order";
import { Item } from "./entities/Item";
require("dotenv").config();


const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true, 
    logging: true,
    entities: [User,Order,Item],
    subscribers: [],
    migrations: [],
})