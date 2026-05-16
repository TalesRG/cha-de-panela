import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RsvpService, CreateRsvpPayload } from '../rsvp.service';

type TabKey = 'presentes' | 'rsvp';
type Acomp = 'sim' | 'nao';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagina-inicial.html',
})
export class PaginaInicialComponent implements AfterViewInit {
  private rsvpService = inject(RsvpService);

  @ViewChild('buntingFlags', { static: true }) buntingFlags!: ElementRef<SVGGElement>;
  @ViewChild('pixKey', { static: true }) pixKey!: ElementRef<HTMLDivElement>;

  readonly pixKeyValue = '(61) 98633-3982';

  activeTab = signal<TabKey>('presentes');

  toastMsg = signal('');
  toastVisible = signal(false);
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  manualCopyVisible = signal(false);
  manualCopyText = signal('');

  form = {
    nome: '',
    acomp: 'nao' as Acomp,
    acompNome: '',
    presenteNome: '',
    loja: '',
    recado: '',
  };

  ngAfterViewInit(): void {
    this.drawBunting();
  }

  selectTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  async submitRsvp(event: Event): Promise<void> {
    event.preventDefault();
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
      await this.rsvpService.add(payload);
      this.resetForm();
      this.showToast('Presença confirmada, até lá!');
    } catch {
      this.showToast('Erro ao salvar — tente novamente');
    }
  }

  private resetForm(): void {
    this.form = {
      nome: '',
      acomp: 'nao',
      acompNome: '',
      presenteNome: '',
      loja: '',
      recado: '',
    };
  }

  copyPix(): void {
    const raw = this.pixKeyValue.trim();
    const cleaned = raw.replace(/\D/g, '');
    const toCopy = cleaned || raw;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(toCopy)
        .then(() => this.showToast('Chave Pix copiada!'))
        .catch(() => this.fallbackCopy(toCopy));
    } else {
      this.fallbackCopy(toCopy);
    }
  }

  private fallbackCopy(text: string): void {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    ta.setAttribute('readonly', '');
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    if (ok) {
      this.showToast('Chave Pix copiada!');
    } else {
      this.manualCopyText.set(text);
      this.manualCopyVisible.set(true);
    }
  }

  closeManualCopy(): void {
    this.manualCopyVisible.set(false);
  }

  selectPixKey(): void {
    const el = this.pixKey?.nativeElement;
    if (!el) return;
    if (window.getSelection && document.createRange) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  private showToast(msg: string): void {
    this.toastMsg.set(msg);
    this.toastVisible.set(true);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastVisible.set(false), 2600);
  }

  private drawBunting(): void {
    const g = this.buntingFlags?.nativeElement;
    if (!g) return;
    const colors = ['#b54a2c', '#c98a2b', '#3d5232', '#8a3520', '#a8331f', '#9a661c'];
    const w = 1200;
    const count = 40;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = t * w;
      const y = 30 * Math.sin(Math.PI * t);
      const color = colors[i % colors.length];
      const flag = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      flag.setAttribute('d', `M ${x - 8} ${y} L ${x + 8} ${y} L ${x} ${y + 18} Z`);
      flag.setAttribute('fill', color);
      flag.setAttribute('opacity', '0.92');
      g.appendChild(flag);
    }
  }
}
