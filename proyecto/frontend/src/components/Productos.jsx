import { useEffect, useState } from 'react';
import api from '../services/api';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    nomProducto: '',
    cantidad: '',
    precio: ''
  });
  const [editando, setEditando] = useState(null);

  const cargar = () => {
    api.get('/productos')
      .then(res => {
        setProductos(res.data);
        setCargando(false);
      })
      .catch(() => {
        setError('No se pudo cargar la lista de juegos');
        setCargando(false);
      });
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editando) {
      api.put(`/productos/${editando}`, form)
        .then(() => {
          setEditando(null);
          setForm({ nomProducto: '', cantidad: '', precio: '' });
          cargar();
        })
        .catch(() => alert('Error al modificar'));
    } else {
      api.post('/productos', form)
        .then(() => {
          setForm({ nomProducto: '', cantidad: '', precio: '' });
          cargar();
        })
        .catch(() => alert('Error al añadir'));
    }
  };

  const handleEditar = (p) => {
    setEditando(p.id_producto);
    setForm({
      nomProducto: p.nomProducto,
      cantidad: p.cantidad,
      precio: p.precio
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este juego?')) {
      api.delete(`/productos/${id}`)
        .then(() => cargar())
        .catch(() => alert('Error al eliminar'));
    }
  };

  if (cargando) return <p>Cargando juegos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Listado de Juegos</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
        <h5>{editando ? 'Modificar Juego' : 'Añadir Juego'}</h5>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              name="nomProducto"
              className="form-control"
              placeholder="Nombre del juego"
              value={form.nomProducto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="cantidad"
              className="form-control"
              placeholder="Cantidad"
              value={form.cantidad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="precio"
              className="form-control"
              placeholder="Precio"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
              {editando ? 'Guardar' : 'Añadir'}
            </button>
          </div>
        </div>
        {editando && (
          <button
            type="button"
            className="btn btn-secondary btn-sm mt-2"
            onClick={() => {
              setEditando(null);
              setForm({ nomProducto: '', cantidad: '', precio: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre del Juego</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              <td>{p.nomProducto}</td>
              <td>{p.cantidad}</td>
              <td>${Number(p.precio).toLocaleString('es-CO')}</td>
              <td>
                <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditar(p)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(p.id_producto)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;