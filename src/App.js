import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cabecalho from './components/Cabecalho';
import Listagem from './pages/Listagem';
import CadastroLeitor from './pages/CadastroLeitor';
import Emprestimo from './pages/Emprestimo';
import Relatorio from './pages/Relatorio';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Cabecalho />
        <Routes>
          <Route path="/" element = { <Listagem /> } />   
          <Route path="cadastro-leitor" element = { <CadastroLeitor /> } />
          <Route path="emprestimo" element = { <Emprestimo /> } />
          <Route path="relatorio" element = { <Relatorio /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
