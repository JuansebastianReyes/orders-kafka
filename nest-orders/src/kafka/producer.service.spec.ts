import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';

describe('ProducerService', () => {
  let provider: ProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducerService],
    }).compile();

    provider = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
