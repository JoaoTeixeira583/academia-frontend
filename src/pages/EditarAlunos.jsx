import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { buscarAlunoPorId,atualizarAluno } from "../api/aluno";


function EditarAlunos(){
    const {id} = useParams() // Pega o id da URL
    const [aluno,setAluno] = useState({nome: '', email: '', cpf: ''})
    const navigate = useNavigate()

    useEffect(()=>{
       async function editarAlunos(){
        const dados = await buscarAlunoPorId(id)
        setAluno(dados)
       }
       editarAlunos()
       
    },[])

    function handleSubmit(e){
       e.preventDefault()

       async function editar(){
         const dados = await atualizarAluno(id,aluno)
         setAluno(dados) 
          navigate('/')
       }
       editar()
    }

    return(
        <form onSubmit={handleSubmit}>

         <label>Nome</label>
         <input
         value={aluno.nome}
         onChange={(e)=>setAluno({...aluno,nome: e.target.value})}
         />
         <label>Email</label>
          <input
         value={aluno.email}
         onChange={(e)=>setAluno({...aluno,email: e.target.value})}
         />
         <label>Cpf</label>
          <input
         value={aluno.cpf}
         onChange={(e)=>setAluno({...aluno,cpf: e.target.value})}
         />
         <button type="submit">Salvar</button>
        </form>
    )

}


export default EditarAlunos