import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModal: mongoose.Model<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentModal.create(createCommentDto);
    return comment;
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentModal.find();
    return comments;
  }

  async findOne(id: string): Promise<Comment> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('id not found');
    }
    const comment = await this.commentModal.findById(id);
    if (!comment) {
      throw new NotFoundException('Post not found');
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('id not found');
    }
    const comment = await this.commentModal.findByIdAndUpdate(
      id,
      updateCommentDto,
    );
    if (!comment) {
      throw new NotFoundException('something went wrong');
    }
    return comment;
  }

  async remove(id: string) {
    await this.commentModal.findByIdAndDelete(id);
    return { deleted: true };
  }
}
