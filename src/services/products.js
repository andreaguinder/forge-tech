import { db } from '../firebase/firebaseConfig'; 
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; 

const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

export const getProducts = async () => {
    try {

        const productosCol = collection(db, 'productos');
        

        const productosSnapshot = await getDocs(productosCol);
        

        const productosFormateados = productosSnapshot.docs.map((doc) => {
            const prod = doc.data(); 

            const rutaLimpia = (prod.imagenes && prod.imagenes.length > 0) 
                ? prod.imagenes[0].replace("../assets/", "/src/assets/") 
                : "";

            return {
                id: doc.id, 
                ...prod,
                imagenFormateada: rutaLimpia,
                precioListaFormateado: formateadorPrecio.format(prod.precioLista || 0),
                precioCuotaFormateado: (prod.cuotas && prod.cuotas.precioPorCuota) 
                    ? formateadorPrecio.format(prod.cuotas.precioPorCuota) 
                    : "",
                precioSinImpuestosFormateado: formateadorPrecio.format(prod.precioSinImpuestos || 0),
            };
        });


        return {
            success: true,
            data: productosFormateados,
        };

    } catch (error) {
        console.error("Error al traer productos de Firestore:", error);
        return {
            success: false,
            message: "No se pudieron obtener los productos de la base de datos."
        };
    }
};


export const createOrder = async (buyerData, cartItems, totalAmount) => {
    try {
        const order = {
            buyer: {
                nombre: buyerData.nombre,
                apellido: buyerData.apellido,
                email: buyerData.email,
                telefono: buyerData.telefono,
                dni: buyerData.dni,
                direccion: buyerData.direccion,
                codigoPostal: buyerData.codigoPostal,
                metodoPago: buyerData.metodoPago
            },
            items: cartItems.map(item => ({
                id: item.id,
                nombre: item.nombre,
                precio: item.precioLista || 0,
                cantidad: item.quantity || 1,
                cuotas: item.cuotasSeleccionadas || 1
            })),
            total: totalAmount,
            date: serverTimestamp(), 
            status: 'generada'
        };

        const ordersCollection = collection(db, 'orders');
        const docRef = await addDoc(ordersCollection, order);
        
        return {
            success: true,
            orderId: docRef.id 
        };
    } catch (error) {
        console.error("Error al crear la orden en Firestore:", error);
        return {
            success: false,
            message: "No se pudo procesar la compra de la orden."
        };
    }
};