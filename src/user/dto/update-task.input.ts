import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/output.model';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './create-user.input';

@InputType({
  description: 'Набор полей для редактирования пользователя',
})
export class UpdateUserInput extends IntersectionType(
  PickType(User, ['id']),
  PartialType(CreateUserInput),
) {}

@ObjectType({ description: 'Результат редактирования пользователоя' })
export class UpdateUserOutput extends CoreOutput {
  @Field(() => User, {
    description: 'Отредактированный пользователь',
    nullable: true,
  })
  user?: User;
}
