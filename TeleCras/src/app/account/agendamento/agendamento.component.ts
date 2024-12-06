import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {
  agendamentos: Array<any> = []; // Lista de agendamentos

  constructor(private readonly el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (value.length > 11) value = value.substring(0, 11); // Limita ao tamanho de um CPF

    // Aplica a máscara de CPF: 123.456.789-01
    if (value.length > 9) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{1,3})/, '$1.$2');
    }

    input.value = value;
  }

  // Método para abrir a modal (opcional)
  openModal(): void {
    console.log('Modal aberta');
  }

  formatPhone(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
  
    if (value.length > 11) value = value.substring(0, 11);
  
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{1,4})/, '($1) $2');
    } else {
      value = value.replace(/^(\d*)/, '($1');
    }
  
    input.value = value;
  }

  formatCpf(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove tudo que não for número
  
    if (value.length > 11) value = value.substring(0, 11);
  
    if (value.length > 9) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{1,3})/, '$1.$2');
    }
  
    input.value = value;
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
