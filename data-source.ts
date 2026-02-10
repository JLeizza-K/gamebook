import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'mi_db',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.entity.js'],
});