import ListaAlunos from './pages/ListaAlunos'
import { Routes, Route } from 'react-router-dom'
import EditarAlunos from './pages/EditarAlunos'

function App() {
  
  return (
    <Routes>
    <Route path='/' element={<ListaAlunos/>}></Route>
    <Route path='/editar/:id' element={<EditarAlunos/>}></Route>
    </Routes>
  )
}

export default App
