import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comment {
  @Prop()
  post_id: string;
  @Prop()
  comment: string;
  @Prop()
  user_id: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
