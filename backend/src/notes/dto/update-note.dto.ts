import { IsOptional, IsString } from 'class-validator';

/**
 * CreateNoteDto class
 * @author Kenneth Sumang
 */
export default class UpdateNoteDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  parent?: string;
}
