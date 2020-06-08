import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name:'subcategories'})
export class SubCategory{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    subcategoryTitle:string;

}