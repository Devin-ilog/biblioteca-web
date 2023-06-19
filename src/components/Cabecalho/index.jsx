import { Link } from 'react-router-dom';
import './styles.css';

export default function Cabecalho() {
  return (
    <header>
        <div className="nome-app">Biblioteca Gato & Sapato</div>
        <nav>
            <ul>
                <li><Link to='/'>Listagem</Link></li>
                <li><Link to='cadastro-leitor'>Cadastro Leitor</Link></li>
                <li><Link to='emprestimo'>Empréstimo</Link></li>
                <li><Link to='relatorio'>Relatório</Link></li>
            </ul>
        </nav>
    </header>
  )
}