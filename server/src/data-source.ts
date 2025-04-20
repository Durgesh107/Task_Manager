import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config';

export const AppDataSource = new DataSource({
    name:"Default",
    type: "postgres",
    host: process.env.HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USERNAME,      
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
})
