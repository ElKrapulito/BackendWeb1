import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository, getRepository, getConnection } from 'typeorm';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import * as fs from 'fs';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async findAll(): Promise<Course[]> {
        return await this.courseRepository.find();
    }

    async insertCourse(courseTitle: string, description: string, level: string, hourLength: number, adminId: number, categoryId: number, req) {
        const course = new Course();
        course.courseTitle = courseTitle;
        course.description = description;
        course.level = level;
        course.hourLength = hourLength;
        const userAdmin = await this.userRepository.findOne(adminId);
        const category = await this.categoryRepository.findOne(categoryId)
        if (!userAdmin) {
            throw new NotFoundException('The user was not found with id: ' + adminId)
        }
        if (userAdmin.admin == false) {
            throw new ForbiddenException('The user is not an admin');
        }
        if (!category) {
            throw new NotFoundException('The category was not found with id: ' + categoryId);
        }
        course.userAdmin = userAdmin;
        course.category = category;
        return await this.courseRepository.save(course);
    }

    async insertImage(id: number, file, req) {
        const course = await this.courseRepository.findOne(id);
        if(course == null){
            throw new NotFoundException('Course not found!')
        }

        fs.unlink(`./upload/${course.imgUrl}`, err => {
            console.log(err);
        });
        course.imgUrl = file.filename;
        course.mimetype = file.mimetype;
        const newCourse =  await this.courseRepository.save(course);
        newCourse.url = this.makeImageUrl(req,newCourse);
        return newCourse;
    }

    async findOneByTitle(courseTitle: string): Promise<Course> {
        const course = await getRepository(Course)
            .createQueryBuilder("courses")
            .where("'courses.courseTitle' = :courseTitle", { courseTitle: courseTitle })
            .getOne();
        return course;
    }

    async findManyByAdmin(adminId: number): Promise<Course[]> {
        const courses = await getRepository(Course)
            .createQueryBuilder("courses")
            .where("'courses.userAdminId' = :adminId", { adminId: adminId })
            .getMany();
        
        return courses;
    }

    async findOne(id: number): Promise<Course> {
        const course = await this.courseRepository.findOne(id)
        /*const host = req.get('host')
        course.url = `http://${host}/course/image/${course.imgUrl}`;*/
        return course;
    }

    async findCourseWithTopics(courseId: number, req): Promise<Course> {
        const course = await this.courseRepository.findOne(courseId);
        if (!course) {
            throw new NotFoundException('The course was not found with id: ' + courseId);
        }
        course.topics = await getConnection()
            .createQueryBuilder()
            .relation(Course, "topics")
            .of(courseId)
            .loadMany();
        course.category = await getConnection()
            .createQueryBuilder()
            .relation(Course, "category")
            .of(course)
            .loadOne();
        course.userAdmin = await getConnection()
            .createQueryBuilder()
            .relation(Course, "userAdmin")
            .of(course)
            .loadOne();
        course.url = this.makeImageUrl(req,course);
        return course;
    }

    async findAllCoursesWithCategory(req) {
        const courses = await this.courseRepository.find();
        await Promise.all(courses.map(async course => {
            course.category = await getConnection()
                .createQueryBuilder()
                .relation(Course, "category")
                .of(course)
                .loadOne();
            course.userAdmin = await getConnection()
                .createQueryBuilder()
                .relation(Course, "userAdmin")
                .of(course)
                .loadOne();
        }));
        courses.forEach(course => {
            course.url = this.makeImageUrl(req, course);
        });
        return courses;
    }

    async findAllCoursesByCategory(categoryId: number, req) {
        const courses = await getRepository(Course)
            .createQueryBuilder("course")
            .leftJoinAndSelect("course.category", "category")
            .where("course.category = :id", { id: categoryId })
            .getMany();
            await Promise.all(courses.map(async course => {
                course.category = await getConnection()
                    .createQueryBuilder()
                    .relation(Course, "category")
                    .of(course)
                    .loadOne();
                course.userAdmin = await getConnection()
                    .createQueryBuilder()
                    .relation(Course, "userAdmin")
                    .of(course)
                    .loadOne();
            }));
            courses.forEach(course => {
                course.url = this.makeImageUrl(req, course);
            });
            
        return courses;
    }

    async searchCourses(term: string, req): Promise<Course[]> {
        if (term.length <= 0) {
            return;
        }
        const courses = await getRepository(Course)
            .createQueryBuilder("course")
            .where("course.courseTitle ilike :term", { term: `%${term}%` })
            .getMany();
        courses.forEach(course => {
            course.url = this.makeImageUrl(req,course);
        });
        return courses;
    }

    async updateCourse(courseTitle: string, description: string, level: string, hourLength: number, categoryId: number, courseId: number, req) {
        const course = await this.courseRepository.findOne(courseId);
        if (!course) {
            return;
        }
        if (courseTitle) {
            course.courseTitle = courseTitle;
        }
        if (description) {
            course.description = description;
        }
        if (level) {
            course.level = level;
        }
        if (hourLength) {
            course.hourLength = hourLength;
        }
        if (categoryId) {
            const category = await this.categoryRepository.findOne(categoryId);
            if (!category) {
                throw new NotFoundException('The new category was not found with id: ' + categoryId);
            }
            course.category = category;
        }
        const newCourse = await this.courseRepository.save(course);
        newCourse.url = this.makeImageUrl(req,newCourse)
        return newCourse;
    }

    /*fs.unlink(`./upload/${id}`, err => {
            console.log(err);
        });*/

    private makeImageUrl(req, course:Course):string {
        const host = req.get('host');
        return `http://${host}/course/image/${course.id}`;
    }

}
