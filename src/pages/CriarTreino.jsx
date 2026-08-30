import { useState,useEffect } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";

import { buscarAlunoPorId } from "../api/aluno";
import { adicionarExercicioAoTreino, criarTreino, listarExercicios } from "../api/treino";

function CriarTreino(){
    // Pegar o id
    const {id} = useParams()
    // Colchetes são para lista e Chaves são para objetos
    const [aluno,setAluno] = useState({nome: ''})
    const [treino,setTreino] = useState({
      nome: '',
      descricao: ''
    })
    const [exercicios,setExercicios] = useState([])
    const [itens,setItens] = useState([{
      exercicioId: '',
      series: '',
      repeticoes: '',
      carga: ''
    }])
    const navigate = useNavigate()
    
    useEffect(()=>{
      async function buscarAluno(){
        const dados = await buscarAlunoPorId(id)
        setAluno(dados)
      }
      buscarAluno()
    //   Para executar quando o id da url mudar
    },[id])

    useEffect(()=>{
      async function carregarExercicios(){
        const dados = await listarExercicios()
        setExercicios(dados)
      }
      carregarExercicios()
    },[])

    function atualizarItem(indice,campo,valor){
      // Para criar a copia a lista atual
     const novosItens = [...itens] 
    //  Usa chaves para objeto
     novosItens[indice] = {
      // indice serve para saber qual array eu vou editar
      ...novosItens[indice],
      // Campo para decidir oq eu vou mudar series,repticoes, e exercicioId
      [campo]: valor      
      // E o valor e oq foi digitado
     }
     setItens(novosItens)
    }

    function adicionarItem(){
      const novosItens = [...itens,
        {exercicioId: '',
          series: '',
          repeticoes: '',
          carga: ''
        }
      ]
      setItens(novosItens)
    }

    function removerItem(indice){
      setItens(itens.filter((_,i) => i !== indice))
    }

    async function handleSubmit(e){
      e.preventDefault()
     
      if(itens.some((item)=> item.exercicioId == '')){
        alert("Selecione um exercício em todos os itens antes de salvar")
        return
      }

      const treinoCriado = await criarTreino({...treino,aluno: {id}})
      for (const item of itens){
        await adicionarExercicioAoTreino(treinoCriado.id, item.exercicioId, {
          series: item.series,
          repeticoes: item.repeticoes,
          carga: item.carga
        })
      }
      navigate('/')
    }

    
    

    return(
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Criar Treino</h1>
            <h2>Aluno: {aluno.nome}</h2>

           <label>
             Nome do treino
           </label>
           <input
           value={treino.nome}
           onChange={(e)=>setTreino({...treino,nome:e.target.value})}
           placeholder="Digite o nome do treino"
           ></input>

           <label>
            Descrição do treino
           </label>
           <textarea
           value={treino.descricao}
           onChange={(e=>setTreino({...treino,descricao:e.target.value}))}>
           </textarea>

           {itens.map((item,indice)=>(
            <div key={indice}>
              <select
              value={item.exercicioId}
              onChange={(e)=>atualizarItem(indice, 'exercicioId', e.target.value)}>   
              <option value="">Selecione um exercício</option>

              {/* Fazendo o map */}

              {exercicios.map((exercicio)=>(
                <option
                value={exercicio.id}
                key={exercicio.id}>
                {exercicio.nome}
                </option>
              ))}
              </select>

              {/* Fazendo os inputs */}
               <label>Series</label>
               <input type="number"
                value={item.series}
                onChange={(e)=> atualizarItem(indice, 'series', e.target.value)}
                />

                <label>Repeticoes</label>
                <input type="number"
                value={item.repeticoes}
                onChange={(e)=> atualizarItem(indice, 'repeticoes', e.target.value)}> 
                </input>

                <label>Carga</label>
                <input type="number"
                value={item.carga}
                onChange={(e)=> atualizarItem(indice, 'carga' ,e.target.value)} 
                />
              
              
              <button
              type="button"
              onClick={()=>removerItem(indice)}>
              Excluir
              </button>
            </div>

           ))}
           
            <button
            type="button"
            onClick={adicionarItem}>
            + Adicionar exercício
            </button>

            <button
            type="submit">
            Salvar Treino
            </button>

           </form>
        </div>
    )

}


export default CriarTreino
