import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreResolver } from './core.resolver';

@Module({
  providers: [CoreResolver, CoreService]
})
export class CoreModule {}
