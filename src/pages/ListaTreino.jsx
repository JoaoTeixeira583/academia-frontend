import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { excluirTreino, listarItensTreino, listarTreinosPorAluno } from "../api/treino";

function ListarTreino() {
    const { id } = useParams()

    const [listaTreino, setListaTreino] = useState([])
    const [itensPorTreino, setItensPorTreino] = useState({})

    useEffect(() => {
        async function carregarTreinos() {
            const dados = await listarTreinosPorAluno(id)
            setListaTreino(dados)

            for (const treino of dados) {
                const itens = await listarItensTreino(treino.id)

                setItensPorTreino((itensAtual) => ({
                    ...itensAtual,
                    [treino.id]: itens
                }))
            }
        }
        carregarTreinos()
    }, [])

    async function handleExcluir(id) {
        await excluirTreino(id)
        setListaTreino(listaTreino.filter((treino) => treino.id !== id))
    }

    return (
        <div className="min-h-screen bg-bg-primary px-6 py-10 md:px-12">
            <div className="max-w-3xl mx-auto animate-fade-in">

                <Link
                    to="/"
                    className="text-gray-secondary text-xs uppercase tracking-widest hover:text-red-primary transition-colors"
                >
                    ← Voltar
                </Link>

                <div className="mb-10 border-l-4 border-red-primary pl-4 mt-4">
                    <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
                        Treinos <span className="text-red-primary">do aluno</span>
                    </h1>
                    <p className="text-gray-secondary font-semibold uppercase text-xs md:text-sm tracking-[0.2em] mt-2">
                        Cada linha, um passo pra evolução.
                    </p>
                </div>

                {listaTreino.length === 0 && (
                    <p className="text-gray-secondary uppercase tracking-widest text-sm">
                        Nenhum treino cadastrado ainda.
                    </p>
                )}

                <ul className="space-y-4">
                    {listaTreino.map((treino, index) => (
                        <li
                            key={treino.id}
                            style={{ animationDelay: `${index * 80}ms` }}
                            className="animate-fade-in bg-bg-secondary border border-neutral-800 rounded-xl p-5
                                       hover:border-red-primary/60 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="font-display text-2xl uppercase text-white leading-none">
                                        {treino.nome}
                                    </h2>
                                    {treino.descricao && (
                                        <p className="text-gray-secondary text-sm mt-1">
                                            {treino.descricao}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleExcluir(treino.id)}
                                    className="shrink-0 bg-red-primary text-white font-bold uppercase px-3 py-1.5 rounded text-xs
                                               hover:bg-red-dark transition-colors duration-300"
                                >
                                    Excluir
                                </button>
                            </div>

                            <ul className="mt-4 space-y-2 border-t border-neutral-800 pt-4">
                                {itensPorTreino[treino.id]?.length === 0 && (
                                    <li className="text-gray-secondary text-xs uppercase tracking-widest">
                                        Sem exercícios adicionados
                                    </li>
                                )}

                                {itensPorTreino[treino.id]?.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex items-center justify-between bg-bg-primary border border-neutral-800
                                                   rounded-md px-3 py-2 text-sm"
                                    >
                                        <span className="text-neutral-100 font-medium">
                                            {item.exercicio?.nome}
                                        </span>
                                        <span className="text-red-primary font-semibold text-xs uppercase tracking-wide">
                                            {item.series}x{item.repeticoes} — {item.carga}kg
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListarTreino