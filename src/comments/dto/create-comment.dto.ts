import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  post_id: string;
  @IsNotEmpty()
  @IsString()
  comment: string;
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
