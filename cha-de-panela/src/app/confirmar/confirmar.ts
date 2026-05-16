import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateRsvpPayload, RsvpService } from '../rsvp.service';

type Acomp = 'sim' | 'nao';

@Component({
  selector: 'app-confirmar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './confirmar.html',
})
export class ConfirmarComponent {
  private rsvpService = inject(RsvpService);
  private router = inject(Router);

  submitting = signal(false);
  toastMsg = signal('');
  toastVisible = signal(false);
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  form = {
    nome: '',
    acomp: 'nao' as Acomp,
    acompNome: '',
    presenteNome: '',
    loja: '',
    recado: '',
  };

  async submitRsvp(event: Event): Promise<void> {
    event.preventDefault();
    if (this.submitting()) return;

    const nome = this.form.nome.trim();
    const acompNome = this.form.acompNome.trim();
    const presente = this.form.presenteNome.trim();
    const recado = this.form.recado.trim();

    if (!nome) {
      this.showToast('Digite seu nome');
      return;
    }
    if (this.form.acomp === 'sim' && !acompNome) {
      this.showToast('Digite o nome do acompanhante');
      return;
    }

    const payload: CreateRsvpPayload = {
      nome,
      acompanhante: this.form.acomp === 'sim' ? acompNome : null,
      presente: presente || null,
      loja: this.form.loja || null,
      recado: recado || null,
    };

    try {
      this.submitting.set(true);
      await this.rsvpService.add(payload);
      this.showToast('Presença confirmada, até lá!');
      setTimeout(() => this.router.navigate(['/convidados']), 1200);
    } catch {
      this.showToast('Erro ao salvar — tente novamente');
    } finally {
      this.submitting.set(false);
    }
  }

  private showToast(msg: string): void {
    this.toastMsg.set(msg);
    this.toastVisible.set(true);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastVisible.set(false), 2600);
  }
}
