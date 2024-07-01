import { IsEmail, IsString, Length } from 'class-validator';

/**
 * CreateUserDto class
 * @author Kenneth Sumang
 */
export default class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}
