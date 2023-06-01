import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false, length: 255})
    username: string;
 @Column({unique: true, nullable: false, length: 255})
    name?: string = '';

    @Column({nullable: false, length: 255})
    email: string
    @Column({nullable: false})
    age: number
    @Column()
    info?: string
    @Column({default: {city: "", street: ""}, type: "jsonb"})
    address: Address
}

interface Address {
    city: string;
    street: string;
}