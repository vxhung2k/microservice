import { Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common/interfaces';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitMQ.service';

interface RabbitMQModuleOptions {
  name: string;
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  static register({ name }: RabbitMQModuleOptions): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
