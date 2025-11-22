import { Module } from '@nestjs/common';

import { KafkaProducerService } from './kafka-producer.service';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';

@Module({
  providers: [ProducerService, KafkaProducerService, ConsumerService],
  exports: [KafkaProducerService, ConsumerService],
})
export class KafkaModule {}
