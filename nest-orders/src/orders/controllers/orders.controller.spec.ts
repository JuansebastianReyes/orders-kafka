import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { KafkaProducerService } from '../../kafka/kafka-producer.service';
import { ProducerService } from '../../kafka/producer.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
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

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
