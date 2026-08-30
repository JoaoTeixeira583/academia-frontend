import api from './axios'

export async function criarExercicio(dados){
    const reposta = await api.post('/exercicios',dados)
    return reposta.data
}