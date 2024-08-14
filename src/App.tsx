import './App.css'
import React, { useState } from 'react';
import { Tarefa } from './Type/tarefas';
import ListaTarefas from './components/ListaTarefas';
import CadastrarTarefa from './components/CadastrarTarefa';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);
  const [categorias] = useState<string[]>(['Trabalho', 'Pessoal', 'Estudos']);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('');

  const adicionarOuEditarTarefa = (tarefa: Tarefa) => {
    if (tarefa.id === '') {
      tarefa.id = uuidv4();
      tarefa.concluida = false; // Inicia como não concluída
      setTarefas(prevTarefas => [...prevTarefas, tarefa]);
    } else {
      setTarefas(prevTarefas => prevTarefas.map(i => (i.id === tarefa.id ? tarefa : i)));
    }
    setTarefaEditando(null);
  };

  const editarTarefa = (tarefa: Tarefa) => {
    setTarefaEditando(tarefa);
  };

  const deletarTarefa = (id: string) => {
    setTarefas(prevTarefas => prevTarefas.filter(tarefa => tarefa.id !== id));
  };

  const cancelarEdicao = () => {
    setTarefaEditando(null);
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoriaSelecionada(e.target.value);
  };

  const marcarComoConcluida = (id: string) => {
    setTarefas(prevTarefas => prevTarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  const tarefasFiltradas = categoriaSelecionada
    ? tarefas.filter(tarefa => tarefa.categoria === categoriaSelecionada)
    : tarefas;

  return (
    <div>
      <h1>Gerenciamento de Itens</h1>
      
      {/* Filtro de Categoria */}
      <div>
        <label>Filtrar por Categoria:</label>
        <select value={categoriaSelecionada} onChange={handleCategoriaChange}>
          <option value="">Todas</option>
          {categorias.map(categoria => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <CadastrarTarefa
        tarefaAtual={tarefaEditando}
        salvarTarefa={adicionarOuEditarTarefa}
        cancelarEdicao={cancelarEdicao}
        categorias={categorias}
        tarefas={tarefas}
      />
      
      <ListaTarefas
        tarefas={tarefasFiltradas}
        editarTarefa={editarTarefa}
        deletarTarefa={deletarTarefa}
        marcarComoConcluida={marcarComoConcluida} // Passando a função para marcar como concluída
      />
    </div>
  );
};

export default App;
