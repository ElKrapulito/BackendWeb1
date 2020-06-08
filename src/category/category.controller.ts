import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

    @Get()
    async findAll(){
        return await this.categoryService.findAll();
    }

    @Post()
    async insertCategory(@Body('categoryTitle') categoryTitle:string){
        await this.categoryService.insertCategory(categoryTitle);
    }
}
