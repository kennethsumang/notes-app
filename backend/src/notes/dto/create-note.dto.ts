import { IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  parent?: string;
}
