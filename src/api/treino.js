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

