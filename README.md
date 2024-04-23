# Bot de Moderação Simples com Translante

Este é um bot de moderação simples desenvolvido em TypeScript e Node.js 21, utilizando a biblioteca Discord.js 14. Ele foi projetado para oferecer recursos de moderação e interação em servidores do Discord, incluindo funcionalidades como conselhos em português, banimento, expulsão, timeout, limpeza de mensagens, votação, lista de banidos, adição, remoção e listagem de emojis do servidor, além de configurações personalizadas.

## Funcionalidades Principais

- **Translante:** Capacidade de traduzir mensagens diretamente no chat.
- **Conselhos em Português:** Oferece conselhos aleatórios em português para os membros do servidor.
- **Ban/Kick/Timeout/Clear:** Capacidade de banir, expulsar, aplicar timeout e limpar mensagens no servidor.
- **Voting:** Funcionalidade para realizar votações entre os membros.
- **Lista de Ban:** Permite visualizar a lista de usuários banidos no servidor.
- **Cotação:** Permite saber a cotação de moeda
- **Emoji:** Adicionar, remover e listar emojis do servidor.
- **Configurações Personalizadas:** Possibilidade de personalizar o status do bot, palavras bloqueadas, lista de banidos, adicionar e remover banimentos, entre outras configurações.

## Comandos Disponíveis

O bot oferece uma variedade de comandos para realizar as ações mencionadas acima, além de muitos outros recursos úteis para a moderação e interação no servidor.

## Tecnologias Utilizadas

O bot foi desenvolvido utilizando TypeScript e Node.js 21, e faz uso da biblioteca Discord.js 14 para interagir com a API do Discord.

Este bot de moderação simples foi criado com o intuito de desenvolver minhas habilidades de javascript e gosto muito de bot do discord.

## Como rodar?

1 - Instale o Nodejs no seu computador

> ⚠️ Node version required: 21.5 or higher

2 - Clone esse repositorio no seu editor de codigo, exemplo: vscode

3 - Instale as dependencias, `npm i`

4 - Crie uma pasta `.env`

```
BOT_TOKEN=token do seu bot
# WEBHOOK_LOGS_URL=
NODE_OPTIONS="--no-warnings --no-deprecation"
```

## Scripts

- `dev`: Rodar o bot em desenvolvimento.
- `build`: Compilando o seu Projeto.
- `start`: Rodando o seu projeto em produção/compilado.
