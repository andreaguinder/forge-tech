import { productos } from '../data/productos.json'

const success = true

const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});


export const getProducts = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (success) {


                const productosFormateados = productos.map((prod) => {

                    const rutaLimpia =
                        prod.imagenes && prod.imagenes.length > 0 ?
                        prod.imagenes[0].replace("../assets/", "/src/assets/") :
                        "";


                    return {
                        ...prod,
                        imagenFormateada: rutaLimpia,
                        precioListaFormateado: formateadorPrecio.format(prod.precioLista),

                        precioCuotaFormateado: prod.cuotas ?
                            formateadorPrecio.format(prod.cuotas.precioPorCuota) :
                            "",
                        precioSinImpuestosFormateado: formateadorPrecio.format(
                            prod.precioSinImpuestos,
                        ),
                    };
                });

                resolve({
                    success,
                    data: productosFormateados,
                })

            } else {
                reject({
                    success: false,
                    message: "No se pudieron obtener los productos"
                })
            }
        }, 3000)

    })

}