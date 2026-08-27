import { useState,useEffect } from "react";
import { Link,useParams } from "react-router-dom";

import { buscarAlunoPorId } from "../api/aluno";

function CriarTreino(){
    // Pegar o id
    const {id} = useParams()
    // Colchetes são para lista e Chaves são para objetos
    const [aluno,setAluno] = useState({nome: ''})

    useEffect(()=>{
      async function buscarAluno(){
        const dados = await buscarAlunoPorId(id)
        setAluno(dados)
      }
      buscarAluno()
    //   Para executar quando o id da url mudar
    },[id])

    return(
        <div>
            <h1>Criar Treino</h1>
            <h2>Aluno: {aluno.nome}</h2>

            
        </div>
    )

}


export default CriarTreino
