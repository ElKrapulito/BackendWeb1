import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Course } from "src/course/course.entity";


@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName:string;

    @Column()
    lastName:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @ManyToMany(type => Course)
    courses: Course[];

}