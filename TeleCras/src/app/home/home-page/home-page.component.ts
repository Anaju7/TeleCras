import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
declare const bootstrap: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  cep: string = '';
  endereco: any = null;
  crasInfo: string | null = null;
  error: string | null = null;

  

  constructor(private readonly http: HttpClient) {}


  onInputCep(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const formattedCep = this.applyCepMask(input);
    this.cep = formattedCep;
  }

  applyCepMask(value: string): string {
    const numericValue = value.replace(/\D+/g, ''); // Remove caracteres não numéricos
    if (numericValue.length > 5) {
      return numericValue.slice(0, 5) + '-' + numericValue.slice(5, 8); // Aplica o formato XXXXX-XXX
    }
    return numericValue; // Retorna o valor sem o traço, se menor que 5 dígitos
  }

  preventNonNumeric(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (
      !allowedKeys.includes(event.key) && !/^[0-9]$/.test(event.key) // Permite apenas números
    ) {
      event.preventDefault(); // Bloqueia qualquer outra tecla
    }
  }

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

    switch (true) {
      case ['santo amaro', 'boa vista', 'coelhos', 'soledade', 'recife'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Santo Amaro</strong><br/>
          Rua Treze de Maio, nº 76 – Santo Amaro<br/>
          Fone: <a href="tel:+5581992516813">99251-6813</a> / <a href="tel:+5532321547">3232-1547</a> / <a href="tel:+5532321548">3232-1548</a><br/>
          E-mail: <a href="mailto:crasboavista01@gmail.com">crasboavista01@gmail.com</a><br/>
          (Em frente à clínica Ultra-diagnóstico)
        `;
        break;
      case ['ilha joana bezerra', 'cabanga', 'são josé', 'ilha do leite', 'paissandu'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Joana Bezerra/Coque</strong><br/>
          Rua Lourenço de Sá, nº 140 - Ilha Joana Bezerra<br/>
          Fone: <a href="tel:+5581992646612">99264-6612</a> / <a href="tel:+5533558665">3355-8665</a><br/>
          E-mail: <a href="mailto:crasjoanabezerra@gmail.com">crasjoanabezerra@gmail.com</a><br/>
          (Compaz Dom Hélder Câmara)
        `;
        break;
      case ['campina do barreto', 'arruda', 'campo grande', 'encruzilhada', 'hipodromo', 'peixinhos', 'ponto de parada', 'rosarinho', 'torreão', 'cajueiro', 'fundão', 'porto da madeira'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Campina do Barreto</strong><br/>
          Rua Mário Libório, s/n – Campina do Barreto<br/>
          Fone: <a href="tel:+5588993233168">99323-3168</a> / <a href="tel:+5532327897">3232-7897</a> / <a href="tel:+5532327846">3232-7846</a> / <a href="tel:+5532327902">3232-7902</a><br/>
          E-mail: <a href="mailto:crascampina@gmail.com">crascampina@gmail.com</a><br/>
          (Por trás da Policlínica Amaury Coutinho)
        `;
        break;
      case ['alto santa terezinha', 'água fria', 'bomba do hemetério', 'beberibe', 'dois unidos', 'linha do tiro'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Alto Santa Terezinha</strong><br/>
          Av. Aníbal Benévolo, s/n – Alto Santa Terezinha<br/>
          Fone: <a href="tel:+5581991592890">99159-2890</a> / <a href="tel:+5534497707">3449-7707</a><br/>
          E-mail: <a href="mailto:crasaltosantaterezinha@gmail.com">crasaltosantaterezinha@gmail.com</a><br/>
          (COMPAZ Governador Eduardo Campos)
        `;
        break;
      case ['alto do mandu', 'morro da conceição', 'casa amarela', 'alto josé bonifácio', 'alto josé do pinho', 'mangabeira', 'vasco da gama', 'derby', 'nova descoberta'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Alto do Mandu</strong><br/>
          Av. Dr. Eurico Chaves, nº 379 – Alto do Mandu<br/>
          Fone: <a href="tel:+5588994163384">99416-3384</a> / <a href="tel:+5533553341">3355-3341</a> / <a href="tel:+5530413121">3441-3121</a><br/>
          E-mail: <a href="mailto:crasrpa3@gmail.com">crasrpa3@gmail.com</a><br/>
        `;
        break;
      case ['dois irmãos', 'sitio dos pintos', 'apipucos', 'casa forte', 'graças', 'jaqueira', 'monteiro', 'parnamirim', 'poço', 'santana', 'tamarineira', 'macaxeira', 'brejo da guabiraba', 'córrego do jenipapo', 'guabiraba', 'passarinho', 'pauferro', 'espinheiro', 'aflitos'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Dois Irmãos</strong><br/>
          Av. Professor Cláudio Selva, nº 99C – Dois Irmãos<br/>
          Fone: <a href="tel:+5588994886544">99488-6544</a> / <a href="tel:+5532324110">3232-4110</a><br/>
          E-mail: <a href="mailto:crasdoisirmaos@hotmail.com">crasdoisirmaos@hotmail.com</a><br/>
          (Após a UFRPE, 1ª rua à direita)
        `;
        break;
      case ['iputinga', 'cordeiro', 'várzea'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Cordeiro</strong><br/>
          Rua Odete Monteiro, nº 450 – Cordeiro<br/>
          Fone: <a href="tel:+5588994886735">99488-6735</a> / <a href="tel:+5533556258">3355-6258</a><br/>
          E-mail: <a href="mailto:crascordeiro@gmail.com">crascordeiro@gmail.com</a><br/>
          (Conjunto Habitacional Casarão do Cordeiro)
        `;
        break;
      case ['torrões', 'engenho do meio', 'zumbi', 'cidade universitária'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Torrões</strong><br/>
          Rua Ijuí, nº 46 – Torrões<br/>
          Fone: <a href="tel:+5588994886018">99488-6018</a> / <a href="tel:+5533554803">3355-4803</a> / <a href="tel:+5532327676">3232-7676</a><br/>
          E-mail: <a href="mailto:crastorroes@gmail.com">crastorroes@gmail.com</a><br/>
          (Depois da Ave Minas, 1ª à direita)
        `;
        break;
      case ['madalena', 'torre', 'ilha do retiro', 'caxangá', 'prado', 'várzea'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Rosilda Mendes Souza</strong><br/>
          Av. Caxangá, nº 625 – Madalena<br/>
          Fone: <a href="tel:+5588992548129">99254-8129</a> / <a href="tel:+5533553181">3355-3181</a><br/>
          E-mail: <a href="mailto:crasrosildamendessouza@gmail.com">crasrosildamendessouza@gmail.com</a><br/>
          (Compaz Governador Miguel Arraes)
        `;
        break;
      case ['totó', 'sancho', 'jardim são paulo', 'coqueiral', 'areias', 'caçote', 'barro', 'curado', 'estância', 'tejipió'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Totó</strong><br/>
          Rua Nelson Castro Silva, nº 105 – Jardim São Paulo<br/>
          Fone: <a href="tel:+5588994886351">99488-6351</a> / <a href="tel:+5532577187">3257-7187</a> / <a href="tel:+5532494464">3249-4464</a><br/>
          E-mail: <a href="mailto:cras05pcr@gmail.com">cras05pcr@gmail.com</a><br/>
          (Próximo à Praça de Jardim São Paulo)
        `;
        break;
      case ['bongi', 'mustardinha', 'san martin', 'afogados', 'mangueira', 'jiquiá'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Bongi</strong><br/>
          Av. Gal. San Martin, nº 1083 – Bongi<br/>
          Fone: <a href="tel:+5588993233351">99323-3351</a> / <a href="tel:+5532259446">3225-9446</a><br/>
          E-mail: <a href="mailto:crasbongi@gmail.com">crasbongi@gmail.com</a><br/>
          (COMPAZ Escritor Ariano Suassuna - Cordeiro)
        `;
        break;
      case ['ibura de baixo', 'jordão alto', 'jordão baixo', 'vila dos milagres'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Ibura de Baixo</strong><br/>
          Av. Dois Rios, nº 521 – Ibura de Baixo<br/>
          Fone: <a  href="tel:+5588994886442">99488-6442</a> / <a href="tel:+5533553226">3355-3226</a><br/>
          E-mail: <a href="mailto:cras6ibura@gmail.com">cras6ibura@gmail.com</a><br/>
        `;
        break;
      case ['pina', 'brasília teimosa', 'ipsep', 'imbiribeira', 'boa viagem'].includes(bairro) && localidade === 'recife':
        this.crasInfo = `
          <strong>CRAS Pina</strong><br/>
          Rua Tomé Gibson, nº 455 – Pina<br/>
          Fone: <a  href="tel:+5588994886446">99488-6446</a> / <a href="tel:+5533279851">3327-9851</a> / <a href="tel:+5533053380">3305-3380</a><br/>
          E-mail: <a href="mailto:craspina06@outlook.com">craspina06@outlook.com</a><br/>
          (Rua do Colégio Oswaldo Filho, antigo colégio Brasil)
        `;
        break;
      case ['ibura de cima', 'cohab', 'lagoa encantada', 'novembro', 'três carneiros', 'monte verde'].includes(bairro.toLowerCase()) && localidade.toLowerCase() === 'recife':
        this.crasInfo = `
          <strong>CRAS Ibura de Cima / Cohab</strong><br/>
          Ladeira da Cohab, 10, UR 01 – Ibura<br/>
          Fone: <a href="tel:+5588994886493">99488-6493</a> / <a href="tel:+5534757462">3475-7462</a><br/>
          E-mail: <a href="mailto:crasiburadecima@gmail.com">crasiburadecima@gmail.com</a><br/>
          (COMPAZ Professor Paulo Freire - Ibura de Cima)
        `;
        break;

      default:
        this.crasInfo = 'Não há CRAS próximo definido para esta Localidade.';
        break;
    }

    if (this.crasInfo) {
      const modal = new bootstrap.Modal(document.getElementById('crasModal'));
      modal.show();
    }
    
  }
}
