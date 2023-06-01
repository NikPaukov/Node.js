import "reflect-metadata"
import {DataSource} from "typeorm"
import dotenv from "dotenv";
import {User} from "../entities/user.entity";
import {Post} from "../entities/post.entity";
//have no idea how to get from env without doing it here;)
dotenv.config();
export const AppDataSource = new DataSource(
    {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABSE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
            entities: [User, Post]
    }
);
