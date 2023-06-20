import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cabecalho from './components/Cabecalho';
import Listagem from './pages/Listagem';
import CadastroLeitor from './pages/CadastroLeitor';
import Emprestimo from './pages/Emprestimo';
import Relatorio from './pages/Relatorio';
import { fetchLivros } from './service/api-client';
import './App.css';


function App() {
  
  const [livros, setLivros] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
   fetchLivros()
    .then(dados => setLivros(dados))
    .catch(error => setMensagem( { texto: error.message, tipo: 'erro' } ));
  }, [])
  
  if ((!livros || livros.length === 0) && !mensagem) 
    return (<h1>Carregando dados...</h1>);
    
  return (
    <BrowserRouter>
      <div className="App">
        <Cabecalho />
        {
          mensagem && <h3 className={mensagem.tipo === 'erro' ? 'error-message' : 'info-message'}>{mensagem.texto}</h3>
        }
        <Routes>
          <Route path="/" element = { <Listagem livros={livros} /> } />   
          <Route path="cadastro-leitor" element = { <CadastroLeitor /> } />
          <Route path="emprestimo" element = { <Emprestimo /> } />
          <Route path="relatorio" element = { <Relatorio /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
