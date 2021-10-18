const express = require('express');
const bd = require('./bd/bd');
const cors = require('cors');
const bodyparser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(cors());

/* 
   Insira o numero da porta para poder rodar o back end
   por padrão deixei o numero 3001
*/
const porta = 3001;

const salvar = (date) => {
    // logica de salvar
    bd.knex
        .insert(date)
    .into('table_temperatura')
        .then( () => {
            console.log("Inserido com sucesso")
        }).catch( (error) => {
            console.log("Falha ao inserir dado")
        } );

}

app.get('/Buscar/:cidade', async (req, res) => {
        
        /* 
           Insira a chave de acesso da api openweathermap 
           na variavel 'apiKey'
        */
        let apiKey = ""; // CHAVE DA KEY do site 'openweathermap'
       
        try{
            const { data } = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.cidade}&lang=pt_br&appid=${apiKey}&units=metric`)
            
            let cidade = data.name;
            let pais = data.sys.country;
            let temperatura = data.main.temp;
            let umidade = data.main.humidity;
            let clima = data.weather[0].description ;

            json = { cidade , pais , temperatura , umidade , clima }
            
            salvar(json); 

            return res.json(json)
        }catch(error){
            console.log("Falha Cidade não localizada");
            
            json = {
                mensagem: "Cidade não localizada"
            } 
    
            return res.json(json); 
        }    
});

app.get('/Ranking', async (req, res) => {

    try{

        let retornoQueryCidade =  bd.knex
        .select(bd.knex.raw('cidade, count(*) as qtd '))
        .into('table_temperatura')
        .groupBy('cidade').orderBy('qtd', 'desc').limit(5);

        var valorCidade = await retornoQueryCidade;
       
        return res.json(valorCidade)
   
    }catch(error){
        console.log("Falha na consulta do historico dos ultimos registro");
        json = {
            id: -2,
            mensagem: "Falha na consulta do historico dos ultimos registro"
        } 

        return res.json(json);
    }
    
});    

app.get('/Historico', async (req, res) => {

    try{

        let retornoQueryUltimos =  bd.knex
                                        .select(
                                            bd.knex.raw("cidade, pais, temperatura, umidade, clima, TO_CHAR(created_at, 'yyyy-mm-dd hh24:mi:ss')"))
                                        .into('table_temperatura')
                                        .orderBy('id', 'desc')
                                        .limit(5);

        valorUltimo = await retornoQueryUltimos;

        return res.json(valorUltimo);
    }catch(error){
        console.log("Falha na consulta do historico do Ranking");
   
        json = {
            id: -3,
            mensagem: "Falha na consulta do historico do Ranking"
        } 

        return res.json(json); 

    }    
    

});

app.listen(porta, () => {
    console.log(`Servidor Conectado a porta ${porta}.`)
})
