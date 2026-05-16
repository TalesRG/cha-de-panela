import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial';
import { ConvidadosComponent } from './convidados/convidados';
import { ConfirmarComponent } from './confirmar/confirmar';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'confirmar', component: ConfirmarComponent },
  { path: 'convidados', component: ConvidadosComponent },
];
