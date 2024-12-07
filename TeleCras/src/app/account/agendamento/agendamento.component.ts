import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Agendamento } from 'src/app/models/agendamento.model';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {
  agendamentos: Agendamento[] = [];
  nomeUsuario: string = 'Ana Ju'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

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

  carregarAgendamentos(): void {
    this.http.get<any[]>('URL_DA_API').subscribe({
      next: (response) => {
        this.agendamentos = response;
      },
      error: (error) => {
        console.error('Erro ao carregar agendamentos:', error);
      }
    });
  }

  addAgendamento(form: any): void {
    if (form.valid) {
      const novoAgendamento: Agendamento  = {
        id: this.agendamentos.length + 1,
        nome: form.value.nome,
        cpf: form.value.cpf,
        data: form.value.dataHora.split('T')[0],
        hora: form.value.dataHora.split('T')[1],
        servico: form.value.servico,
        numero: form.value.numero,
        unidade: form.value.unidade,
        local: form.value.unidade
      };
      this.agendamentos.push(novoAgendamento); // Atualiza a lista local
      form.resetForm(); // Reseta o formulário após o envio
    }

  }


}
