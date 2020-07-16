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
        return await this.topicRepository.save(topic);
    }

    async findOneTopic(id: number) {
        const topic = await this.topicRepository.findOne(id);
        if(!topic){
            throw new NotFoundException(`Topic not found with id: ${id}`)
        }
        topic.course = await this.courseRepository.createQueryBuilder()
            .relation(Topic, "course")
            .of(topic)
            .loadOne();

        return topic;
    }

    async updateTopic(topicId: number, topicTitle: string, description: string, type: string, content: string) {
        const topic = await this.topicRepository.findOne(topicId);
        if(!topic){
            throw new NotFoundException(`Topic not found with id:${topicId}`)
        }

        if(topicTitle){
            topic.topicTitle = topicTitle;
        }

        if(description){
            topic.description = description;
        }

        if(type){
            topic.type = type;
        }

        if(content){
            topic.content = content;
        }

        const newTopic =  await this.topicRepository.save(topic);
        newTopic.course = await this.courseRepository.createQueryBuilder()
            .relation(Topic, "course")
            .of(topic)
            .loadOne();
        return newTopic;
    }
}
