import {  useState } from "react";
import { useNavigate} from "react-router-dom";

import { criarAluno } from "../api/aluno";

function CriarAlunos(){
    const navigate = useNavigate()
    const [aluno,setAluno] = useState({nome: '',email: '',cpf: ''})

    function handleSubmit(e){
        e.preventDefault()

        async function criar(){
            const dados = await criarAluno(aluno)
            setAluno(dados)
            navigate('/')
        }
        criar()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Nome:</label>
            <input
            value={aluno.nome}
            onChange={(e)=>setAluno({...aluno,nome: e.target.value})}
            />

            <label>Email:</label>
            <input
            value={aluno.email}
            onChange={(e)=>setAluno({...aluno,email: e.target.value})}
            />

            <label>Cpf:</label>
            <input
            value={aluno.cpf}
            onChange={(e)=>setAluno({...aluno,cpf: e.target.value})}
            />
            <button type="submit">Criar Aluno</button>
        </form>
    )
}

export default CriarAlunos