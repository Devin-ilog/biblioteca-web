import './styles.css';

export default function Listagem({ livros }) {
  return (
    <div className='listagem-container'>
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

      <h3>Empréstimos</h3>

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