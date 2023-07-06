import { Injectable } from '@nestjs/common';
import { CreateTaskInput, CreateTaskOutput } from './dto/create-task.input';
import { PrismaService } from 'src/core/providers/database/prisma/prisma.service';
import { TaskStatus } from './entities/task.entity';
import { UpdateTaskInput, UpdateTaskOutput } from './dto/update-task.input';
import { RemoveTaskInput, RemoveTaskOutput } from './dto/remove-task.input';
import {
  FindAllTasksInput,
  FindAllTasksOutput,
} from './dto/find-all-tasks.input';
import { FindTaskInput, FindTaskOutput } from './dto/find-one-task.input';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask({
    taskTitle,
    taskBody,
    taskStatus,
    taskUserId,
    task_from,
    task_to,
  }: CreateTaskInput): Promise<CreateTaskOutput> {
    try {
      if (task_from > task_to) {
        return {
          ok: false,
          error: 'Время начальной даты не может быть позднее даты завершения',
        };
      }
      const task = await this.prisma.task.create({
        data: {
          taskTitle,
          taskBody,
          task_from,
          task_to,
          taskStatus: TaskStatus[taskStatus],
          taskUserId,
        },
      });
      return { ok: true, task };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async updateTask({
    id,
    taskTitle,
    taskBody,
    taskStatus,
    task_from,
    task_to,
    taskUserId,
  }: UpdateTaskInput): Promise<UpdateTaskOutput> {
    try {
      if (task_from > task_to) {
        return {
          ok: false,
          error: 'Время начальной даты не может быть позднее даты завершения',
        };
      }
      let task = await this.prisma.task.findUnique({
        where: {
          id,
        },
      });
      if (!task) {
        return {
          ok: false,
          error: 'Задача не найдена',
        };
      }
      task = await this.prisma.task.update({
        where: {
          id,
        },
        data: {
          taskTitle,
          taskBody,
          task_from,
          task_to,
          taskStatus: TaskStatus[taskStatus],
          taskUserId,
        },
      });
      return { ok: true, task };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async removeTask({ id }: RemoveTaskInput): Promise<RemoveTaskOutput> {
    try {
      const task = await this.prisma.task.findUnique({ where: { id } });
      if (!task) return { ok: false, error: 'Задача не найдена' };
      await this.prisma.task.delete({ where: { id } });
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findAllTasks({
    keyword,
    userId,
  }: FindAllTasksInput): Promise<FindAllTasksOutput> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          ...(keyword && {
            taskTitle: { contains: keyword, mode: 'insensitive' },
          }),
          ...(keyword && {
            taskBody: { contains: keyword, mode: 'insensitive' },
          }),
          ...(userId && {
            taskUserId: userId,
          }),
        },
        include: {
          taskUser: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      return {
        ok: true,
        tasks: tasks.map((task) => ({
          ...task,
          taskUser: task.taskUser,
        })),
      };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findOneTask({ id }: FindTaskInput): Promise<FindTaskOutput> {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
        include: { taskUser: true },
      });
      if (!task) return { ok: false, error: 'Задача не найдена' };
      return {
        ok: true,
        task: {
          ...task,
          taskUser: task.taskUser,
        },
      };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
