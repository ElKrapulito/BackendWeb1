import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService:CourseService
    ){}

    @Get(':id')
    async findOneCourseWithTopics(@Param('id') id:number){
        return await this.courseService.findCourseWithTopics(id);
    }

    @Get()
    async findCourseWithCategory(){
        return await this.courseService.findAllCourseWithCategory();
    }


    @Post()
    async insertCourse(
        @Body('courseTitle') courseTitle:string,
        @Body('description') description:string,
        @Body('level') level:string,
        @Body('imgUrl') imgUrl:string,
        @Body('hourLength') hourLength:number,
        @Body('adminId') adminId:number,
        @Body('categoryId') categoryId:number
    ){
        await this.courseService.insertCourse(courseTitle,description,level,imgUrl,hourLength,adminId,categoryId);
    }

    @Patch(':id')
    async updateCourse(
        @Body('courseTitle') courseTitle:string,
        @Body('description') description:string,
        @Body('level') level:string,
        @Body('imgUrl') imgUrl:string,
        @Body('hourLength') hourLength:number,
        @Body('categoryId') categoryId:number,
        @Param('id') courseId:number
    ){
        await this.courseService.updateCourse(courseTitle,description,level,imgUrl,hourLength,categoryId,courseId)
    }
}
