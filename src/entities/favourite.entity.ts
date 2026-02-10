import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Game } from './game.entity';

@Entity({ name: 'favourites' })
@Index(['user', 'game'], {unique:true})
export class Favourite {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.favourites)
  user: User;

  @ManyToOne(() => Game, (game) => game.favourites)
  game: Game;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
