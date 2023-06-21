import { useRef, useState } from 'react';
import { createEmprestimo } from '../../service/api-client';
import './styles.css';

export default function Emprestimo({ livros, leitores, fcAtualizar }) {

  const [mensagem, setMensagem] = useState('');
  const isbnRef = useRef();
  const cpfRef = useRef();

  const livrosDisponiveis = livros.filter(l => l.disponivel);

  function handleEmprestar() {
    const isbn = isbnRef.current.value;
    const cpf = cpfRef.current.value;
    if (!isbn || !cpf) {
      setMensagem( { texto: 'Campos obrigatórios não preenchidos!', tipo: 'erro' } );
      return;
    }
    const novo = { isbn, cpf };
    createEmprestimo(novo)
      .then(dados => setMensagem( { texto: 'Empréstimo de id ' + dados.id + ' incluído!', tipo: 'info' } ))
      .then(resp => fcAtualizar())
      .then(resp => {
        isbnRef.current.value = '';
        cpfRef.current.value = '';
      })
      .catch(error => setMensagem( { texto: error.message, tipo: 'erro' } ));
  }

  return (
    <div className='emprestimo-container'>
      {
        mensagem && <h3 className={mensagem.tipo === 'erro' ? 'error-message' : 'info-message'}>{mensagem.texto}</h3>
      }
      <h2>Empréstimo</h2>
      <div className='form-emprestimo'>
        <div className='input-grupo'>
          <label htmlFor='input-livro'>Livro:</label>
          <select ref={isbnRef}>
            <option value=''>Selecione...</option>
            {
              livrosDisponiveis.map(livro => <option key={livro.isbn} value={livro.isbn}>{livro.isbn} - {livro.titulo}</option>)
            }
          </select>
        </div>
        <div className='input-grupo'>
          <label htmlFor='input-nome'>Leitor:</label>
          <select ref={cpfRef} >
            <option value=''>Selecione...</option>
            {
              leitores.map(leitor => <option key={leitor.cpf} value={leitor.cpf}>{leitor.cpf} - {leitor.nome}</option>)
            }
          </select>
        </div>
        <button onClick={handleEmprestar}>Emprestar</button>
      </div>
    </div>
  )
}