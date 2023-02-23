import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  body: string;

  @Prop()
  author: string;

  @Prop()
  tags: string[];

  @Prop()
  images?: object[];

  @Prop()
  comment_ids: string[];
}
export const PostSchema = SchemaFactory.createForClass(Post);
