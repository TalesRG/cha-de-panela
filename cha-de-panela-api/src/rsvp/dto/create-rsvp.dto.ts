import { Transform } from 'class-transformer';
import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

const trimOrNull = ({ value }: { value: unknown }) => {
  if (typeof value !== 'string') return value ?? null;
  const t = value.trim();
  return t.length === 0 ? null : t;
};

export class CreateRsvpDto {
  @Transform(trim)
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nome: string;

  @Transform(trimOrNull)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  acompanhante?: string | null;

  @Transform(trimOrNull)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  presente?: string | null;

  @Transform(trimOrNull)
  @IsOptional()
  @IsIn(['Havan', 'Amazon', 'Pix', 'Outro'])
  loja?: string | null;

  @Transform(trimOrNull)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  recado?: string | null;
}
