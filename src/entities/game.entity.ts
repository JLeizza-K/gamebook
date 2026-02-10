import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Score } from './score.entity';
import { User } from './user.entity';



@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  coverImageUrl?: string;
  
  @ManyToOne(()=> User, (user) => user.games)
  owner: User
  
  @OneToMany(()=> Score, (score) => score.game)
  scores: Score[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;
}
