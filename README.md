# Projeto-Labebook-3

##### O Projeto Labook foi realizado na stack back-end; O projeto  é uma rede social que busca promover a interação entre seus usuários, onde eles poderão criar e curtir as postagens.

### API para aplicação de gestão de projetos.

_Aplicação banck-end de servidor express com banco de dados SQL SQlite 3.

### Stack utilizada: Back-end:

###### NodeJS

###### Typescript

###### Express

###### SQL e SQLite

###### Knex

###### POO

###### Arquitetura em camadas

###### Geração de UUID

###### Geração de hashes

###### Autenticação e autorização

###### Roteamento

###### Postman

# Requisitos:

## Endpoints: 

- signup
- login
- get posts
- create post
- edit post
- delete post 
- Like / dislike post
 	
## Autenticação e Autorização 
- identificação UUID 
-  senhas hasheadas com Bcrypt
-  tokens JWT 

## Código:
-  Arquitetura em camadas
-  POO 
-  Roteadores no Express


# Exemplos de requisição

- Signup Endpoint público utilizado para cadastro. Devolve um token jwt.

- Login Endpoint público utilizado para login. Devolve um token jwt.

- Get posts Endpoint protegido, requer um token jwt para acessá-lo.

- Create post Endpoint protegido, requer um token jwt para acessá-lo.

- Edit post Endpoint protegido, requer um token jwt para acessá-lo. Só quem criou o post pode editá-lo e somente o conteúdo pode ser editado.

- Delete post Endpoint protegido, requer um token jwt para acessá-lo. Só quem criou o post pode deletá-lo. Admins podem deletar o post de qualquer pessoa.

- Like or Dislike post (mesmo endpoint faz as duas coisas) Endpoint protegido, requer um token jwt para acessá-lo. Quem criou o post não pode dar like ou dislike no mesmo. Caso dê um like em um post que já tenha dado like, o like é desfeito. Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito. Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike. Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.

- Para entender a tabela likes_dislikes no SQLite, lógicas booleanas devem ser controladas via 0 e 1 (INTEGER) quando like valer 1 na tabela é porque a pessoa deu like no post na requisição like é true quando like valor 0 na tabela é porque a pessoa deu dislike no post na requisição like é false caso não exista um registro na tabela de relação, é porque a pessoa não deu like nem dislike caso dê like em um post que já tenha dado like, o like é removido (deleta o item da tabela) caso dê dislike em um post que já tenha dado dislike, o dislike é removido (deleta o item da tabela)

# Link da documentação:
https://documenter.getpostman.com/view/24460722/2s93RMWGDT

# Como rodar este projeto?

- Terminal bash

- Clone este repositório git clone ...link do repo AQUI

- Acesse a pasta do projeto no seu terminal, ex: cd projeto-labook

## Instale as dependências:

- npm install: Instala todas as dependências listadas no package.json;

- npm i cors: biblioteca para liberar acesso externo ao servido;

- npm i express: framework para criar o servidor (API);

- npm i knex: biblioteca query builder para conectar com banco de dados

- npm i sqlite3: biblioteca do banco de dados SQLite

- npm install uuid: tipagens, dependência de produção

- npm install -D @types/uuid:* dependência de desenvolvimento

- npm install dotenv: dependência de produção

- npm install jsonwebtoken: dependência de produção, para facilitar a gestão de tokens

- npm install -D @types/jsonwebtoken: tipagens, dependência de desenvolvimento

- npm i --save-dev @types/bcryptjs: dependência de desenvolvimento

## Execute a aplicação

- rodar o script de dev (npm run dev) ou rodar ou buildar o (npm run start).

- Servidor rodando na porta 3003.

