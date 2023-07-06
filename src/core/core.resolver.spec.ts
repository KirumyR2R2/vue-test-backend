import { Test, TestingModule } from '@nestjs/testing';
import { CoreResolver } from './core.resolver';
import { CoreService } from './core.service';

describe('CoreResolver', () => {
  let resolver: CoreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreResolver, CoreService],
    }).compile();

    resolver = module.get<CoreResolver>(CoreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
