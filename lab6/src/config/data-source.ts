import "reflect-metadata"
import {DataSource} from "typeorm"
import dotenv from "dotenv";
//have no idea how to get from env without doing it here;)
dotenv.config();
export const AppDataSource = new DataSource(
    {
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: +process.env.TYPEORM_PORT,
        username: process.env.TYPEORM_USER,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_NAME,
        entities: ['./**/*.entity.ts'],
        migrations: ['migrations/*.ts'],
        migrationsRun:true}
);
