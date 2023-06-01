import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity("posts")
export class Post{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name:"created_at",nullable:false})
    dateCreation: Date;//sounds weired but ok; (and no time but won`t change task specifications)

    @Column({nullable:false, length:255})
    title: string;

    @Column({nullable:false})
    text: string;

    @ManyToOne(type=>User,)
    @JoinColumn({name:"user_id"})
    user: User;

}