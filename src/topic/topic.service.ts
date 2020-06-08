import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { Topic } from './topic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/course.entity';

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic)
        private topicRepository: Repository<Topic>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>
    ) { }

    async insertTopic(topicTitle: string, description: string, type: string, content: string, idCourse: number) {
        const topic = new Topic();
        topic.topicTitle = topicTitle;
        topic.description = description;
        topic.type = type;
        topic.content = content;
        const course = await this.courseRepository.findOne(idCourse);
        if (!course) {
            throw new NotFoundException('Course not found with id: ' + idCourse)
        }
        topic.course = course;
        await this.topicRepository.save(topic);
    }

    async findOneTopic(id: number) {
        return await this.topicRepository.findOne(id);
    }
}
