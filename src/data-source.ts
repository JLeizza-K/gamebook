import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'
import { User } from './entities/user.entity';
import { Game } from './entities/game.entity';
import { Favourite } from './entities/favourite.entity';
import { Score } from './entities/score.entity';

dotenv.config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Game, Favourite, Score],
    migrations: [__dirname + '/migrations/*{.ts}'],
});

const entities=[__dirname+'entities/**/*.entity.ts']
console.log(entities)