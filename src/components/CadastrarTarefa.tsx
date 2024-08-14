import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Tarefa } from "../Type/tarefas";

interface CadastrarTarefaProps {
    tarefaAtual?: Tarefa;
    salvarTarefa: (tarefa: Tarefa) => void;
    cancelarEdicao: () => void;
    categorias: string[];
    tarefas: Tarefa[];
}

const CadastrarTarefa: React.FC<CadastrarTarefaProps> = ({
    tarefaAtual, salvarTarefa, cancelarEdicao, categorias, tarefas
}) => {
    const [tarefa, setTarefa] = useState<Tarefa>({
        id: '',
        nome: '',
        categoria: '',
        concluida: false, // Novo campo adicionado
    });

    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('');
    const [tarefasFiltradas, setTarefasFiltradas] = useState<Tarefa[]>(tarefas);

    useEffect(() => {
        if (tarefaAtual) {
            setTarefa(tarefaAtual);
        }
    }, [tarefaAtual]);

    useEffect(() => {
        if (categoriaSelecionada === '') {
            setTarefasFiltradas(tarefas);
        } else {
            setTarefasFiltradas(tarefas.filter(t => t.categoria === categoriaSelecionada));
        }
    }, [categoriaSelecionada, tarefas]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTarefa(prevTarefa => ({
            ...prevTarefa,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        salvarTarefa(tarefa);
        setTarefa({
            id: '',
            nome: '',
            categoria: '',
            concluida: false, // Reverte para o estado inicial
        });
    };

    const handleCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategoriaSelecionada(e.target.value);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Filtro de Categoria */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Filtrar por Categoria:</label>
                <select 
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    value={categoriaSelecionada}
                    onChange={handleCategoriaChange}>
                    <option value="">Todas</option>
                    {categorias.map(categoria => (
                        <option key={categoria} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
            </div>

            {/* Formulário de Cadastro/Edição de Tarefa */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={tarefa.nome}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Categoria:</label>
                    <select
                        name="categoria"
                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        value={tarefa.categoria}
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Salvar
                    </button>
                    {tarefaAtual && (
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            onClick={cancelarEdicao}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Lista de Tarefas Filtradas */}
            <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Tarefas</h2>
                <ul>
                    {tarefasFiltradas.map(tarefa => (
                        <li key={tarefa.id} className={`p-2 rounded-md mb-2 ${tarefa.concluida ? 'bg-gray-200' : 'bg-white'} ${tarefa.concluida ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                            {tarefa.nome} - {tarefa.categoria}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CadastrarTarefa;
