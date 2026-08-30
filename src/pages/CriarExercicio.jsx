import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { criarExercicio } from "../api/exercicio";


function CriarExercicio() {
    const navigate = useNavigate()
    const [exercicio, setExercicio] = useState({
        nome: '',
        descricao: '',
        grupoMuscular: ''
    })

    function handleSubmit(e) {
        e.preventDefault()

        async function criar() {
            const reposta = await criarExercicio(exercicio)
            setExercicio(reposta)
            navigate('/')
        }
        criar()
    }

    const inputClass = "w-full bg-bg-primary border border-neutral-800 text-white rounded px-3 py-2.5 focus:border-red-primary focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all duration-300"
    const labelClass = "block text-gray-secondary text-xs uppercase tracking-widest font-semibold mb-1"

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
                    Novo <span className="text-red-primary">Exercício</span>
                </h2>

                <div>
                    <label className={labelClass}>Nome do exercício</label>
                    <input
                        type="text"
                        value={exercicio.nome}
                        onChange={(e) => setExercicio({ ...exercicio, nome: e.target.value })}
                        placeholder="Ex: Supino reto"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Descrição</label>
                    <textarea
                        value={exercicio.descricao}
                        onChange={(e) => setExercicio({ ...exercicio, descricao: e.target.value })}
                        rows={3}
                        placeholder="Como executar o movimento..."
                        className={inputClass + " resize-none"}
                    />
                </div>

                <div>
                    <label className={labelClass}>Grupo muscular</label>
                    <input
                        type="text"
                        value={exercicio.grupoMuscular}
                        onChange={(e) => setExercicio({ ...exercicio, grupoMuscular: e.target.value })}
                        placeholder="Ex: Peito"
                        className={inputClass}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-primary text-white font-bold uppercase tracking-wide py-3 rounded-md
                               hover:bg-red-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-primary/30
                               transition-all duration-300 mt-2"
                >
                    Criar Exercício
                </button>
            </form>
        </div>
    )
}

export default CriarExercicio