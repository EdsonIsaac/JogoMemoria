# Jogo da Memória

Este projeto foi construido utilizando Java 17 + Spring Boot 3.1.3 no backend e TypeScript + Angular 16

## Instalação do backend no Docker

Utilize o Maven para fazer o build do backend

Crie a imagem do projeto

<pre><code>docker build -t jogomemoria-backend .</code></pre>

Crie a rede do projeto

<pre><code>docker network create jogomemoria</code></pre>

Execute a imagem do projeto

<pre><code>docker run -p 8080:8080 --name jogomemoria-backend --network jogomemoria -d jogomemoria-backend</code></pre>

## Instalação do frontend no Docker

Crie a imagem do projeto

<pre><code>docker build -t jogomemoria-frontend .</code></pre>

Execute a imagem do projeto

<pre><code>docker run -p 80:80 --name jogomemoria-frontend --network jogomemoria -d jogomemoria-frontend</code></pre>