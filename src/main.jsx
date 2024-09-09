import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Board from './board.jsx'
import Inpout from './inputoutput.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Board />
    <Inpout />
  </StrictMode>,
)
