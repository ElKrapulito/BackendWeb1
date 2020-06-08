import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './subcategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubcategoryService {
    constructor(
        @InjectRepository(SubCategory)
        private subcategoryRepository:Repository<SubCategory>
    ){}
    
    async insertSubcategory(subcategoryTitle:string){
        const subcategory = new SubCategory();
        subcategory.subcategoryTitle = subcategoryTitle;
        await this.subcategoryRepository.save(subcategory);
    }

    async findAll(){
        return await this.subcategoryRepository.find();
    }
}