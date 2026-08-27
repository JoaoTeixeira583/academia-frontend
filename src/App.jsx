import ListaAlunos from './pages/ListaAlunos'
import { Routes, Route } from 'react-router-dom'
import EditarAlunos from './pages/EditarAlunos'
import CriarAlunos  from './pages/CriarAlunos'
import CriarTreino from  './pages/CriarTreino'

function App() {
  
  return (
    <Routes>
    <Route path='/' element={<ListaAlunos/>}></Route>
    <Route path='/editar/:id' element={<EditarAlunos/>}></Route>
    <Route path='/criarAluno' element={<CriarAlunos/>}></Route>
    <Route path="/alunos/:id/treino" element={<CriarTreino/>}></Route>
    </Routes>
  )
}

export default App
