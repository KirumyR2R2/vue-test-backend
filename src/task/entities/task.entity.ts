import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
  Int,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/core/entities/core.entity';
import { User } from 'src/user/entities/user.entity';

export enum TaskStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Complete = 'Complete',
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
  description: 'Статус задачи',
});

@InputType('TaskAbstract', { isAbstract: true })
@ObjectType({ description: 'Объект задачи' })
export class Task extends CoreEntity {
  @Field(() => String, { description: 'Оглавление задачи' })
  taskTitle: string;

  @Field(() => String, { description: 'Тело задачи' })
  taskBody: string;

  @Field(() => Date, { description: 'Сроки задачи начальная дата' })
  task_from: Date;

  @Field(() => Date, { description: 'Сроки задачи конечная дата' })
  task_to: Date;

  @Field(() => Int, {
    description: 'ID пользователя, которому принадлежит задача',
  })
  taskUserId: number;

  @Field(() => TaskStatus, { description: 'Статус задачи' })
  taskStatus: string;

  @Field(() => User, {
    description: 'Отвественный пользователь',
    nullable: true,
  })
  taskUser?: User;
}
