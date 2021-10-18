import axios from "axios";

/* 
   Insira o numero da porta em que o backend esta funcionando
   para o consumer poder consumi-lo.
   Por Padrão deixei a porta 3001
*/
let porta = 3001

const api = axios.create({
    baseURL: `http://localhost:${porta}`,
}); 

export default api;