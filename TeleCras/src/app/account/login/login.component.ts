import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(form: NgForm): void {
    if (form.valid) {
      const loginData = {
        email: form.value.email,
        senha: form.value.senha,
       
      };
      this.router.navigate(['/agendamentos'])
      console.log("sucesso no login")


      // this.http.post('/api/login', loginData).subscribe({
      //   next: (response) => {
      //     console.log('Login bem-sucedido:', response);
      //     this.errorMessage = ''; // Limpa mensagem de erro
      //     // Redirecionar para a próxima página ou realizar outra ação
      //   },
      //   error: (error: HttpErrorResponse) => {
      //     if (error.status === 404) {
      //       this.errorMessage = 'Usuário não cadastrado.';
      //     } else {
      //       this.errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
      //     }
      //   }
      // });
    } else {
      this.errorMessage = "Por favor, preencha todos os campos para continuar."
       this.disabled = true
       console.log("erro no login")
    }
  }
}
