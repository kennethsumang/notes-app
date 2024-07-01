import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

/**
 * CreateNoteDto class
 * @author Kenneth Sumang
 */
export default class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @Optional()
  parent?: string;
}
