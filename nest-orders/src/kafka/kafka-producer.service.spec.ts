import { Test, TestingModule } from '@nestjs/testing';
import { KafkaProducerService } from './kafka-producer.service';
import { ProducerService } from './producer.service';

describe('KafkaProducerService', () => {
  let service: KafkaProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProducerService,
          useValue: {
            getProducer: () => ({ send: jest.fn() }),
          },
        },
        KafkaProducerService,
      ],
    }).compile();

    service = module.get<KafkaProducerService>(KafkaProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
