# Cypress Sesc Goiás - Automação E2E

Projeto de automação de testes E2E utilizando Cypress para validar
o fluxo de consulta de hospedagem do Sesc Caldas Novas.

## Tecnologias

- Cypress 16
- JavaScript
- Node.js
- Page Object Model
- Mochawesome
- Nodemailer
- Gmail SMTP
- Windows Task Scheduler

## Fluxo automatizado

1. Acessar o site do Sesc Caldas Novas
2. Acessar a opção Reserva
3. Acessar o Portal de Turismo Sesc GO
4. Selecionar 2 adultos
5. Validar categoria Trabalhador do Comércio
6. Informar período da hospedagem
7. Selecionar Pensão Completa
8. Realizar a busca
9. Validar o resultado apresentado

## Estrutura

cypress/
├── e2e/
├── pages/
└── scripts/

## Instalação

npm install

## Execução

npx cypress open

ou

npx cypress run

## Relatórios

Os testes utilizam Mochawesome para geração dos relatórios
O relatório também pode ser enviado automaticamente por e-mail.

## Configuração do e-mail

Criar um arquivo `.env` na raiz do projeto:

GMAIL_USER=seuemail@gmail.com
GMAIL_APP_PASSWORD=sua_senha
EMAIL_DESTINO=email1@gmail.com,email2@gmail.com

O arquivo `.env` não deve ser versionado.

## Execução automatizada

O projeto possui um script `.bat` que permite executar a automação
através do Windows Task Scheduler.

Fluxo:

Cypress
↓
Mochawesome
↓
Resultado do teste
↓
Envio do relatório por e-mail