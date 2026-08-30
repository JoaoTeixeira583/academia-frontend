import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

import { excluirTreino, listarItensTreino, listarTreinosPorAluno } from "../api/treino";

function ListarTreino(){
    const {id} = useParams()

    const [listaTreino,setListaTreino] = useState([])
    const [itensPorTreino, setItensPorTreino] = useState({})
    

    useEffect(()=>{
        async function carregarTreinos(){
            const dados = await listarTreinosPorAluno(id)
            setListaTreino(dados)

            for(const treino of dados){
               const itens = await listarItensTreino(treino.id)

               setItensPorTreino((itensAtual)=>({
                ...itensAtual,
                [treino.id]:itens
               }))
               
            }
        }
        carregarTreinos()
    }, [])

    async function handleExcluir(id){
        await excluirTreino(id)
        setListaTreino(listaTreino.filter((treino)=> treino.id !== id))
    }

    return(
        <div>
            <h1>Treinos</h1>
            <ul>
                {listaTreino.map((treino)=>(
                    <li key={treino.id}>
                        {treino.nome}
                        {treino.descricao}

                        <button
                        onClick={() => handleExcluir(treino.id)}>
                            Excluir treino
                        </button>
                        
                    
                        <ul>
                          {itensPorTreino[treino.id]?.map((item) => (
                          <li key={item.id}>
                          {item.exercicio?.nome} — {item.series}x{item.repeticoes} — {item.carga}kg
                          </li>
                          ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default ListarTreino