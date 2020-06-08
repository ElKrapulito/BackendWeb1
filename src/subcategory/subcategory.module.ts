import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './subcategory.entity';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';

@Module({
    imports:[TypeOrmModule.forFeature([SubCategory])],
    controllers:[SubcategoryController],
    providers:[SubcategoryService],
    exports:[TypeOrmModule]
})
export class SubcategoryModule {}
