import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

export interface Rsvp {
  id?: string;
  nome: string;
  acompanhante: string | null;
  presente: string | null;
  loja: string | null;
  recado: string | null;
  when: string;
}

export interface CreateRsvpPayload {
  nome: string;
  acompanhante: string | null;
  presente: string | null;
  loja: string | null;
  recado: string | null;
}

@Injectable({ providedIn: 'root' })
export class RsvpService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/rsvps`;

  list(): Promise<Rsvp[]> {
    return firstValueFrom(this.http.get<Rsvp[]>(this.baseUrl));
  }

  add(payload: CreateRsvpPayload): Promise<Rsvp> {
    return firstValueFrom(this.http.post<Rsvp>(this.baseUrl, payload));
  }
}
