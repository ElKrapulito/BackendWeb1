import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository:Repository<Category>
    ){}

    async insertCategory(categoryName:string):Promise<void>{
        const category = new Category();
        category.categoryName = categoryName;
        await this.categoryRepository.save(category);
    }

    async findAll(){
        return await this.categoryRepository.find();
    }

}
