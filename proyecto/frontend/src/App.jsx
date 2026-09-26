import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Juego from './components/juegos';
import Productos from './components/Productos';
import Ventas from './components/Ventas';

function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1>Bienvenido a Tienda de Juegos</h1>
      <p className="lead">Sistema de gestión de jugadores, juegos y ventas</p>
      <p>Usa el menú superior para navegar entre las secciones.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Juego />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;