import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/output.model';
import { Task } from '../entities/task.entity';

@InputType({
  description: 'Набор полей для вывода задачи',
})
export class FindTaskInput {
  @Field(() => Int, {
    description: 'ID задачи',
  })
  id: number;
}

@ObjectType({ description: 'Результат поиска задачи' })
export class FindTaskOutput extends CoreOutput {
  @Field(() => Task, { description: 'Найденная задача', nullable: true })
  task?: Task;
}
