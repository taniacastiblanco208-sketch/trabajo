import { useEffect, useState } from 'react';
import api from '../services/api';

function Juego() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    nomCliente: '',
    contacto: '',
    departamento: '',
    ciudad: ''
  });
  const [editando, setEditando] = useState(null);

  const cargar = () => {
    api.get('/clientes')
      .then(res => {
        setClientes(res.data);
        setCargando(false);
      })
      .catch(() => {
        setError('No se pudo cargar la lista de jugadores');
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
      api.put(`/clientes/${editando}`, form)
        .then(() => {
          setEditando(null);
          setForm({ nomCliente: '', contacto: '', departamento: '', ciudad: '' });
          cargar();
        })
        .catch(() => alert('Error al modificar'));
    } else {
      api.post('/clientes', form)
        .then(() => {
          setForm({ nomCliente: '', contacto: '', departamento: '', ciudad: '' });
          cargar();
        })
        .catch(() => alert('Error al añadir'));
    }
  };

  const handleEditar = (c) => {
    setEditando(c.id_cliente);
    setForm({
      nomCliente: c.nomCliente,
      contacto: c.contacto,
      departamento: c.departamento,
      ciudad: c.ciudad
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este jugador?')) {
      api.delete(`/clientes/${id}`)
        .then(() => cargar())
        .catch(() => alert('Error al eliminar'));
    }
  };

  if (cargando) return <p>Cargando jugadores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Listado de Jugadores</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
        <h5>{editando ? 'Modificar Jugador' : 'Añadir Jugador'}</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              name="nomCliente"
              className="form-control"
              placeholder="Nombre"
              value={form.nomCliente}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="contacto"
              className="form-control"
              placeholder="Contacto"
              value={form.contacto}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="departamento"
              className="form-control"
              placeholder="Departamento"
              value={form.departamento}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="ciudad"
              className="form-control"
              placeholder="Ciudad"
              value={form.ciudad}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
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
              setForm({ nomCliente: '', contacto: '', departamento: '', ciudad: '' });
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
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.id_cliente}>
              <td>{c.id_cliente}</td>
              <td>{c.nomCliente}</td>
              <td>{c.contacto}</td>
              <td>{c.departamento}</td>
              <td>{c.ciudad}</td>
              <td>
                <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditar(c)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(c.id_cliente)}>
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

export default Juego;