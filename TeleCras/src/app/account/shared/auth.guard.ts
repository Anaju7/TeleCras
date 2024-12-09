import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly router: Router) {}
  canActivate(): boolean {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      return true; // Permite o acesso
    } else {
      // Redireciona para a página de login se não estiver logado
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
