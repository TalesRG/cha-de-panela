import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RsvpEntity } from './entities/rsvp.entity';
import { RsvpController } from './rsvp.controller';
import { RsvpService } from './rsvp.service';

@Module({
  imports: [TypeOrmModule.forFeature([RsvpEntity])],
  controllers: [RsvpController],
  providers: [RsvpService],
})
export class RsvpModule {}
