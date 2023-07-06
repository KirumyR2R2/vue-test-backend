import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from 'src/core/providers/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
