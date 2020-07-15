import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { Category } from "src/category/category.entity";
import { Topic } from "src/topic/topic.entity";
import { SubCategory } from "src/subcategory/subcategory.entity";


@Entity({ name: 'courses' })
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    courseTitle: String;

    @Column()
    description: string;

    @Column()
    level: string;

    @Column({ nullable:true })
    imgUrl: string;

    @Column({ nullable: true })
    mimetype: string;

    @Column()
    hourLength: number;

    @ManyToMany(type => User, user => user.courses)
    @JoinTable({ name: 'inscriptions' })
    users: User[];

    @ManyToOne(type => Category, category => category.id)
    @JoinColumn()
    category: Category;

    @ManyToMany(type => SubCategory, subcategory => subcategory.id)
    @JoinTable({ name: 'courses_subcategories' })
    subcategories: SubCategory[];

    @OneToMany(type => Topic, topic => topic.course)
    topics: Topic[];

    @ManyToOne(type => User, user => user.coursesAdmin)
    userAdmin: User;

    url: string;

}