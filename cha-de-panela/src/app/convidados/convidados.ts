import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rsvp, RsvpService } from '../rsvp.service';

@Component({
  selector: 'app-convidados',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './convidados.html',
})
export class ConvidadosComponent implements OnInit {
  private rsvpService = inject(RsvpService);

  rsvps = signal<Rsvp[]>([]);
  loading = signal(true);
  error = signal(false);

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  async reload(): Promise<void> {
    this.loading.set(true);
    this.error.set(false);
    try {
      this.rsvps.set(await this.rsvpService.list());
    } catch {
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  totalPessoas(): number {
    return this.rsvps().reduce(
      (acc, r) => acc + 1 + (r.acompanhante ? 1 : 0),
      0,
    );
  }
}
