import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        TypeOrmModule.forFeature([Course, User, Category]), 
        MulterModule.registerAsync({
            useFactory: () => ({
                dest: './upload'
            })
        })],
    controllers: [CourseController],
    providers: [CourseService],
    exports: [TypeOrmModule, MulterModule]
})
export class CourseModule { }
