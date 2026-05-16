import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { RsvpEntity } from './entities/rsvp.entity';
import { RsvpService } from './rsvp.service';

@Controller('rsvps')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Get()
  list(): Promise<RsvpEntity[]> {
    return this.rsvpService.list();
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateRsvpDto): Promise<RsvpEntity> {
    return this.rsvpService.create(dto);
  }
}
