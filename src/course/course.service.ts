import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository, getRepository, getConnection } from 'typeorm';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { async } from 'rxjs/internal/scheduler/async';

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

    async insertCourse(courseTitle: string, description: string, level: string, imgUrl: string, hourLength: number, adminId: number, categoryId: number) {
        const course = new Course();
        course.courseTitle = courseTitle;
        course.description = description;
        course.level = level;
        course.imgUrl = imgUrl;
        course.hourLenght = hourLength;
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
        await this.courseRepository.save(course);
    }

    async findOneByTitle(courseTitle: string): Promise<Course> {
        const course = await getRepository(Course)
            .createQueryBuilder("courses")
            .where("'courses.courseTitle' = :courseTitle", { courseTitle: courseTitle })
            .getOne();
        return course;
    }

    async findOne(id: number): Promise<Course> {
        return await this.courseRepository.findOne(id)
    }

    async findCourseWithTopics(courseId: number): Promise<Course> {
        const course = await this.courseRepository.findOne(courseId);
        if (!course) {
            throw new NotFoundException('The course was not found with id: ' + courseId);
        }
        course.topics = await getConnection()
            .createQueryBuilder()
            .relation(Course, "topics")
            .of(courseId)
            .loadMany();
        return course;
    }

    async findAllCourseWithCategory() {
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
        return courses;
    }

    async updateCourse(courseTitle: string, description: string, level: string, imgUrl: string, hourLength: number, categoryId: number, courseId: number) {
        const course = await this.courseRepository.findOne(courseId);
        if (courseTitle) {
            course.courseTitle = courseTitle;
        }
        if (description) {
            course.description = description;
        }
        if (level) {
            course.level = level;
        }
        if (imgUrl) {
            course.imgUrl = imgUrl;
        }
        if (hourLength) {
            course.hourLenght = hourLength;
        }
        if (categoryId) {
            const category = await this.categoryRepository.findOne(categoryId);
            if (!category) {
                throw new NotFoundException('The new category was not found with id: ' + categoryId);
            }
            course.category = category;
        }

        await this.courseRepository.update(courseId, course);
    }

}
