import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { CourseModule } from './course/course.module';
import { TopicController } from './topic/topic.controller';
import { TopicService } from './topic/topic.service';
import { TopicModule } from './topic/topic.module';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryController } from './subcategory/subcategory.controller';
import { SubcategoryService } from './subcategory/subcategory.service';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [UserModule, CourseModule, TopicModule, CategoryModule, SubcategoryModule, TypeOrmModule.forRoot(), AuthModule, ImagesModule],
  controllers: [AppController, UserController, CourseController, TopicController, CategoryController, SubcategoryController],
  providers: [AppService, UserService, CourseService, TopicService, CategoryService, SubcategoryService],
})
export class AppModule {
  constructor(private connection:Connection){}
}
