import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { Course } from 'src/course/course.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Topic,Course])],
    controllers:[TopicController],
    providers:[TopicService],
    exports:[TypeOrmModule]
})
export class TopicModule {}
