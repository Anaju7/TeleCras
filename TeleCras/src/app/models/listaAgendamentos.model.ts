export interface ItemAgendamento {
    contato: string;
    cpf: string;
    data: string; // ou Date, se preferir manipular como objeto de data
    hora: string; // ou Date, se preferir usar um objeto de data e hora
    id: number;
    local: string;
    nome: string;
    servico: string;
}