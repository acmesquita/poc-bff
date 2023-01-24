## Implementação de um BFF (Back-end for Front-end)

![bff drawio](https://user-images.githubusercontent.com/15862643/214322766-54b2a278-c427-402c-9abb-03b370bf8418.png)

Para entender o padrão e alguns usos dele dentro de um sistema distribuido, foi implementado esse projeto com a seguinte estrutura:

- web: _Concentra as visualizações e chamadas ao BFF_
- bff: _API com endpoins simples para o frontend, contudo que interage com outros sistemas para fornecer as informações_
- server-account: _API de gerenciamento de contas_
- server-cep: _API que disponibiliza endereços a partir de um CEP_

### Comunicação entre os serviços

A aplicação tem como funcionalidades:

- Listagem das contas criadas
- Detalhes de uma conta
- Criação de um conta

Para atender as 3 funcionalidade acima, foi criado um frontend que lista as contas criadas e o caminho da requisição fica:

```
Web                  BFF                             Server Account

GET bff/accounts  --> GET server-account/accounts --> Busca todas as contas e retorna.
```

O detalhes de um conta, segue o caminho parecido, contudo transitando com o id referente:

```
Web                  BFF                                      Server Account

GET bff/accounts/:id  --> GET server-account/accounts/:id --> Busca uma conta com o id e retorna.
```

Já a criação de uma nova conta temos uma visualização mais aprofundada do BFF. No processo de criação de uma conta, temos uma busca, a partir do CEP informado pelo usuário, é feito uma requisição ao BFF para trazer a informação do serviço de CEP, contudo, se o serviço estiver fora ou não souber retornar uma informação válida, é realizado uma retentativa em outro serviço, assim, garantido o funcionamento mesmo se um dos serviços estiver indisponível.

![bff drawio (1)](https://user-images.githubusercontent.com/15862643/214330528-701cdb04-ab50-4fe8-989d-19bfb6889251.png)

Podemos até evoluir a ideia para termos uma base local, um banco em memória por exemplo, com os endereços já pesquisados antes, assim não seria necessário buscar em um serviço externo que pode falhar e assim buscar em outro serviço, atrasando ainda mais a requisição para o frontend.

![bff drawio (2)](https://user-images.githubusercontent.com/15862643/214345057-3247f6d0-cf65-46f5-9668-b995ae35e02d.png)

#### Traydoffs

Apersar de ser uma solução viável e com várias possibilidades de intervenções, por exemplo montar um retorno para o frontend somente com as informações que de fato serão utilizadas, existe um perigo nesse modelo e devem ser discutido antes da sua implementação de fato.

Acredito que o maior ponto de desvantagem dessa abordagem está na manutenção e até evolução dos projetos, segue um cenário:

> Tendo um endpoint em que o BFF filtra as informações que serão enviadas para o front-end. Caso seja nessário adicionar
> mais uma informação no para ser disposta numa tela. Uma informação que é nova até para o back-end, então teriamos que
> fazer quais operaçõe?
>
> - 1ª Operação: Alterar o serializador do backend para enviar essa nova informação
> - 2ª Operação: Receber a nova informação e repassar na chamada para o front-end
> - 3ª Operação: Receber essa nova informação e utiliza-la.
>
> Se tratar de 3 sistemas distintos, com entregas separadas e com times atuando de maneiras isoladas em cada sistema, temos
> então, de maneira coordenada, propor a mudança no backend, entregar a mudança, propor para outro time fazer a mudança no
> bff e só depois o front-end conseguirá realizar de fato a mudança e adicionar a informação para o usuário.

Caso o cenário acima não seja problema nesse modelo e o time entenda que o custo vale pela liberdade da forma de trabalho, acredito que esse seja um exemplo a ser trabalhado para facilitar e garantir as informações necessárias para o usuário ter a melhor experiência com o produto.

Com isso, acredito que seja relevante entendermos o modelo e aplicar com cautela nas aplicações.

### Como testar?

**Instalação das dependências nos projetos**

Para todos os projetos faça:

```
npm install
```

**Subir as aplicações**

Para todos os projetos faça:

```
npm run dev
```

**Acessar a aplicação front-end**

Acesse o link: http://localhost:5173/accounts

_**Obs.:** Para validar as retentativas no serviço de CEP, desligue o serviço e teste o fluxo de criação de nova conta_
