import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/output.model';
import { Task } from '../entities/task.entity';

@InputType({
  description: 'Набор полей для вывода всех задач пользователя',
})
export class FindAllTasksInput {
  @Field(() => String, {
    description: 'Строка поиска по вхождению ключевых слов',
    nullable: true,
  })
  keyword?: string;

  @Field(() => Int, {
    description: 'ID Пользователя, по которому фильтруются задачи',
    nullable: true,
  })
  userId?: number;
}

@ObjectType({ description: 'Список задач' })
export class FindAllTasksOutput extends CoreOutput {
  @Field(() => [Task], { description: 'Список задач', nullable: true })
  tasks?: Task[];
}
