# Backend para Plataforma de Correção de Tarefas de Programação

## Sobre

Este repositório contém o backend de uma plataforma inovadora projetada para revolucionar o processo de correção de tarefas de programação. Ao substituir métodos manuais e demorados por um sistema de avaliação automática, esta plataforma permite que professores economizem tempo valioso, focando mais na preparação de aulas e no suporte aos alunos. Além disso, beneficia os alunos ao oferecer correções rápidas e precisas, acelerando o processo de aprendizado e permitindo o desenvolvimento de habilidades de programação de forma mais eficaz e autônoma.

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e bibliotecas:

- Node.js
- Express.js: Framework para aplicação do servidor
- Mongoose: ORM para MongoDB
- bcryptjs: Biblioteca para hash de senhas
- cors: Middleware para habilitar CORS
- dotenv: Módulo para carregar variáveis de ambiente
- fs-extra: Melhoria do módulo fs, para manipulação de arquivos
- jsonwebtoken: Implementação de tokens JWT para autenticação
- multer: Middleware para manipulação de `multipart/form-data`, para upload de arquivos

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento especificadas no arquivo: .env.example

1. Clone este repositório:

2. Instale as dependências:
```
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente:


## Execução

Para iniciar o servidor, execute o seguinte comando:

```
npm start
```

## Recursos

O backend fornece várias API endpoints para autenticação de usuários, gestão de tarefas, e correção automática de código. Isso inclui:

- Autenticação de usuários (login/signup)
- Upload de tarefas de programação
- Avaliação automática de código
- Feedback e notas para os alunos
- Monitoramento do progresso dos alunos

