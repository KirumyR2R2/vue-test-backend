import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput, CreateTaskOutput } from './dto/create-task.input';
import { UpdateTaskInput, UpdateTaskOutput } from './dto/update-task.input';
import { RemoveTaskInput, RemoveTaskOutput } from './dto/remove-task.input';
import {
  FindAllTasksInput,
  FindAllTasksOutput,
} from './dto/find-all-tasks.input';
import { FindTaskInput, FindTaskOutput } from './dto/find-one-task.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => CreateTaskOutput, {
    description: 'Создание новой задачи',
  })
  async createTask(
    @Args('input', {
      description: 'Набор полей для создания задачи',
    })
    createTaskInput: CreateTaskInput,
  ): Promise<CreateTaskOutput> {
    return this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => UpdateTaskOutput, {
    description: 'Редактирование задачи',
  })
  async updateTask(
    @Args('input', {
      description: 'Набор полей для редактирования задачи',
    })
    updateTaskInput: UpdateTaskInput,
  ): Promise<UpdateTaskOutput> {
    return this.taskService.updateTask(updateTaskInput);
  }

  @Mutation(() => RemoveTaskOutput, {
    description: 'Удаление задачи',
  })
  async removeTask(
    @Args('input', {
      description: 'Набор полей для удаления задачи',
    })
    removeTaskInput: RemoveTaskInput,
  ): Promise<RemoveTaskOutput> {
    return this.taskService.removeTask(removeTaskInput);
  }

  @Query(() => FindAllTasksOutput, {
    description: 'Получение списка задач пользователя',
  })
  findAllTasks(
    @Args('input', {
      description: 'Набор полей для вывода списка задач пользователя',
    })
    findAllTasksInput: FindAllTasksInput,
  ): Promise<FindAllTasksOutput> {
    return this.taskService.findAllTasks(findAllTasksInput);
  }

  @Query(() => FindTaskOutput, {
    description: 'Получение задачи',
  })
  findOneTask(
    @Args('input', {
      description: 'Набор полей для вывода задачи',
    })
    findTaskInput: FindTaskInput,
  ): Promise<FindTaskOutput> {
    return this.taskService.findOneTask(findTaskInput);
  }
}
