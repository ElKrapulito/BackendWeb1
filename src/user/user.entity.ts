import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Course } from "src/course/course.entity";


@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName:string;

    @Column()
    lastName:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({default: false})
    admin:boolean

    @ManyToMany(type => Course, course => course.users)
    courses: Course[];

    @OneToMany(type => Course, course => course.userAdmin)
    coursesAdmin:Course[];
}