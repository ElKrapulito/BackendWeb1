import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, getRepository, getConnection, createQueryBuilder } from 'typeorm';
import { Course } from 'src/course/course.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await getRepository(User)
            .createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne();
        return user;
    }

    async findUserWithCourses(userId: number): Promise<User> {
        const user = await getConnection().manager.findOne(User, userId);
        user.courses = await getConnection()
            .createQueryBuilder()
            .relation(User, "courses")
            .of(user)
            .loadMany();
        return user;
    }


    async insertUser(fullName: string, lastName: string, email: string, password: string, admin: boolean): Promise<User> {
        let user = new User();
        user.fullName = fullName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.admin = admin;
        return await this.userRepository.save(user);
    }

    async beginCourse(userId: number, courseId: number) {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into("inscriptions")
            .values([
                { usersId: userId, coursesId: courseId },
            ])
            .execute();
    }

    async updateUser(id: number, fullName: string, lastName: string, email: string, password: string): Promise<void> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException('The user was not found with id: ' + id);
        }

        if (fullName) {
            user.fullName = fullName;
        }

        if (lastName) {
            user.lastName = lastName;
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = password;
        }

        await this.userRepository.update(id, user);
    }

}
