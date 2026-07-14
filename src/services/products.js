import { productos } from '../data/productos.json';

const success = true;

const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success && Array.isArray(productos)) {
                
                const productosFormateados = productos.map((prod) => {
                    // Aseguramos que la ruta de la imagen sea válida
                    const rutaLimpia = (prod.imagenes && prod.imagenes.length > 0) 
                        ? prod.imagenes[0].replace("../assets/", "/src/assets/") 
                        : "";

                    return {
                        // Mantenemos el ID original, asegurándonos de que exista
                        id: prod.id, 
                        ...prod,
                        // Propiedades calculadas
                        imagenFormateada: rutaLimpia,
                        precioListaFormateado: formateadorPrecio.format(prod.precioLista || 0),
                        precioCuotaFormateado: (prod.cuotas && prod.cuotas.precioPorCuota) 
                            ? formateadorPrecio.format(prod.cuotas.precioPorCuota) 
                            : "",
                        precioSinImpuestosFormateado: formateadorPrecio.format(prod.precioSinImpuestos || 0),
                    };
                });

                resolve({
                    success: true,
                    data: productosFormateados,
                });

            } else {
                reject({
                    success: false,
                    message: "No se pudieron obtener los productos o el formato es incorrecto"
                });
            }
        }, 500); // Bajé el tiempo a 500ms para que sea más ágil
    });
};