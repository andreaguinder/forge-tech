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

                    const rutaLimpia = (prod.imagenes && prod.imagenes.length > 0) 
                        ? prod.imagenes[0].replace("../assets/", "/src/assets/") 
                        : "";

                    return {

                        id: prod.id, 
                        ...prod,

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
        }, 500); 
    });
};