import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/user/user.entity";
import { Category } from "src/category/category.entity";
import { Topic } from "src/topic/topic.entity";
import { SubCategory } from "src/subcategory/subcategory.entity";


@Entity({name:'courses'})
export class Course {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    courseTitle:String;

    @Column()
    description:string;

    @Column()
    level:string;

    @Column()
    imgUrl:string;
    
    @Column()
    hourLenght:number;
    
    @ManyToMany(type => User)
    @JoinTable({name: 'inscriptions'})
    users: User[];

    @ManyToOne(type => Category)
    category: Category;

    @ManyToMany(type => SubCategory)
    @JoinTable({name:'courses_subcategories'})
    subcategories:SubCategory[];

    @OneToMany(type => Topic, topic => topic.course)
    topics: Topic[];

}