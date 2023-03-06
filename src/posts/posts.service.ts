import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import * as mongoose from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { UserRoles } from 'src/auth/schema/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: mongoose.Model<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.postModel.create(createPostDto);
    return post;
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel.find();
    return posts;
  }

  async findOne(id: string): Promise<Post> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('id not found');
    }
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('id not found');
    }
    const post = await this.postModel.findByIdAndUpdate(id, updatePostDto);
    if (!post) {
      throw new NotFoundException('something went wrong');
    }
    return post;
  }

  async remove(id: string): Promise<{ deleted: Boolean }> {
    await this.postModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}
