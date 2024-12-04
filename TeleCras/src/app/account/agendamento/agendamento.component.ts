import { Component } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {
  agendamentos: Array<any> = []; // Lista de agendamentos

  constructor() {}

  // Método para abrir a modal (opcional)
  openModal(): void {
    console.log('Modal aberta');
  }

  // Adiciona um novo agendamento
  addAgendamento(form: any): void {
    if (form.valid) {
      const newAgendamento = {
        nome: form.value.nome,
        cpf: form.value.cpf,
        dataHora: form.value.dataHora,
        servico: form.value.servico,
        numero: form.value.numero,
        unidade: form.value.unidade
      };

      this.agendamentos.push(newAgendamento); // Adiciona à lista
      form.reset(); // Reseta o formulário
      const modalCloseButton: HTMLElement | null = document.querySelector(
        '#agendamentoModal .btn-close'
      );
      modalCloseButton?.click(); // Fecha a modal
    }
  }

}
