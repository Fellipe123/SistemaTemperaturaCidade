# Sistema Web para verificar a Temperatura da sua Cidade

## Sobre o Projeto

Este Projeto consiste em verificar a temperatura da cidade, sendo divido por dois paineis. O Painel do lado esquerdo
contêm o campo de texto, um botão para pesquisa e uma tabela, onde será retornado a informação referente a cidade 
selecionada. No Painel do lado Direito, contêm duas tabelas, uma embaixo da outra. Na Tabela de cima vai ser mostrado um
Top 5 das cidades mais pesquisadas e embaixo será exibido um historico das ultimas cidades pesquisadas.

# Layout da Pagina

![img](https://github.com/Fellipe123/SistemaTemperaturaCidade/blob/main/temperatura/assets/imgLayoutFrontEnd.PNG)


## Tecnologias ultilizadas

### Back End

  - Node.js 
  - Axion 
  - Cors 
  - Knex 
  - Nodemon 
  - Pg    
  - express 

## Front End

  - HTML/CSS/JS
  - React.js
  - Axios 
  
## Banco de Dados 

  - PostgreSQL

# Como Executar o Projeto

## Rodando o Back End 

   * Primeiramente, faça um Clone do repositorio do github sendo https://github.com/Fellipe123/SistemaTemperaturaCidade.git
    
   * Execute o Terminal/Cmd
   
   * Navegue até a pasta 'backend' do projeto, localizada em 'temperatura\src\backend'
   
   * Execute o camando $ yarn install para instalar todas as dependencias do projeto 
   
   * Abra o arquivo 'knexfile.js' e insere as informações de acesso ao banco de dados como database, user e password
   
   * Execute o camando $ npx  knex migrate:latest  para poder criar as tabelas do banco de dados
   
   * Na pasta 'backend', abra o arquivo index.js e atribui o valor da Chave a variavel apiKey para a conexão com api do 
   openweathermap. 
   
   * Execute o comando $ yarn start para iniciar o servidor
   
   
## Rodando o Front End 

   * Execute o Terminal/Cmd

   * Navegue até a pasta 'temperatura' do projeto 
   
   * Execute o camando $ yarn install para instalar todas as dependencias do projeto 
   
   * Execute $ yarn start para executar a aplicação
   
   
   
   

   

