import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
    constructor(private readonly topicService: TopicService) { }

    @Post()
    async insertTopic(
        @Body('topicTitle') topicTitle: string,
        @Body('description') description: string,
        @Body('type') type: string,
        @Body('content') content: string,
        @Body('courseId') courseId: number
    ) {
        return await this.topicService.insertTopic(topicTitle, description, type, content, courseId);
    }

    @Get(':id')
    async findOneTopic(@Param('id') id:number){
        return await this.topicService.findOneTopic(id);
    }

    @Patch(':id')
    async updateTopic(
        @Param('id') topicId:number,
        @Body('topicTitle') topicTitle: string,
        @Body('description') description: string,
        @Body('type') type: string,
        @Body('content') content: string,
    ){
        return this.topicService.updateTopic(topicId,topicTitle,description,type,content);
    }

}
