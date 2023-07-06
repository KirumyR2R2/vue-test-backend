import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';
import { CoreOutput } from 'src/core/dto/output.model';

@InputType({ description: 'Набор полей для удаления задачи' })
export class RemoveTaskInput extends PickType(Task, ['id']) {}

@ObjectType({ description: 'Результат операции удаления задачи' })
export class RemoveTaskOutput extends CoreOutput {}
