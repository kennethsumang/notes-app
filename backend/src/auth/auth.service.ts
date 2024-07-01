import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { compare, hash } from 'src/common/libraries/hash.library';
import { JwtService } from '@nestjs/jwt';
import CreateUserDto from 'src/users/dto/create-user.dto';
import * as _ from 'lodash';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Signs up user
   * @param   {CreateUserDto} userDto
   * @returns {Promise<User>}
   */
  async signUp(userDto: CreateUserDto): Promise<User> {
    userDto.password = await hash(userDto.password);
    return await this.usersService.createUser(userDto);
  }

  /**
   * Validates user
   * @param   {string} email
   * @param   {string} password
   * @returns {Promise<UserW | null>}
   */
  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const match = await compare(pass, user.password);
    if (match) {
      return _.omit(user, ['password']);
    }

    return null;
  }

  /**
   * Logs in user
   * @param   {any} user
   * @returns {Promise<{ accessToken: string}>}
   */
  async login(user: any): Promise<{ accessToken: string }> {
    const payload = {
      sub: user.id,
      email_verified_at: user.email_verified_at,
      email: user.email,
      name: user.name,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
