import { UserService } from './user.service';
import { User } from './entities/user.entity';
import {
  FindAllUsersInput,
  FindAllUsersOutput,
} from './dto/find-all-users.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.input';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-task.input';
import { RemoveUserInput, RemoveUserOutput } from './dto/remove-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => FindAllUsersOutput, {
    description: 'Получение списка пользователей',
  })
  findAllUsers(
    @Args('input', {
      description: 'Набор полей для вывода списка пользователей',
    })
    findAllUsersInput: FindAllUsersInput,
  ): Promise<FindAllUsersOutput> {
    return this.userService.findAllUsers(findAllUsersInput);
  }

  @Mutation(() => CreateUserOutput, {
    description: 'Создание нового пользователя',
  })
  async createUser(
    @Args('input', {
      description: 'Набор полей для создания пользователя',
    })
    createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UpdateUserOutput, {
    description: 'Редактирование пользователя',
  })
  async updateUser(
    @Args('input', {
      description: 'Набор полей для редактирования пользователя',
    })
    updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    return this.userService.updateUser(updateUserInput);
  }
  
  @Mutation(() => RemoveUserOutput, {
    description: 'Удаление пользователя',
  })
  async removeUser(
    @Args('input', {
      description: 'Набор полей для удаления пользователя',
    })
    removeUserInput: RemoveUserInput,
  ): Promise<RemoveUserOutput> {
    return this.userService.removeUser(removeUserInput);
  }
}
