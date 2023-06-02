import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
@Entity("posts")
export class Post{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name:"created_at",nullable:false})
    dateCreation: Date;

    @Column({nullable:false, length:255})
    title: string;

    @Column({nullable:false})
    text: string;

    @ManyToOne(()=>User,{nullable:false})
    @JoinColumn({name:"user_id"})
    user: User;

}