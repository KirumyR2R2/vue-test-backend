import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Базовые поля сущностей' })
export class CoreEntity {
  @Field(() => Int, { description: 'Идентификатор записи в базе данных' })
  id: number;

  @Field(() => Date, { description: 'Дата создания записи в базе данных' })
  created_at: Date;

  @Field(() => Date, { description: 'Дата обновления записи в базе данных' })
  updated_at: Date;
}