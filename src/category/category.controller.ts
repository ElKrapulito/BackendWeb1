import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

    @Get()
    async findAll(){
        return await this.categoryService.findAll();
    }

    @Get(':id')
    async findOneCategory(@Param('id') id:number){
        return this.categoryService.findOneCategory(id);
    }

    @Post()
    async insertCategory(@Body('categoryTitle') categoryTitle:string){
        await this.categoryService.insertCategory(categoryTitle);
    }
}
