import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Course,User,Category])],
    controllers:[CourseController],
    providers:[CourseService],
    exports:[TypeOrmModule]
})
export class CourseModule {}
