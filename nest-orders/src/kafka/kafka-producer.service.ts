import { Injectable } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Injectable()
export class KafkaProducerService {
  constructor(private readonly producerService: ProducerService) {}

  async emit(topic: string, key: string, value: unknown) {
    const producer = this.producerService.getProducer();

    await producer.send({
      topic,
      messages: [
        {
          key,
          value: JSON.stringify(value),
        },
      ],
    });
  }
}
