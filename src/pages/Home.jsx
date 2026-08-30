import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="bg-bg-primary font-body min-h-screen">

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-bg-primary/90 backdrop-blur border-b border-white/10">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                    <span className="font-display text-2xl text-white tracking-wide">
                        FORJA<span className="text-red-primary">.</span>
                    </span>
                    <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-gray-secondary">
                        <Link to="/alunos" className="hover:text-white transition">Alunos</Link>
                        <Link to="/criarExercicio" className="hover:text-white transition">Exercícios</Link>
                        <a href="#planos" className="hover:text-white transition">Planos</a>
                    </div>
                    <Link
                        to="/criarAluno"
                        className="bg-red-primary text-white text-sm font-semibold uppercase px-5 py-2 rounded hover:bg-red-dark transition"
                    >
                        Comece Agora
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                <div
                    className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
                    style={{ background: "radial-gradient(circle, #E50914, transparent 70%)" }}
                />

                <div className="relative text-center max-w-3xl animate-fade-in-up">
                    <h1 className="font-display uppercase text-6xl md:text-8xl leading-none text-white">
                        Seu limite é <span className="text-red-primary">mental</span>
                    </h1>
                    <p className="text-gray-secondary text-lg md:text-xl mt-6">
                        Treine. Evolua. Supere seus limites.
                    </p>
                    <div className="flex gap-4 justify-center mt-10">
                        <Link
                            to="/alunos"
                            className="bg-red-primary text-white font-bold uppercase tracking-wide px-8 py-4 rounded-md hover:bg-red-dark hover:scale-105 transition duration-300 shadow-lg shadow-red-primary/30"
                        >
                            Gerenciar Alunos
                        </Link>
                        <Link
                            to="/criarAluno"
                            className="border border-white/20 text-white font-bold uppercase tracking-wide px-8 py-4 rounded-md hover:border-red-primary hover:text-red-primary transition duration-300"
                        >
                            Novo Aluno
                        </Link>
                    </div>
                </div>
            </section>

         

            {/* FOOTER */}
            <footer className="bg-bg-primary border-t border-white/10 py-10 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-secondary text-sm">
                    <span className="font-display text-white text-xl">
                        FORJA<span className="text-red-primary">.</span>
                    </span>
                    <span>© 2026 Forja Academia. Todos os direitos reservados.</span>
                </div>
            </footer>
        </div>
    )
}

export default Home