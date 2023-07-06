import { Injectable } from '@nestjs/common';
import {
  FindAllUsersInput,
  FindAllUsersOutput,
} from './dto/find-all-users.input';
import { PrismaService } from 'src/core/providers/database/prisma/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.input';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-task.input';
import { RemoveUserInput, RemoveUserOutput } from './dto/remove-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers({
    keyword,
  }: FindAllUsersInput): Promise<FindAllUsersOutput> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          ...(keyword && {
            username: { contains: keyword, mode: 'insensitive' },
          }),
        },
        include: {
          tasks: true,
        },
      });
      return {
        ok: true,
        users,
      };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createUser({ username }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const user = await this.prisma.user.create({
        data: {
          username,
        },
      });
      return { ok: true, user };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async updateUser({
    id,
    username,
  }: UpdateUserInput): Promise<UpdateUserOutput> {
    try {
      let user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: 'Пользователь не найден',
        };
      }
      user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          username,
        },
      });
      return { ok: true, user };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async removeUser({ id }: RemoveUserInput): Promise<RemoveUserOutput> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: { tasks: true },
      });
      if (!user) return { ok: false, error: 'Пользователь не найден' };
      if (user.tasks.length)
        return {
          ok: false,
          error: 'Невозможно удалить пользователя с существующими задачами!',
        };
      await this.prisma.user.delete({ where: { id } });
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
