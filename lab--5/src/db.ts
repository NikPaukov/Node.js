import pg  from 'pg-promise'
import * as dotenv from 'dotenv';
dotenv.config();


const cn = process.env.DATABASE_URL;
if(!cn) throw new Error("Database url not found")
export const db = pg()(cn);

export const execute = (query:string)=>{
    return db.result(query);
}