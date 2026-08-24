import api from './axios'

// Listar aluno
export async function listarAlunos(){
    const resposta = await api.get('/alunos')
    return resposta.data
}

// Criar aluno
export async function criarAluno(dados) {
    const reposta = await api.post('/alunos',dados)
     return reposta.data
}

// Atualizar
export async function atualizarAluno(id,dados) {
    const reposta = await api.put(`/alunos/${id}`,dados)
    return reposta.data
}

// Excluir
export async function excluirAluno(id){
    const reposta = await api.delete(`/alunos/${id}`)
    return reposta.data
}

// BuscarAlunos
export async function buscarAlunoPorId(id){
    const reposta = await api.get(`/alunos/${id}`)
    return reposta.data
}