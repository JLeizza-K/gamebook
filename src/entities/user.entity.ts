import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bc from 'bcrypt';
import { Score } from './score.entity';
import { Game } from './game.entity';
import { Favourite } from './favourite.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @OneToMany(() => Game, (game) => game.owner)
  games: Game[]

 @OneToMany(() => Favourite, (favourite) => favourite.user)
 favourites: Favourite[]

  
  @OneToMany(() => Score, (score) => score.user)
  scores: Score[]

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bc.hashPassword(this.password, 10);
  }
}
