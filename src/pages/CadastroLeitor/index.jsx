import { useRef, useState } from 'react';
import { createLeitor } from '../../service/api-client';
import './styles.css';

export default function CadastroLeitor({ fcAtualizar }) {

  const [mensagem, setMensagem] = useState('');
  const cpfRef = useRef();
  const nomeRef = useRef();
  const dataNascRef = useRef();

  function handleCadastrar() {
    const cpf = cpfRef.current.value;
    const nome = nomeRef.current.value;
    const dataNasc = dataNascRef.current.value;
    const novo = { cpf, nome, dataNascimento: new Date(dataNasc)};
    createLeitor(novo)
      .then(resp => setMensagem( { texto: 'Leitor de CPF ' + cpf + ' incluído!', tipo: 'info' } ))
      .then(resp => fcAtualizar())
      .then(resp => {
        cpfRef.current.value = '';
        nomeRef.current.value = '';
        dataNascRef.current.value = '';
      })
      .catch(error => setMensagem( { texto: error.message, tipo: 'erro' } ));
  }

  return (
    <div className='cadastro-leitor-container'>
      {
        mensagem && <h3 className={mensagem.tipo === 'erro' ? 'error-message' : 'info-message'}>{mensagem.texto}</h3>
      }
      <h2>Cadastro Leitor</h2>
      <div className='form-cadastro-leitor'>
        <div className='input-grupo'>
          <label htmlFor='input-cpf'>CPF:</label>
          <input type='text' id='input-cpf' ref={cpfRef} placeholder='CPF do leitor' />
        </div>
        <div className='input-grupo'>
          <label htmlFor='input-nome'>Nome:</label>
          <input type='text' id='input-nome' ref={nomeRef} placeholder='Nome do leitor' />
        </div>
        <div className='input-grupo'>
          <label htmlFor='input-data-nascimento'>Data de Nascimento:</label>
          <input type='date' id='input-data-nascimento' ref={dataNascRef} />
        </div>
        <button onClick={() => handleCadastrar()}>Cadastrar</button>
      </div>
    </div>
  )
}