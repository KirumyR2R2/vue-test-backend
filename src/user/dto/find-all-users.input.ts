import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/output.model';
import { User } from '../entities/user.entity';

@InputType({
  description: 'Набор полей для вывода всех пользователей',
})
export class FindAllUsersInput {
  @Field(() => String, {
    description: 'Строка поиска по вхождению ключевых слов',
    nullable: true,
  })
  keyword?: string;
}

@ObjectType({ description: 'Список пользователей' })
export class FindAllUsersOutput extends CoreOutput {
  @Field(() => [User], { description: 'Список пользователей', nullable: true })
  users?: User[];
}
