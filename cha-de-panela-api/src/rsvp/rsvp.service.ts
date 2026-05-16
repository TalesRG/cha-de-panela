import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { RsvpEntity } from './entities/rsvp.entity';

@Injectable()
export class RsvpService {
  constructor(
    @InjectRepository(RsvpEntity)
    private readonly repo: Repository<RsvpEntity>,
  ) {}

  list(): Promise<RsvpEntity[]> {
    return this.repo.find({ order: { when: 'ASC' } });
  }

  create(dto: CreateRsvpDto): Promise<RsvpEntity> {
    const rsvp = this.repo.create({
      nome: dto.nome,
      acompanhante: dto.acompanhante ?? null,
      presente: dto.presente ?? null,
      loja: dto.loja ?? null,
      recado: dto.recado ?? null,
    });
    return this.repo.save(rsvp);
  }
}
