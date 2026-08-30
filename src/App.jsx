import ListaAlunos from './pages/ListaAlunos'
import { Routes, Route } from 'react-router-dom'
import EditarAlunos from './pages/EditarAlunos'
import CriarAlunos from './pages/CriarAlunos'
import CriarTreino from './pages/CriarTreino'
import ListarTreino from './pages/ListaTreino'
import CriarExercicio from './pages/CriarExercicio'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/alunos' element={<ListaAlunos />}></Route>
      <Route path='/editar/:id' element={<EditarAlunos />}></Route>
      <Route path='/criarAluno' element={<CriarAlunos />}></Route>
      <Route path="/alunos/:id/treino" element={<CriarTreino />}></Route>
      <Route path="/alunos/:id/treinos" element={<ListarTreino />}></Route>
      <Route path="/criarExercicio" element={<CriarExercicio />}></Route>
    </Routes>
  )
}

export default App