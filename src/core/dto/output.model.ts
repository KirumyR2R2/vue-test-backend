import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Базовый результат операции' })
export class CoreOutput {
  @Field(() => String, { description: 'Описание ошибки', nullable: true })
  error?: string;

  @Field(() => Boolean, { description: 'Статус операции' })
  ok: boolean;
}
