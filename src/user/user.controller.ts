import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    async findAllUsers() {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findUserWithCourses(@Param('id') id: number, @Req() req) {
        return await this.userService.findUserWithCourses(id, req);
    }

    @Post()
    async insertUser(
        @Body('fullName') fullName: string,
        @Body('lastName') lastName: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('admin') admin: boolean
    ) {
        return await this.userService.insertUser(fullName, lastName, email, password, admin);
    }

    @Post('course')
    async beginCourse(
        @Body('userId') userId:number,
        @Body('courseId') courseId:number
    ){
        return await this.userService.beginCourse(userId,courseId);
    }

}
