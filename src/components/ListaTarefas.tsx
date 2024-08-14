import { Tarefa } from '../Type/tarefas';

interface ListaTarefasProps {
    tarefas: Tarefa[];
    editarTarefa: (tarefa: Tarefa) => void;
    deletarTarefa: (id: string) => void;
    marcarComoConcluida: (id: string) => void; // Adicionei este método
}

const ListaTarefas: React.FC<ListaTarefasProps> = ({ tarefas, editarTarefa, deletarTarefa, marcarComoConcluida }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Lista de Tarefas</h2>
            {tarefas.length > 0 ? (
                <ul>
                    {tarefas.map(tarefa => (
                        <li key={tarefa.id} className={`p-4 mb-2 rounded-md flex justify-between items-center ${tarefa.concluida ? 'bg-gray-200 text-gray-500 line-through' : 'bg-white text-gray-800'}`}>
                            <div>
                                <h3 className="text-lg font-semibold">{tarefa.nome}</h3>
                                <p className="text-sm">{tarefa.categoria}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button 
                                    className={`px-3 py-1 rounded-md ${tarefa.concluida ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                                    onClick={() => marcarComoConcluida(tarefa.id)}
                                >
                                    {tarefa.concluida ? 'Concluída' : 'Marcar'}
                                </button>
                                <button 
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    onClick={() => editarTarefa(tarefa)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    onClick={() => deletarTarefa(tarefa.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
            )}
        </div>
    );
}

export default ListaTarefas;
