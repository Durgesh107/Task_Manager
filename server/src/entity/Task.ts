import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Task extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id:number;

    @Column()
    @Field(()=>String)
    title:string;

    @Column()
    @Field(()=>Boolean)
    isComplete:boolean

    @CreateDateColumn()
    @Field(()=>String)
    created:Date

    @UpdateDateColumn()
    @Field(()=>String)
    updated:Date;
}


