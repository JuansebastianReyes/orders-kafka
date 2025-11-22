import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
