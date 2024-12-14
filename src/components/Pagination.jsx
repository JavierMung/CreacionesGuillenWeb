import React, { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Estado local para el número de página actual
  const [page, setPage] = useState(currentPage);

  // Función para manejar el cambio de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      onPageChange(newPage);
    }
  };

  // Actualizar la página cuando cambie la página actual desde fuera del componente
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  // Generar las opciones de paginación
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
      </li>
    );
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(page - 1)}>Previa</button>
        </li>
        {pages}
        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(page + 1)}>Siguiente</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
