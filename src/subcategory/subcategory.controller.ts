import { Controller, Get, Post, Body } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';

@Controller('subcategory')
export class SubcategoryController {
    constructor(private readonly subcategoryService:SubcategoryService){}

    @Get()
    async findAll(){
        return await this.subcategoryService.findAll();
    }

    @Post()
    async insertSubcategory(@Body('subcategoryTitle') subcategoryTitle:string){
        await this.subcategoryService.insertSubcategory(subcategoryTitle);
    }

}
