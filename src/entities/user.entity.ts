import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm'

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
    profileImage?: string


    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    lastUpdatedAt: Date


    // @OneToMany(() => Game, (game) => game.owner)
    // games: Game[]
    
    // @OneToMany(() => Favourites, (favourite) => favourite.user)
    // favourites: Favourite[]

    @DeleteDateColumn({select: false})
    deletedAt: Date | null
}
