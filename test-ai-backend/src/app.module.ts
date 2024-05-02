import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  ClientsModule,
  ClientsModuleOptions,
  Transport,
} from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMqConsumerService } from './rabbit-mq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    /*  ClientsModule.register(<ClientsModuleOptions>{
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
        }), */
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RabbitMqConsumerService],
})
export class AppModule {}
