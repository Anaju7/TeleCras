import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { AgendamentoComponent } from './account/agendamento/agendamento.component';
import { AuthGuard } from './account/shared/auth.guard';
import { HomePageComponent } from './home/home-page/home-page.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled', // Ativa o scroll para fragmentos
};

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'acessar',
    component: LoginComponent,
  },
  {
    path: 'criar-conta',
    component: CreateAccountComponent,
  },
  {
    path: 'agendamentos',
    component: AgendamentoComponent,
    canActivate: [AuthGuard] // Garante que só usuários autenticados acessem essa rota
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
