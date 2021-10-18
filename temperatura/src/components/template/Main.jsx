import React , { useState } from "react";
import "./Main.css";
import { BsSearch } from 'react-icons/bs';
import api  from "../../service/api";

export function Main(){

    // State -> responsavel pela manipulação do valor do campo da cidade  
    const [ nomeCidade , setNomeCidade ] = useState("");
    const [ ranking , setRanking ] = useState({});
    const [ historico , setHistorico ] = useState([]); 
    
    // State -> responsavel pela manipulação dos dados vindo da api e organização da tabela dinamicaa 
    const [ jsonApi , setJsonApi ] = useState({ 
        cidade:"", 
        pais:"", 
        temperatura:"", 
        umidade:"", 
        clima:"" 
    }); 

    async function buscandoCidade(cidade , jsonApi){
        
        const { data } = await api(`/Buscar/${cidade}`);
      
        setJsonApi(data);
        buscandoRanking()
        buscandoHistorico();

    }

    async function buscandoRanking(){
        
        const { data } = await api(`/Ranking`);

        if(data.id){
             console.log(data.mensagem);
             criaElementoTableFilho("table-ranking" , "td" , "colSpan" , "3" , data.mensagem);
             throw data.mensagem;
        }

        setRanking(data);
    }

    /*
      identificador      ->  nome do id do elemento html da table
      elemento           ->  o elemento html que vai ser criado, exemplo tr ou td
      atrrElemento       ->  atributo do elemento do html, exemplo value, colSpan entre outros
      atrrValorElemento  ->  valor do atributo do html
      mensagem           ->  mensagem que vai ser exibido para o usuario  
    */
    function criaElementoTableFilho(identificador, elemento , atrrElemento , atrrValorElemento ,  mensagem){
 
        let tableIdRanking = document.getElementById(identificador);
        let tableIdRankingChildren = document.createElement(elemento);
        tableIdRankingChildren.setAttribute(atrrElemento , atrrValorElemento);
        tableIdRankingChildren.innerText = mensagem;
        tableIdRanking.appendChild(tableIdRankingChildren);

    }

    async function buscandoHistorico(){
        
        const { data } = await api(`/Historico`);

        if(data.id){
            console.log(data.mensagem);
            criaElementoTableFilho("table-historico" , "td" , "colSpan" , "6" , data.mensagem);
            throw data.mensagem;
        }

        setHistorico(data) 
        
       
    }
    
    function GerandoColunasTabela(value){
        
        
        const conteudo = Object.values(value['value']);

        return (
            <tr>
                {
                    conteudo.map( ( item , index )  => <td key={index}> { item } </td> ) 
                }    
                
            </tr>
        );
       

    }

    function GerandoMuitasColunasTabela(value){
        
        
        var conteudo = Object.values(value['value']);
        
        let valorRetorno = []

        conteudo.forEach((valor) => {

              var valorObjeto = Object.values(valor) ;
              
              valorRetorno.push(<tr> {valorObjeto.map( (item , index) => <td key={index}>{item}</td>)}</tr>) 
             
        } );

        return valorRetorno

    }
    
    function GerandoListaOrdenada(value){
        
        
        var conteudo = Object.values(value['value']);
        
        let valorRetorno = [];
        let posicao = 1; 

        conteudo.forEach((valor) => {

              var valorObjeto = Object.values(valor) ;
              valorRetorno.push(<tr><td>{posicao}</td>{valorObjeto.map((item,index)=><td key={index}>{item}</td>)}</tr>)
              posicao ++;              
        });

        return valorRetorno

    }

    function GerandoLinhasTabela(value){
        
        const conteudo = Object.keys(value['value']);

        return (
            <tr>
                {
                    conteudo.map( ( item , index )  => <th key={index}> { item } </th> ) 
                }    
                
            </tr>
        );

    }

    return (
        <aside id="main">
            
         <div id="panel">
            <div className="painel-left">
                 
                <h4> 
                    <center>
                         <i>Verifica a Temperatura da sua Cidade Favorita!</i>  
                        
                    </center>       
                </h4>
                
               <input type="text" className="form-control" id="btn-texto" 
                      maxLength="20" 
                      placeholder="Preencha sua cidade" 
                      value={nomeCidade}
                      onChange={ 
                          (e) => { 
                            setNomeCidade(e.target.value); 
                        }
                       }
                />
               
               <button type="button" 
                       className="btn btn-primary"
                       onClick={ () => buscandoCidade(nomeCidade , jsonApi) }
               > <BsSearch /></button>
                
               <br /><br />

               <table id="table-temp" border="1">
                    <thead>
                        
                        <GerandoLinhasTabela value={jsonApi} />
                        
                    </thead>
                    <tbody>
                       <GerandoColunasTabela value={jsonApi} />

                    </tbody>
                </table>                

                <br /><br />

            </div>

            <div className="painel-right">

            <br /> 
            <table id="table-ranking">
                    <thead>
                        <tr>
                            <th colSpan="3">  Ranking de Cidades mais pesquisadas </th>
                        </tr>
                        <tr>
                            <th> Posição </th>
                            <th> Cidade</th>
                            <th>  Quantidade de Pesquisas  </th>
                        </tr>
                    </thead>
                    <tbody>
                             <GerandoListaOrdenada value={ranking} />
                    </tbody>
                </table>  

                <br /> <br />
                
                <table id="table-historico">
                    <thead>
                        <tr>
                        <th colSpan="6">  HISTORICO DE PESQUISAS </th>
                        </tr>
                        <tr>
                            <th> cidade </th>
                            <th> pais </th>
                            <th> temperatura </th>
                            <th> umidade </th>
                            <th> clima </th>
                            <th> Data e Hora </th>
                        </tr>
                    </thead>
                    <tbody>

                    <GerandoMuitasColunasTabela value={historico} />                         

                    </tbody>
                </table>

            </div>

         </div>
        
        </aside>
    );
}
