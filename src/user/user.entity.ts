import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Course } from "src/course/course.entity";
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    fullName:string;

    @IsNotEmpty()
    @Column()
    lastName:string;

    @IsNotEmpty()
    @Column({unique:true})
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @Column()
    password:string;

    @IsNotEmpty()
    @Column({default: false})
    admin:boolean

    @ManyToMany(type => Course, course => course.users)
    courses: Course[];

    @OneToMany(type => Course, course => course.userAdmin)
    coursesAdmin:Course[];
}