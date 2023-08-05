import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: "text"})
    firstName: string;

    @Column({type: "text"})
    lastName: string;

    @Column({type: "text"})
    country: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}
