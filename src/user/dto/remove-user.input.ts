import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/output.model';
import { User } from '../entities/user.entity';

@InputType({ description: 'Набор полей для удаления пользователя' })
export class RemoveUserInput extends PickType(User, ['id']) {}

@ObjectType({ description: 'Результат операции удаления пользователя' })
export class RemoveUserOutput extends CoreOutput {}
