# Biblioteca CRUD Backend
Backend de um software de biblioteca.

Feito como desafio para o processo seletivo da Teppa.

A aplicação está hospedada no [Heroku](https://biblioteca-crud-teppa.herokuapp.com/).

O gerenciador de pacotes utilizado foi o Yarn. Sendo assim, as instruções utilizam o yarn, mas todos os comandos podem ser rodados com npm.
# Menu

* [Rodando a aplicação](#ancora1).
* [Rodando os testes](#ancora2).
* [Build da aplicação](#ancora3).
* [Características](#ancora4).

<br>
<hr>
<br><br>


<a id="ancora1"></a>

# Rodando a aplicação
## Gerando a pasta node_modules
* Execute o comando:
```
yarn
```
## Ambiente
Para rodar a aplicação é preciso configurar as variaveis de ambiente.

* Primeiro copie o arquivo .env.example para um arquivo .env

```
cp .env.example .env
```

  ## Preencha as variaveis com os dados do projeto firebase.

  ### Variaveis da aplicação:
  * **PORT**: Porta em que o servidor vai escutar
  * **NODE_ENV**: Qual é o ambiente em que a aplicação está rodando. (test | dev | production)
   > Se for estabelecido o ambiente como [teste](#ancora2), não será necessário configurar as variaveis do firebase. Porque em modo de teste a aplciação usa o Firestore como um container Docker.

  * **JWT_SECRET**: String que serve como secredo para codificar e decodificar os Tokens de sessão.

  <br>

  ###  Dados do firebase:

  Como a aplicação foi hospedada no heroku, foi mais interessante passar esses dados manualmente do que ler o arquivo .JSON.

  O motivo é não publicar no Github o arquivo .JSON
  Basta copiar as informações do arquivo JSON para as variaveis

  * **FIRESTORE_CLIENT_EMAIL**: Propriedade client_email do arquivo JSON.
  * **FIRESTORE_PRIVATE_KEY**={"privateKey": ""}: Insira a chave privada entre as aspas vazias.

  > Foi necessário passar a chave como JSON por causa do jeito que o heroku lida com as variaveis de ambiente. Basicamente ele adiciona aspas("") e isso quebrava a aplicação.
  * **FIRESTORE_PROJECT_ID**:Propriedade project_id do arquivo JSON.

## Rodando a aplicação em modo de desenvolvimento
* Execute o comando:
```
yarn dev
```
### Resultado esperado:
```
Listening at port: http://localhost:3000
Env: dev
```
> A rota padrão(/) leva para a documentação do swagger.

<br>
<hr>
<br><br>

<a id="ancora2"></a>

# Rodando os testes da aplicação
Por motivos de performance,  a aplicação utiliza uma imagem docker do firestore para rodar os testes.

* Para iniciar o container execute o comando:
```
docker-compose up -d
```

* Depois que o container estiver rodando basta executar:
```
yarn test
```
### Resultado esperado:

```
❯ yarn test
yarn run v1.22.19
$ NODE_ENV=test jest --detectOpenHandles
 PASS  src/modules/accounts/use-cases/users/create-user/__tests__/CreateUser.controller.spec.ts (14.466 s)
 PASS  src/modules/accounts/use-cases/users/create-user/__tests__/CreateUser.service.spec.ts
 PASS  src/modules/books/use-cases/book-creation/__tests__/BookCreation.controller.spec.ts
 PASS  src/modules/accounts/use-cases/sessions/create-session/__tests__/SessionCreation.controller.spec.ts
 PASS  src/modules/books/use-cases/book-deletion/__tests__/BookDeletion.controller.spec.ts
 PASS  src/modules/books/use-cases/book-list/__tests__/bookListing.controller.spec.ts
 PASS  src/modules/books/use-cases/book-creation/__tests__/BookCreation.service.spec.ts
 PASS  src/modules/accounts/use-cases/sessions/create-session/__tests__/SessionCreation.service.spec.ts
 PASS  src/modules/books/use-cases/book-list/__tests__/bookListing.service.spec.ts
 PASS  src/modules/books/use-cases/book-deletion/__tests__/BookDeletion.service.spec.ts

=============================== Coverage summary ===============================
Statements   : 100% ( 114/114 )
Branches     : 100% ( 7/7 )
Functions    : 100% ( 15/15 )
Lines        : 100% ( 108/108 )
================================================================================

Test Suites: 10 passed, 10 total
Tests:       94 passed, 94 total
Snapshots:   0 total
Time:        26.994 s
Ran all test suites.
Done in 29.39s.
```
## Relatório dos testes:
Ao rodar os testes, o jest gera automáticamente um relatório na pasta coverage. Para ler o relatório completo basta abrir o arquivo index.html que fica em
**coverage/lcov-report**
```
firefox ./coverage/lcov-report/index.html
```

<br>
<hr>
<br><br>

<a id="ancora3"></a>

# Build da aplicação para produção
A aplicação usa o babel para gerar o código javascript.
* Execute o comando:
```
yarn build
```
O comando vai gerar uma pasta chamada **dist**
* Para rodar o código gerado execute:
```
yarn start
```
<br>
<hr>
<br><br>

<a id="ancora4"></a>

# Caracteristicas da aplicação
* É um servidor express desenvolvido com typescript.

* Todas as rotas são documentadas com swagger.

* Foram configuradas algumas regras de padronização de código com o eslint. Em vez de usar um padrão como o do Airbnb, as regras foram configuradas manualmente para demonstrar o entendimento sobre como funciona o eslint.

* O código Typescript é transpilado para Javascript usando Babel.

* Os commits são padronizados com Husky, Commitlint e Commitizen.

* Os arquivos são verificados com o eslint utilizando o Lint Staged.

* A aplicação usa uma arquitetura de repositórios, providers e casos de uso (use cases) onde os controllers lidam com somente uma chamada http e chamam somente um serviço. Diferente de outros padrões onde o controller conhece todos os métodos. (GET, POST, UPDATE, DELETE)

* Os serviços usam Tsyringe para injetar as dependencias, deixando o código desacoplado.

* Os repositórios utilizam interfaces para serem injetados nos serviços.

* Todos os providers possuem interfaces para serem injetados nos serviços.

* Em módulos onde não era possivel injetar as dependências com o tsyinge, como testes e middlewares, foi criada uma fábrica que implementa interfaces e entrega uma implementação da dependência necessária.

* A princípio é para que tanto o servidor, quanto os testes estarem desacoplados do banco de dados e dos providers. Embora algum tipo de acoplamento possa ter passado despercebido.

* Os testes foram implementados de um jeito que eles conhecem o mínimo possível do código real. Os testes unitários utilizam mocks dos repositórios e os testes de integração usam interfaces do banco de dados para criar instancias necessárias no banco.
  > Ex: Testes de rotas que precisam de autenticação precisam de um usuário criado no banco de dados.

* Os testes usam interfaces das entidades para que se um dia forem adicionadas ou removidas propriedades da entidade, não seja necessário modificar todos os testes, só os que tem relação com tal propriedade.
