import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { criarAluno } from "../api/aluno";

function CriarAlunos() {
    const navigate = useNavigate()
    const [aluno, setAluno] = useState({ nome: '', email: '', cpf: '' })

    function handleSubmit(e) {
        e.preventDefault()

        async function criar() {
            const dados = await criarAluno(aluno)
            setAluno(dados)
            navigate('/')
        }
        criar()
    }

    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="animate-fade-in bg-bg-secondary border border-neutral-800 rounded-xl p-8 w-full max-w-md space-y-5
                           shadow-2xl shadow-black/50"
            >
                <Link to="/" className="text-gray-secondary text-xs uppercase tracking-widest hover:text-red-primary transition-colors">
                    ← Voltar
                </Link>

                <h2 className="font-display text-4xl uppercase text-white mb-2 leading-none">
                    Novo <span className="text-red-primary">Aluno</span>
                </h2>

                <div>
                    <label className="block text-gray-secondary text-xs uppercase tracking-widest font-semibold mb-1">
                        Nome
                    </label>
                    <input
                        value={aluno.nome}
                        onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
                        className="w-full bg-bg-primary border border-neutral-800 text-white rounded px-3 py-2.5
                                   focus:border-red-primary focus:outline-none focus:ring-2 focus:ring-red-primary/20
                                   transition-all duration-300"
                    />
                </div>

                <div>
                    <label className="block text-gray-secondary text-xs uppercase tracking-widest font-semibold mb-1">
                        Email
                    </label>
                    <input
                        value={aluno.email}
                        onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
                        className="w-full bg-bg-primary border border-neutral-800 text-white rounded px-3 py-2.5
                                   focus:border-red-primary focus:outline-none focus:ring-2 focus:ring-red-primary/20
                                   transition-all duration-300"
                    />
                </div>

                <div>
                    <label className="block text-gray-secondary text-xs uppercase tracking-widest font-semibold mb-1">
                        Cpf
                    </label>
                    <input
                        value={aluno.cpf}
                        onChange={(e) => setAluno({ ...aluno, cpf: e.target.value })}
                        className="w-full bg-bg-primary border border-neutral-800 text-white rounded px-3 py-2.5
                                   focus:border-red-primary focus:outline-none focus:ring-2 focus:ring-red-primary/20
                                   transition-all duration-300"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-primary text-white font-bold uppercase tracking-wide py-3 rounded-md
                               hover:bg-red-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-primary/30
                               transition-all duration-300 mt-2"
                >
                    Criar Aluno
                </button>
            </form>
        </div>
    )
}

export default CriarAlunos