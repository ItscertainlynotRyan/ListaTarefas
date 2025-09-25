
import { useState } from 'react';
import './App.css';

function App() {
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [listaOrcamento, setListaOrcamento] = useState([]);

  const adicionarItem = () => {
    if (!descricao || !quantidade || !valorUnitario) return;
    const qtd = parseFloat(quantidade);
    const valor = parseFloat(valorUnitario);
    if (isNaN(qtd) || isNaN(valor) || qtd <= 0 || valor <= 0) return;
    const novoItem = {
      descricao,
      quantidade: qtd,
      valorUnitario: valor,
      valorTotal: qtd * valor,
    };
    setListaOrcamento([...listaOrcamento, novoItem]);
    setDescricao('');
    setQuantidade('');
    setValorUnitario('');
  };

  const removerItem = (idx) => {
    setListaOrcamento(listaOrcamento.filter((_, i) => i !== idx));
  };

  const totalGeral = listaOrcamento.reduce((acc, item) => acc + item.valorTotal, 0);

  return (
    <div className="App" style={{ maxWidth: 5800, margin: '40px auto', padding: 20, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h1>Orçamento</h1>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          min={1}
          onChange={e => setQuantidade(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor Unitário"
          value={valorUnitario}
          min={0.01}
          step={0.01}
          onChange={e => setValorUnitario(e.target.value)}
        />
  <button onClick={adicionarItem} style={{ background: '#27ae60', color: '#fff', border: 'none', padding: '0 16px', borderRadius: 4, fontSize: 20, cursor: 'pointer' }}>+</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Descrição</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Quantidade</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Valor Unitário</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Valor Total</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {listaOrcamento.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>Nenhum item adicionado.</td>
            </tr>
          ) : (
            listaOrcamento.map((item, idx) => (
              <tr key={idx}>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{item.descricao}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{item.quantidade}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>R$ {item.valorUnitario.toFixed(2)}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>R$ {item.valorTotal.toFixed(2)}</td>
                <td style={{ padding: 8, border: '1px solid #ddd', textAlign: 'center' }}>
                  <button onClick={() => removerItem(idx)} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, width: 32, height: 32, fontSize: 16, cursor: 'pointer' }}>x</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'right', background: '#d4f8e8', padding: '12px 0', borderRadius: 6 }}>
        Total Geral: R$ {totalGeral.toFixed(2)}
      </div>
    </div>
  );
}


export default App;
