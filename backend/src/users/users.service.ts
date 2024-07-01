import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import { getCurrentUtc } from 'src/common/libraries/date.library';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Finds one by email
   * @param   {string} email
   * @returns {Promise<User | undefined>}
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({ where: { email } });
  }

  /**
   * Create a new user
   * @param   {CreateUserDto} userDto
   * @returns {Promise<User>}
   */
  async createUser(userDto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        ...userDto,
        createdOn: getCurrentUtc(),
      },
    });
  }
}
