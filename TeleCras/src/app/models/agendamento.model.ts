export interface Agendamento {
    id: number;
    nome: string;
    cpf: string;
    data: string;  // Formato 'YYYY-MM-DD'
    hora: string;  // Formato 'HH:mm:ss'
    servico: string;
    numero: string;
    unidade: string;
    local: string;
  }