import { useState,useEffect } from "react"
import {  excluirAluno, listarAlunos } from "../api/aluno"
import { Link } from "react-router-dom"


function ListaAlunos(){

    const [alunos,setAlunos] = useState([])
    

    // Buscar Dados

    useEffect(()=>{
        async function carregarAlunos(){
            const dados = await listarAlunos()
            setAlunos(dados)
        }
        carregarAlunos()
    },[])

    // Excluir
    async function handleExcluir(id){
        await excluirAluno(id)
        setAlunos(alunos.filter((aluno)=> aluno.id !== id))
    }

   

    return(
        <div>
            <h1>Alunos</h1>
            <Link to={"/criarAluno"}>Novo Aluno</Link>
            <ul>
                {alunos.map((aluno)=>(
                    <li 
                    key={aluno.id}>{aluno.nome}-{aluno.email}
                    <button onClick={()=>handleExcluir(aluno.id)}>Excluir</button>
                    <Link to={`/editar/${aluno.id}`}>Editar</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaAlunos