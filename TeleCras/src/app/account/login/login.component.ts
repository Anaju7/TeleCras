import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = ''; // Para exibir mensagens de erro

  constructor(private http: HttpClient) {}
  onLogin(form: NgForm): void {
    if (form.valid) {
      const loginData = {
        email: form.value.email,
        senha: form.value.senha
      };

      this.http.post('/api/login', loginData).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido:', response);
          this.errorMessage = ''; // Limpa mensagem de erro
          // Redirecionar para a próxima página ou realizar outra ação
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.errorMessage = 'Usuário não cadastrado.';
          } else {
            this.errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
          }
        }
      });
    }
  }

}
