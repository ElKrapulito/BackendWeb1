import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Course } from "src/course/course.entity";

@Entity({name:'categories'})
export class Category{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    categoryName:string;
    
}