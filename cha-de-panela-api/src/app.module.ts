import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RsvpModule } from './rsvp/rsvp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: parseInt(config.get<string>('DATABASE_PORT', '5432'), 10),
        username: config.get<string>('DATABASE_USERNAME', 'tales'),
        password: config.get<string>('DATABASE_PASSWORD', 'tales123456'),
        database: config.get<string>('DATABASE_NAME', 'convidados'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    RsvpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
