import { Resolver } from '@nestjs/graphql';
import { CoreService } from './core.service';
import { CoreEntity } from './entities/core.entity';

@Resolver(() => CoreEntity)
export class CoreResolver {
  constructor(private readonly coreService: CoreService) {}

}
