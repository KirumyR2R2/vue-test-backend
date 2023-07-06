import { InputType, Field, PickType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/output.model';
import { User } from '../entities/user.entity';

@InputType({ description: 'Набор полей для создания пользователя' })
export class CreateUserInput extends PickType(User, ['username']) {}

@ObjectType({ description: 'Результат операции создания пользователя' })
export class CreateUserOutput extends CoreOutput {
  @Field(() => User, { description: 'Созданная пользователя', nullable: true })
  user?: User;
}
