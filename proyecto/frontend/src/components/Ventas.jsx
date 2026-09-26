// Componente Ventas
import { useEffect, useState } from 'react';
import api from '../services/api';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/ventas')
      .then(response => {
        setVentas(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar la lista de ventas');
        setCargando(false);
        console.error(err);
      });
  }, []);

  if (cargando) return <p>Cargando ventas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Listado de Ventas</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Contacto</th>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id_venta}>
              <td>{v.id_venta}</td>
              <td>{v.fecha_venta ? new Date(v.fecha_venta).toLocaleDateString('es-CO') : ''}</td>
              <td>{v.nomCliente}</td>
              <td>{v.contacto}</td>
              <td>{v.departamento}</td>
              <td>{v.ciudad}</td>
              <td>${Number(v.total).toLocaleString('es-CO')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ventas;