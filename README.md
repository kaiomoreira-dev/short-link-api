<p align="center">
  <a href="https://fastify.dev/" target="blank"><img src="https://media.licdn.com/dms/image/v2/D5612AQEUFADeYMSkBg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1689705931627?e=1735776000&v=beta&t=y2cJsJ-8EOmUhtHvQSOAJ685A7le0DJLKXvmUVBfbZk" width="400" alt="Nestjs Logo" /></a>
</p>

<h1 align="center"> Short Link API </h1>

## Description
* Deverá ser implementado um projeto com NodeJS na última versão estável, sendo construído como API REST. Leve em consideração que o sistema será implementado em uma infraestrutura que escala verticalmente.
  O sistema deve possibilitar o cadastro de usuários e autenticação dos mesmos.
  O sistema deve possibilitar que a partir de um url enviado, ele seja encurtado para no máximo 6 caracteres. Exemplo:
  Entrada: https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/
  Saída: http://localhost/aZbKq7
  Qualquer um pode solicitar que o URL seja encurtado e para encurtar deve existir apenas um endpoint, mas caso seja um usuário autenticado, o sistema deve registrar que o URL pertence ao usuário. 
  Um usuário autenticado pode listar, editar o endereço de destino e excluir URLs encurtadas por ele.
  Todo acesso a qualquer URL encurtado deve ser contabilizado no sistema.
  Quando um usuário listar os urls deve aparecer na listagem a quantidade de cliques.
  Todos os registros devem ter uma forma de saber quando foram atualizados.
  Os registros só poderão ser deletados logicamente do banco, ou seja, deverá ter um campo que guarda a data de exclusão do registro, caso ela esteja nula é porque ele é válido, caso esteja preenchida é porque ele foi excluído e nenhuma operação de leitura ou escrita pode ser realizada por ele.


## Features
* Implementar uma arquitetura de microsserviços: Separar o sistema em serviços independentes permite escalar componentes específicos conforme a necessidade, além de facilitar a manutenção e o desenvolvimento de novas funcionalidades sem afetar o sistema como um todo.

* Adotar uma camada de cache distribuído: Utilizar um cache distribuído para armazenar dados de acesso frequente, como links encurtados mais acessados, alivia a carga no banco de dados e melhora o tempo de resposta para os usuários.

* Incorporar filas para processamento assíncrono de cliques: Usar filas de mensagens para contabilizar cliques de forma assíncrona permite lidar com um volume alto de acessos sem impactar a performance do sistema principal, aumentando a capacidade de processamento.

* Para otimizar o desempenho e reduzir a carga no banco de dados, implementamos uma estratégia de caching que armazena os detalhes dos links em um sistema de cache em memória (como Redis). Ao acessar um link, o aplicativo primeiro verifica se as informações estão disponíveis no cache, melhorando significativamente o tempo de resposta. Caso os dados não estejam no cache, buscamos no banco de dados e os armazenamos para futuras requisições. Após cada atualização de contagem de cliques, o cache é limpo ou atualizado, garantindo que as informações estejam sempre sincronizadas. Essa abordagem não apenas reduz a latência e a carga no banco de dados, mas também facilita a escalabilidade da aplicação.

## Node Version
* '>=v18 <=v22'

# Cloud Provider
* Railway: https://short-link-api.up.railway.app/

## Installation
```bash
$ npm install
```

## Docker

```bash
$ docker compose up -d
```

## Migrations

```bash
# up migrations in database
$ npx prisma migrate dev
```
## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Test

```bash
# test units
$ npm run test
```

