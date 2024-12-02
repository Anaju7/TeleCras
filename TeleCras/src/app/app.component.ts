import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeleCras';
  cep: string = '';
  endereco: any = null;
  crasInfo: string | null = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  buscarCep() {
    this.error = null;
    this.endereco = null;
    this.crasInfo = null;

    if (!this.cep) {
      this.error = 'Por favor, digite um CEP válido.';
      console.log("Por favor, digite um CEP válido.")
      return;
    }

    const apiUrl = `https://viacep.com.br/ws/${this.cep}/json/`;

    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        if (response.erro) {
          this.error = 'CEP não encontrado.';
          console.log('CEP não encontrado.')
        } else {
          this.endereco = response;
          this.definirCrasMaisProximo(response);
          console.log(response)
        }
      },
      error: () => {
        this.error = 'Erro ao buscar o CEP. Tente novamente.';
      },
    });
  }

  definirCrasMaisProximo(response: any) {
    const bairro = response.bairro.toLowerCase();
    const localidade = response.localidade.toLowerCase();
    console.log(localidade)
    // Exemplo de lógica para definir o CRAS mais próximo
    if (['santo amaro', 'boa vista', 'coelhos', 'soledade', 'recife'].includes(bairro)
         && localidade === 'recife') {
      this.crasInfo = `
        <strong>CRAS Santo Amaro</strong><br/>
        Rua Treze de Maio, nº 76 – Santo Amaro<br/>
        Fone: 99251-6813 / 3232-1547 / 3232-1548<br/>
        E-mail: crasboavista01@gmail.com<br/>
        (Em frente à clínica Ultra-diagnóstico)
      `;
    }
    if (['ilha joana bezerra', 'cabanga', 'são josé', 'ilha do leite', 'paissandu'].includes(bairro)
       && localidade === 'recife') {
      this.crasInfo = `
        <strong>CRAS Joana Bezerra/Coque</strong><br/>
        Rua Lourenço de Sá, nº 140 - Ilha Joana Bezerra<br/>
        Fone: 99264-6612 / 3355-8665<br/>
        E-mail: crasjoanabezerra@gmail.com<br/>
        (Compaz Dom Hélder Câmara)
      `;
    } 
    else {
      this.crasInfo = 'Não há CRAS próximo definido para este bairro.';
    }
  }
}
