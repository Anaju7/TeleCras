import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'TeleCras';
  currentPath: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;  // Atualiza o currentPath sempre que a URL mudar
    });
  }

  ShowAcessButton(): boolean {
    const currentPath = this.router.url.split('#')[0]; // Ignora fragmentos
    return currentPath !== '/agendamentos' && currentPath !== '/acessar'; // Exibe o botão somente se a rota for diferente dessas
  }

  isAgendamentosPage(): boolean {
    const currentPath = this.router.url.split('#')[0]; // Ignora fragmentos
    return currentPath === '/agendamentos'; // Verifica se o caminho é '/agendamentos'
  }

  isNotHomePage() {
    const currentPath = this.router.url.split('#')[0]; // Ignora fragmentos (o que vem após '#')
    return currentPath !== '/'; // Verifica apenas o caminho base
  }

  // Método para verificar se o path é a página inicial
  isHomePage(): boolean {
    const path = this.router.url.split('#')[0]; // Pega apenas a parte do path, sem o fragmento
    const fragment = this.router.url.split('#')[1]; // Pega a parte do fragmento (se houver)
    
    // Verifica se é a página inicial ou se está navegando com fragmentos específicos
    return path === '/' && (!fragment || ['services','sobre', 'FAQ', 'footer'].includes(fragment));
  }
}
