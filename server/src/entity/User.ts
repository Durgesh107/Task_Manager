import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
@ObjectType()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id:number;

    @Field(()=>String)
    @Column()
    username:string;

    @Field(()=>String)
    @Column({unique:true})
    email:string;
 
    @Column() 
    password:string;

    @CreateDateColumn()
    @Field(()=>String)
    created: Date;

    @UpdateDateColumn()
    @Field(()=>String)
    updated: Date;
}