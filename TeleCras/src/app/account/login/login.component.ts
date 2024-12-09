import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';  // Importar o Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = ''; // Para exibir mensagens de erro
  email: string = '';        // Armazena o valor do email
  senha: string = '';        // Armazena o valor da senha
  disabled: boolean = false;

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  onLogin(form: NgForm): void {
    if (form.valid) {
      const loginData = {
        email: form.value.email,
        senha: form.value.senha,
      };
    this.http.post('/api/login', loginData).subscribe({
      next: (response) => {
      localStorage.setItem('usuario', JSON.stringify(response));
        console.log('Login bem-sucedido:');
        this.errorMessage = '';
        this.router.navigate(['/agendamentos'])
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404 ) {
          this.errorMessage = 'Usuário não cadastrado.';
        }
        if (error.status === 401) {
          this.errorMessage = 'Email ou senha inválidos.';
        }
        else {
          this.errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
        }
      }
    });
    } else {
      this.errorMessage = "Por favor, preencha todos os campos para continuar."
       this.disabled = true
       console.log("erro no login")
    }
  }
}
