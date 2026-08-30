import api from './axios'

// Para listar o exercicio
export async function listarExercicios(){
    const reposta = await api.get('/exercicios')
    return reposta.data
}

// Para criar o treino
export async function criarTreino(dados){
    const reposta = await api.post('/treinos',dados)
    return reposta.data
}

// Para adicionar o exercicio ao treino
export async function adicionarExercicioAoTreino(treinoId,exercicioId,dados) {
    const reposta = await api.post(`/treinos/${treinoId}/exercicios/${exercicioId}`,dados)
    return reposta.data
}

export async function listarTreinosPorAluno(alunoId){
    const reposta = await api.get(`/treinos/aluno/${alunoId}`)
    return reposta.data
}

export async function excluirTreino(id) {
    const reposta = await api.delete(`/treinos/${id}`)
    return reposta.data
}

export async function listarItensTreino(treinoId){
    const reposta = await api.get(`/treinos/${treinoId}/exercicios`)
    return reposta.data
}

