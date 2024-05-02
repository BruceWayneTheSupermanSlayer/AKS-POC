import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  ClientsModule,
  ClientsModuleOptions,
  Transport,
} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMqService } from './rabbit-mq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClientsModule.register(<ClientsModuleOptions>{
      clients: [
        {
          name: 'QUEUE_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: [             
              `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:5672`,
            ],
            queue: 'rabbit-mq',
            queueOptions: {
              durable: false,
            },
          },
        },
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RabbitMqService],
})
export class AppModule {}
