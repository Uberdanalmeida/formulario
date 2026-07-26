# 🔐 Formulário de Login e Cadastro

Aplicação web de autenticação com interface moderna, responsiva e funcional, desenvolvida com HTML, CSS e JavaScript puro.

## 📌 Sobre o projeto

Este projeto simula um fluxo completo de acesso do usuário com telas de login, cadastro, recuperação de senha e uma área de boas-vindas após autenticação. Os dados dos usuários são armazenados localmente no navegador por meio do localStorage, o que permite testar o cadastro e o login sem necessidade de backend.

## ✨ Funcionalidades

- Alternância entre as telas de Entrar, Cadastrar e Recuperar senha
- Validação de campos obrigatórios antes do envio
- Cadastro com nome, data de nascimento, telefone, sexo, e-mail e senha
- Verificação de e-mail duplicado para evitar cadastros repetidos
- Login com autenticação local usando os dados salvos no navegador
- Exibição de uma tela de boas-vindas com informações do usuário logado
- Botão para mostrar ou ocultar a senha
- Layout responsivo para telas menores e maiores

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- localStorage

## 📁 Estrutura do projeto

- index.html: estrutura da interface e dos formulários
- style.css: estilos, responsividade e aparência visual
- script.js: lógica de validação, navegação entre telas e persistência de dados

## ℹ️ Observações

- Os dados ficam salvos apenas no navegador do usuário.
- A recuperação de senha é uma simulação visual e não envia e-mails reais.
