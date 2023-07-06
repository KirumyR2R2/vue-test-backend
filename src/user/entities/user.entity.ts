import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { CoreEntity } from 'src/core/entities/core.entity';
import { Task } from 'src/task/entities/task.entity';

@InputType('UserAbstract', { isAbstract: true })
@ObjectType({ description: 'Объект пользователя' })
export class User extends CoreEntity {
  @Field(() => String, { description: 'Имя пользователя в системе' })
  username: string;

  @Field(() => [Task], { description: 'Задачи пользователя', nullable: true })
  tasks?: Task[];
}
