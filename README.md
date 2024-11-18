# Tradutor Azure API

## Descrição

Este projeto é uma API de tradução que utiliza o serviço Microsoft Azure Translator para traduzir textos entre diferentes idiomas. A API é construída com Node.js e Express, e utiliza MariaDB para armazenamento de dados e Redis para cache.

## Estrutura do Projeto

``` estructure
.env
.gitignore
config.js
index.js
package.json
README.md
src/
    controllers/
        tradutorController.js
    models/
        db.js
        redisClient.js
        tradutor.js
    routes/
        tradutorRoutes.js
    views/
```

### Arquitetura

- **Controllers**: Contém a lógica de controle da aplicação. Exemplo: `tradutorController.js` que gerencia a tradução de textos.
- **Models**: Contém a definição dos modelos de dados e a configuração do banco de dados. Exemplo: `db.js`, `redisClient.js`, `tradutor.js`.
- **Routes**: Define as rotas da API. Exemplo: `tradutorRoutes.js`.
- **Views**: (Pasta reservada para futuras implementações de visualizações, se necessário).

### APIs Consumidas

- **Microsoft Azure Translator**: Utilizado para traduzir textos. A configuração da API está no arquivo `.env`.

### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs.
- **Axios**: Cliente HTTP para fazer requisições à API do Azure.
- **MariaDB**: Banco de dados relacional.
- **Redis**: Banco de dados em memória utilizado para cache.
- **Sequelize**: ORM para MariaDB.
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.

## Como Reproduzir em um Ambiente Local

### Pré-requisitos

- Node.js instalado
- MariaDB instalado e configurado
- Redis instalado e configurado

### Passo a Passo

1. Clone o repositório:

    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd translator_api
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

3. Configure o arquivo `.env` com suas credenciais:

    ```env
    AZURE_KEY=SuaChaveAzure
    AZURE_ENDPOINT=https://api.cognitive.microsofttranslator.com/
    AZURE_LOCATION=SuaRegiaoAzure
    DB_NAME=Tradutor
    DB_USER={seu usuário}
    DB_PASS={senha}
    DB_HOST=localhost
    DB_PORT={porta}
    REDIS_SENHA=SuaSenhaRedis
    REDIS_HOST=SeuHostRedis
    REDIS_PORTA=SuaPortaRedis
    ```

4. Inicie o servidor:

    ```sh
    npm start
    ```

5. Acesse o servidor em `http://localhost:3000`.

## Funcionalidades

- **Tradução de Textos**: Traduz textos entre diferentes idiomas utilizando a API do Azure.
- **Armazenamento de Traduções**: Salva as traduções no banco de dados MariaDB.
- **Cache de Traduções**: Utiliza Redis para cachear traduções e melhorar a performance.

## Objetivos

- Demonstrar a integração com a API do Microsoft Azure Translator.
- Implementar uma API RESTful com Node.js e Express.
- Utilizar MariaDB para armazenamento persistente de dados.
- Utilizar Redis para cache de dados e melhorar a performance da aplicação.

## Contato

Para mais informações, entre em contato com [halfporto@gmailcom].
