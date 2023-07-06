import {
  InputType,
  PartialType,
  ObjectType,
  IntersectionType,
  PickType,
  Field,
} from '@nestjs/graphql';
import { Task } from '../entities/task.entity';
import { CreateTaskInput } from './create-task.input';
import { CoreOutput } from 'src/core/dto/output.model';

@InputType({
  description: 'Набор полей для редактирования задачи',
})
export class UpdateTaskInput extends IntersectionType(
  PickType(Task, ['id']),
  PartialType(CreateTaskInput),
) {}

@ObjectType({ description: 'Результат редактирования задачи' })
export class UpdateTaskOutput extends CoreOutput {
  @Field(() => Task, {
    description: 'Отредактированная задача',
    nullable: true,
  })
  task?: Task;
}
