import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [KafkaModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
