import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Game } from './game.entity';

@Entity({ name: 'scores' })
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  value: number;

  @ManyToOne(() => User, (user) => user.scores)
  user: User;

  @ManyToOne(() => Game, (game) => game.scores)
  game: Game;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
