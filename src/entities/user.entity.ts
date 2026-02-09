import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, BeforeInsert} from 'typeorm'
import * as bc from 'bcrypt'

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique: true})
    email: string

    @Column({unique: true})
    userName: string

    @Column({unique: true})
    password: string

    @Column({nullable: true})
    profileImageUrl?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    lastUpdatedAt: Date

    //TODO Uncomment this section when each entity is created.

    // @OneToMany(() => Game, (game) => game.owner)
    // games: Game[]
    
    // @OneToMany(() => Favourites, (favourite) => favourite.user)
    // favourites: Favourite[]

    @DeleteDateColumn({select: false})
    deletedAt: Date | null

    @BeforeInsert()
    async hashPassword(){
        this.password = await bc.has(this.password, 10)
    }

}


