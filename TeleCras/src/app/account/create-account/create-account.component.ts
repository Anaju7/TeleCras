import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/cadastro.model';
declare let bootstrap: any;
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  errorMessage: string = ''; // Para exibir mensagens de erro
  errorForm: boolean = false;

  constructor(private readonly http: HttpClient) {}

  validateName(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[0-9]/g, ''); // Remove números
  }

  formatPhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
    }

    input.value = value;
  }

  formatCpf(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 9) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
    }

    input.value = value;
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const usuario: User = {
        nome: form.value.name,
        email: form.value.email,
        senha: form.value.senha,
        cpf: form.value.cpf.replace(/\D/g, ''),
        contato: form.value.phone.replace(/\D/g, '')
      };

    this.http.post('/api/cadastro', usuario).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.errorForm = false;
        const modalElement = document.getElementById('successModal');
        if (modalElement) {
          const bootstrapModal = new bootstrap.Modal(modalElement);
          bootstrapModal.show();
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404 ) {
          this.errorForm = true;
          console.log(error.message)
          this.errorMessage = error.message;
        }
        else {
          this.errorForm = true;
          this.errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
        }
      }
    });
    } else {
      this.errorForm = true;
      console.log('Form is invalid.');
    }
  }

}
