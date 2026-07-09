import { useState, useEffect } from "react";
import { getProducts } from "../services/products";

export const useProducts = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((rta) => {
        if (rta.success) {
          setProductos(rta.data);
        } else {
          setError("Error al cargar productos");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  return { productos, cargando, error };
};