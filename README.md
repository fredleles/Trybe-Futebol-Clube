# Trybe Futebol Clube

Projeto de backend desenvolvido durante o curso da Trybe para alimentar uma aplicação de gerenciamento da tabela de classificação de um campeonato de futebol. Consiste numa API restful com CRUD no MySql, integrados via Docker compose, e desenvolvida sob as diretivas de SOLID.

## Stacks utilizadas até o momento

- NodeJs
- Typescript
- Express
- Sequelize
- Mocha - Chai - Sinon
- Docker
- SQL (MySql)
- JWT


## Próximos passos

- Criar a rota para cadastro de usuários
- Criar a rota para gerenciamento dos times participantes.
- Atingir 100% de cobertura nos testes.


## Orientações

  - Clone o repositório e entre na pasta do projeto

  - Execute o script de desenvolvimento:
  ```sh
    npm run compose:up:dev
  ```

  - Entre no bash do container:
  ```sh
    docker exec -it app_backend sh
  ```

  - Instale as dependências, caso existam:
  ```sh
    npm install
  ```
  

 ## Scripts

  - Executa o Docker Compose em modo dev (nodemon integrado):
  ```sh
    npm run compose:up:dev
  ```

  - Limpa os containers:
  ```sh
    npm run compose:down:dev
  ```


# Principais rotas

## Login

<details close>
  <summary><strong>[POST] /login</strong></summary>

  - Efetua o login e recebe o token do usuário.
      - Dados devem estar no corpo da requisição, no formato Json:

    ```json
      {
        "email": "user@user.com",
        "password": "secret_user"
      }
    ```
</details>

## Times

<details close>
  <summary><strong>[GET] /teams</strong></summary>

  - Listar os times cadastrados
</details>

## Partidas

<details close>
  <summary><strong>[GET] /matches</strong></summary>

  - Listar as partidas cadastradas
</details>

<details close>
  <summary><strong>[POST] /matches</strong></summary>

  - Criar uma nova partida
    - Dados devem estar no corpo da requisição, no formato Json:

    ```json
      {
        "homeTeam": 16, // O valor deve ser o id do time
        "awayTeam": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
      }
    ```
</details>

<details close>
  <summary><strong>[PATCH] /matches/:id</strong></summary>

  - Atualizar uma partida pelo seu id
  - Dados devem estar no corpo da requisição, no formato Json:

    ```json
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      }
    ```
</details>

<details close>
  <summary><strong>[PATCH] /matches/:id/finish</strong></summary>

  - Finaliza uma partida a partir de seu id.
</details>

## Tabela de classificação

<details close>
  <summary><strong>[GET] /leaderboard</strong></summary>

  - Listar a classificação dos times. Os critérios são baseados nos pontos, número de vitórias, saldo de gols e gols a favor.
</details>


