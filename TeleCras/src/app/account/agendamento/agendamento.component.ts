import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Agendamento } from 'src/app/models/agendamento.model';
import { ItemAgendamento } from 'src/app/models/listaAgendamentos.model';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {
  agendamentos: ItemAgendamento[] = [];
  nomeUsuario: string = '';
  horariosDisponiveis: string[] = [];
  erroData: boolean = false;
  cpf: string = "";
  errorAgendamento: string = "";
  errorCpf: boolean = false;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString); // Converte o JSON de volta para objeto
      this.cpf = usuario["user"]["cpf"];
      this.nomeUsuario = usuario["user"]["nome"].split(' ')[0];
      this.carregarAgendamentos();
    }
    this.gerarHorarios();
  }

  validarData(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    let data = new Date(input);
    const hoje = new Date();
    data.setDate(data.getDate() + 1);
  
    // Verifica se NÃO é dia útil ou se é menor que hoje
    if ((data.getDay() === 0 || data.getDay() === 6) || data < hoje) {
      this.erroData = true;
    } else {
      this.erroData = false;
    }
  }

  gerarHorarios(): void {
    const startTime = 8 * 60; // 8:00 em minutos
    const endTime = 17 * 60; // 17:00 em minutos
    const intervalo = 30; // Intervalo de 30 minutos
    const intervaloInicio = 12 * 60; // 12:00 em minutos
    const intervaloFim = 14 * 60; // 14:00 em minutos
  
    for (let time = startTime; time <= endTime; time += intervalo) {
      // Pula horários entre 12:00 e 14:00
      if (time >= intervaloInicio && time < intervaloFim) {
        continue;
      }
  
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
      this.horariosDisponiveis.push(formattedTime);
    }
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

  cpfvalidator(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    console.log(value, this.cpf);
    if (value !== this.cpf) {
      this.errorAgendamento = "CPF diferente do cadastrado"
      this.errorCpf = true;
    } else {
      console.log("cpfs iguais")
      this.errorCpf = false;
    }

  }

  carregarAgendamentos(): void {
    this.http.get<ItemAgendamento[]>('/api/agendamentos?cpf=' + this.cpf ).subscribe({
      next: (response: ItemAgendamento[]) => {
        this.agendamentos = [];
        response.forEach(item => this.agendamentos.push(item));
        console.log(this.agendamentos);
      },
      error: (error: HttpErrorResponse) => {

      }
    });
  }

  addAgendamento(form: any): void {
    if (form.valid && !this.erroData && !this.errorCpf) {
      const novoAgendamento: Agendamento  = {
        nome: form.value.nome,
        cpf: form.value.cpf.replace(/\D/g, ''),
        data: form.value.data,
        hora:  form.value.hora + ":00",
        servico: form.value.servico,
        contato: form.value.numero.replace(/\D/g, ''),
        local: form.value.unidade
      };
      console.log(novoAgendamento)
      this.http.post('/api/agendamentos', novoAgendamento ).subscribe({
        next: (response) => {
          console.log(response);
          this.carregarAgendamentos();
        },
        error: () => {
          this.errorAgendamento = "Erro ao criar agendamento"
        }
      });
      form.resetForm();
    }

  }


}
