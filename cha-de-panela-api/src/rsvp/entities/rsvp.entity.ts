import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rsvps' })
export class RsvpEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
  nome: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  acompanhante: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  presente: string | null;

  @Column({ type: 'varchar', length: 40, nullable: true })
  loja: string | null;

  @Column({ type: 'text', nullable: true })
  recado: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  when: Date;
}
