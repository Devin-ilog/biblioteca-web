import { useState } from 'react';
import dateFormat from 'dateformat';
import { deleteEmprestimo, deleteLeitor } from '../../service/api-client';
import './styles.css';

export default function Listagem({ livros, leitores, emprestimos, fcAtualizar }) {

  const [mensagem, setMensagem] = useState('');

  function handleExcluirLeitor(cpf) {
    deleteLeitor(cpf)
    .then(resp => setMensagem( { texto: 'Leitor de CPF ' + cpf + ' excluído!', tipo: 'info' } ))
    .then(resp => fcAtualizar())
    .catch(error => setMensagem( { texto: 'Erro: ' + error.message, tipo: 'erro' } ));
  }

  function handleDevolverEmprestimo(id) {
    deleteEmprestimo(id)
      .then(resp => setMensagem( { texto: 'Empréstimo de id ' + id + ' excluído!', tipo: 'info' } ))
      .then(resp => fcAtualizar())
      .catch(error => setMensagem( { texto: 'Erro: ' + error.message, tipo: 'erro' } ));
  }

  return (
    <div className='listagem-container'>
      {
        mensagem && <h3 className={mensagem.tipo === 'erro' ? 'error-message' : 'info-message'}>{mensagem.texto}</h3>
      }
      
      <h2>Listagem</h2>

      <h3>Livros</h3>
      {
        (!livros || livros.length === 0) ? <span>Sem livros cadastrados</span> :
          <table>
            <thead>
              <tr>
                <th>isbn</th>
                <th>título</th>
                <th>autores</th>
                <th>disponível</th>
              </tr>
            </thead>
            <tbody>
                {
                  livros.map( livro => <TabelaLivro livro={livro} key={livro.isbn} /> )
                }
            </tbody>
          </table>
      }

      <h3>Leitores</h3>
      {
        (!leitores || leitores.length === 0) ? <span>Sem leitores cadastrados</span> :
          <table>
            <thead>
              <tr>
                <th>cpf</th>
                <th>nome</th>
                <th>data de nascimento</th>
                <th>empréstimos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
                {
                  leitores.map( leitor => <TabelaLeitor key={leitor.cpf} leitor={leitor} handleExcluirLeitor={handleExcluirLeitor} />)
                }
            </tbody>
          </table>
      }

      <h3>Empréstimos</h3>
      {
        (!emprestimos || emprestimos.length === 0) ? <span>Sem emprestimos cadastrados</span> :
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>isbn</th>
              <th>título</th>
              <th>cpf</th>
              <th>nome</th>
              <th>ações</th>
            </tr>
          </thead>
          <tbody>
              {
                emprestimos.map( emp => <TabelaEmprestimo key={emp.id} emprestimo={emp} fcDevolucao={handleDevolverEmprestimo} /> )
              }
          </tbody>
        </table>
      }

    </div>
  )
}


function TabelaLivro({ livro }) {
  return (<tr>
    <td>{livro.isbn}</td>
    <td>{livro.titulo}</td>
    <td>{livro.autores}</td>
    <td className={livro.disponivel ? 'livro-disponivel' : 'livro-indisponivel'}>{livro.disponivel ? 'SIM' : 'NÃO'}</td>
  </tr>)
}

function TabelaLeitor({ leitor, handleExcluirLeitor}) {
  return (
    <tr>
      <td>{leitor.cpf}</td>
      <td>{leitor.nome}</td>
      <td>{dateFormat(new Date(leitor.dataNascimento), 'dd/mm/yyyy')}</td>
      <td>{leitor.qtdEmprestimos}</td>
      <td><button onClick={() => handleExcluirLeitor(leitor.cpf)}>Excluir</button></td>
    </tr>
  );
}

function TabelaEmprestimo({ emprestimo, fcDevolucao }) {
  return (
    <tr>
      <td>{emprestimo.id}</td>
      <td>{emprestimo.isbn}</td>
      <td>{emprestimo.titulo}</td>
      <td>{emprestimo.cpf}</td>
      <td>{emprestimo.nome}</td>
      <td><button onClick={() => fcDevolucao(emprestimo.id)}>Devolver</button></td>
    </tr>
  );
}