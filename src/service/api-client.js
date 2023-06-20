import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';


export async function fetchLivros() {
    try {
        const resp = await axios.get(BASE_URL + '/livros');
        const dados = resp.data; 
        return dados;
    } catch (error) {
        tratarErro(error);
    }
}

export async function fetchLeitores() {
    try {
        const resp = await axios.get(BASE_URL + '/leitores');
        const leitores = resp.data;
        return leitores;
    } catch (error) {
        tratarErro(error);
    }


}


function tratarErro(error) {
    // console.log('Erro na chamada da API', error);
    if (!error.response)
        throw new Error(error.message);
    if (error.response.status === 500) {
        throw new Error('Erro no servidor!');
    } else if (error.response.status >= 400 && error.response.status <= 499 
            && error.response.data.erros) {
        const erros = error.response.data.erros; // error.response.data tem o atributo 'erros' colocado pela API
        console.log('erros da api', erros);
        const msg = erros.length <= 1 ? erros : erros.join(' | ');
        throw new Error(msg);  
    } else {
        throw new Error(error.response.data);
    } 
}