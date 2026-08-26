import { useState, useEffect } from "react"
import { excluirAluno, listarAlunos } from "../api/aluno"
import { Link } from "react-router-dom"


function ListaAlunos() {

    const [alunos, setAlunos] = useState([])


    // Buscar Dados

    useEffect(() => {
        async function carregarAlunos() {
            const dados = await listarAlunos()
            setAlunos(dados)
        }
        carregarAlunos()
    }, [])

    // Excluir
    async function handleExcluir(id) {
        await excluirAluno(id)
        setAlunos(alunos.filter((aluno) => aluno.id !== id))
    }



    return (
        <div className="min-h-screen bg-bg-primary px-6 py-10 md:px-12">
            <div className="max-w-4xl mx-auto animate-fade-in">

                {/* Cabeçalho */}
                <div className="mb-10 border-l-4 border-red-primary pl-4">
                    <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
                        Gerencie seus <span className="text-red-primary">Alunos</span>
                    </h1>
                    <p className="text-gray-secondary font-semibold uppercase text-xs md:text-sm tracking-[0.2em] mt-2">
                        Sem desculpa. Só evolução.
                    </p>
                </div>

                <Link to={"/criarAluno"}
                    className="inline-block bg-red-primary text-white font-bold uppercase tracking-wide px-6 py-3 rounded-md
                               hover:bg-red-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-primary/30
                               transition-all duration-300 mb-10">
                    + Novo Aluno
                </Link>

                {alunos.length === 0 && (
                    <p className="text-gray-secondary uppercase tracking-widest text-sm">
                        Nenhum aluno cadastrado ainda.
                    </p>
                )}

                <ul className="space-y-4">
                    {alunos.map((aluno, index) => (
                        <li
                            key={aluno.id}
                            style={{ animationDelay: `${index * 80}ms` }}
                            className="animate-fade-in bg-bg-secondary border border-neutral-800 rounded-xl p-5
                                       flex items-center justify-between gap-4
                                       hover:border-red-primary/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40
                                       transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="shrink-0 w-11 h-11 rounded-full border-2 border-red-primary
                                                flex items-center justify-center font-display text-xl text-red-primary">
                                    {aluno.nome?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-neutral-100 font-medium truncate">
                                    {aluno.nome}
                                    <span className="text-gray-secondary font-normal"> — {aluno.email}</span>
                                </span>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Link
                                    to={`/editar/${aluno.id}`}
                                    className="bg-neutral-800 text-white font-bold uppercase px-3 py-1.5 rounded text-xs
                                               hover:bg-red-dark transition-colors duration-300"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleExcluir(aluno.id)}
                                    className="bg-red-primary text-white font-bold uppercase px-3 py-1.5 rounded text-xs
                                               hover:bg-red-dark transition-colors duration-300"
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListaAlunos