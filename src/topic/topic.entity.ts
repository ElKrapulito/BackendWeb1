import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Course } from "src/course/course.entity";
import { User } from "src/user/user.entity";


@Entity('topics')
export class Topic {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    topicTitle:string;

    @Column()
    description:string;

    @Column()
    type:string;

    @Column()
    content:string;

    @ManyToOne(type => Course, course => course.topics)
    course:Course;

    @ManyToMany(type => User)
    @JoinTable({name:'users_topics'})
    users:User[];

}