import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = ''; // Para exibir mensagens de erro

  constructor(private http: HttpClient) {}

  onLogin(form: any): void {
    if (form.valid) {
      const loginData = {
        email: form.value.email,
        senha: form.value.senha
      };

      this.http.post('http://127.0.0.1:5000/login', loginData).subscribe({
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
