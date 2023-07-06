import { InputType, Field, PickType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/output.model';
import { Task } from '../entities/task.entity';

@InputType({ description: 'Набор полей для создания задачи' })
export class CreateTaskInput extends PickType(Task, [
  'taskTitle',
  'taskBody',
  'task_from',
  'task_to',
  'taskStatus',
  'taskUserId',
]) {}

@ObjectType({ description: 'Результат операции создания задачи' })
export class CreateTaskOutput extends CoreOutput {
  @Field(() => Task, { description: 'Созданная задача', nullable: true })
  task?: Task;
}
