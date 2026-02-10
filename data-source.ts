import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity'; 

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'mi_db',
    entities: [User], 
    migrations: ['./src/migrations/*.ts'],
});