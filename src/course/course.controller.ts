import { Controller, Get, Param, Post, Body, Patch, ParseIntPipe, UseInterceptors, UploadedFile, Res, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService:CourseService
    ){}

    @Get(':id')
    async findOneCourseWithTopics(@Param('id', ParseIntPipe) id:number, @Req() req){
        return await this.courseService.findCourseWithTopics(id, req);
    }

    @Get()
    async findCoursesWithCategory(@Req() req){
        return await this.courseService.findAllCoursesWithCategory(req);
    }

    @Get('category/:id')
    async findCoursesByCategory(@Param('id') id:number, @Req() req){
        return await this.courseService.findAllCoursesByCategory(id, req);
    }

    @Get('search/:term')
    async searchCourses(@Param('term') term:string, @Req() req){
        return this.courseService.searchCourses(term, req);
    }

    @Get('image/:id')
    async imageCourse(@Param('id') id, @Res() res) {
        const course = await this.courseService.findOne(id);

        res.setHeader('Content-Type', course.mimetype);
        return res.sendFile(course.imgUrl, { root: './upload' });
    }

    @Get('user/:id')
    async getAdminCourses(@Param('id') adminId:number){
        return this.courseService.findManyByAdmin(adminId);
    }

    @Post()
    async insertCourse(
        @Body('courseTitle') courseTitle:string,
        @Body('description') description:string,
        @Body('level') level:string,
        @Body('hourLength') hourLength:number,
        @Body('adminId') adminId:number,
        @Body('categoryId') categoryId:number,
        @Req() req
    ){
        return await this.courseService.insertCourse(courseTitle,description,level,hourLength,adminId,categoryId,req);
    }

    @Post('image/:id')
    @UseInterceptors(FileInterceptor('file'))
    async insertImage(@Param('id') id: number,@UploadedFile() file, @Req() req){
        return this.courseService.insertImage(id, file, req);
    }

    @Patch(':id')
    async updateCourse(
        @Body('courseTitle') courseTitle:string,
        @Body('description') description:string,
        @Body('level') level:string,
        @Body('hourLength') hourLength:number,
        @Body('categoryId') categoryId:number,
        @Param('id') courseId:number,
        @Req() req
    ){
        return await this.courseService.updateCourse(courseTitle,description,level,hourLength,categoryId,courseId,req);
    }
}
