import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { buscarAlunoPorId } from "../api/aluno";
import { adicionarExercicioAoTreino, criarTreino, listarExercicios } from "../api/treino";

function CriarTreino() {
    const { id } = useParams()
    const [aluno, setAluno] = useState({ nome: '' })
    const [treino, setTreino] = useState({
        nome: '',
        descricao: ''
    })
    const [exercicios, setExercicios] = useState([])
    const [itens, setItens] = useState([{
        exercicioId: '',
        series: '',
        repeticoes: '',
        carga: ''
    }])
    const navigate = useNavigate()

    useEffect(() => {
        async function buscarAluno() {
            const dados = await buscarAlunoPorId(id)
            setAluno(dados)
        }
        buscarAluno()
    }, [id])

    useEffect(() => {
        async function carregarExercicios() {
            const dados = await listarExercicios()
            setExercicios(dados)
        }
        carregarExercicios()
    }, [])

    function atualizarItem(indice, campo, valor) {
        const novosItens = [...itens]
        novosItens[indice] = {
            ...novosItens[indice],
            [campo]: valor
        }
        setItens(novosItens)
    }

    function adicionarItem() {
        const novosItens = [...itens,
        { exercicioId: '', series: '', repeticoes: '', carga: '' }
        ]
        setItens(novosItens)
    }

    function removerItem(indice) {
        setItens(itens.filter((_, i) => i !== indice))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (itens.some((item) => item.exercicioId == '')) {
            alert("Selecione um exercício em todos os itens antes de salvar")
            return
        }

        const treinoCriado = await criarTreino({ ...treino, aluno: { id } })
        for (const item of itens) {
            await adicionarExercicioAoTreino(treinoCriado.id, item.exercicioId, {
                series: item.series,
                repeticoes: item.repeticoes,
                carga: item.carga
            })
        }
        navigate('/')
    }

    const inputClass = "w-full bg-bg-primary border border-neutral-800 text-white rounded px-3 py-2.5 focus:border-red-primary focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all duration-300"
    const labelClass = "block text-gray-secondary text-xs uppercase tracking-widest font-semibold mb-1"

    return (
        <div className="min-h-screen bg-bg-primary flex items-start justify-center p-6 py-12">
            <form
                onSubmit={handleSubmit}
                className="animate-fade-in bg-bg-secondary border border-neutral-800 rounded-xl p-8 w-full max-w-2xl space-y-6 shadow-2xl shadow-black/50"
            >
                <Link to="/" className="text-gray-secondary text-xs uppercase tracking-widest hover:text-red-primary transition-colors">
                    ← Voltar
                </Link>

                <div>
                    <h2 className="font-display text-4xl uppercase text-white leading-none">
                        Criar <span className="text-red-primary">Treino</span>
                    </h2>
                    <p className="text-gray-secondary text-sm mt-1">
                        Aluno: <span className="text-white font-medium">{aluno.nome}</span>
                    </p>
                </div>

                <div>
                    <label className={labelClass}>Nome do treino</label>
                    <input
                        value={treino.nome}
                        onChange={(e) => setTreino({ ...treino, nome: e.target.value })}
                        placeholder="Ex: Treino A — Peito e Tríceps"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Descrição</label>
                    <textarea
                        value={treino.descricao}
                        onChange={(e) => setTreino({ ...treino, descricao: e.target.value })}
                        rows={2}
                        className={inputClass + " resize-none"}
                    />
                </div>

                <div className="border-t border-neutral-800 pt-5 space-y-4">
                    <h3 className="font-display text-xl uppercase text-white">
                        Exercícios
                    </h3>

                    {itens.map((item, indice) => (
                        <div
                            key={indice}
                            className="bg-bg-primary border border-neutral-800 rounded-lg p-4 space-y-3"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <select
                                    value={item.exercicioId}
                                    onChange={(e) => atualizarItem(indice, 'exercicioId', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Selecione um exercício</option>
                                    {exercicios.map((exercicio) => (
                                        <option value={exercicio.id} key={exercicio.id}>
                                            {exercicio.nome}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    onClick={() => removerItem(indice)}
                                    className="shrink-0 bg-neutral-800 text-white font-bold uppercase px-3 py-2 rounded text-xs hover:bg-red-dark transition-colors duration-300"
                                >
                                    Remover
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className={labelClass}>Séries</label>
                                    <input
                                        type="number"
                                        value={item.series}
                                        onChange={(e) => atualizarItem(indice, 'series', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Repetições</label>
                                    <input
                                        type="number"
                                        value={item.repeticoes}
                                        onChange={(e) => atualizarItem(indice, 'repeticoes', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Carga (kg)</label>
                                    <input
                                        type="number"
                                        value={item.carga}
                                        onChange={(e) => atualizarItem(indice, 'carga', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={adicionarItem}
                        className="w-full bg-neutral-800 text-white font-bold uppercase py-2.5 rounded-md hover:bg-neutral-700 transition-colors duration-300 text-sm"
                    >
                        + Adicionar exercício
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-primary text-white font-bold uppercase tracking-wide py-3 rounded-md hover:bg-red-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-primary/30 transition-all duration-300"
                >
                    Salvar Treino
                </button>
            </form>
        </div>
    )
}

export default CriarTreino