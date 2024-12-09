export interface LoginResponse {
    message: string;
    user: {
        cpf: string;
        email: string;
        nome: string;
    };
}