import { RabbitMQModule } from './../../../shared/rabbit-MQ/rabbitMQ.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RabbitMQModule.register({
      name: 'USER',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppNotificationModule {}
