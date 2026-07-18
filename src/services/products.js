import { db } from '../firebase/firebaseConfig'; // Asegurate de que la ruta a tu config de Firebase sea la correcta
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; // <-- Sumamos addDoc y serverTimestamp acá

const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

export const getProducts = async () => {
    try {
        // 1. Apuntamos a la colección 'productos' en Firestore
        const productosCol = collection(db, 'productos');
        
        // 2. Traemos todos los documentos de la nube
        const productosSnapshot = await getDocs(productosCol);
        
        // 3. Mapeamos los datos de Firebase y les aplicamos tus formateadores
        const productosFormateados = productosSnapshot.docs.map((doc) => {
            const prod = doc.data(); // Acá está el objeto del producto

            const rutaLimpia = (prod.imagenes && prod.imagenes.length > 0) 
                ? prod.imagenes[0].replace("../assets/", "/src/assets/") 
                : "";

            return {
                id: doc.id, // Conservamos el ID único de tu documento (PROD-001, etc.)
                ...prod,
                imagenFormateada: rutaLimpia,
                precioListaFormateado: formateadorPrecio.format(prod.precioLista || 0),
                precioCuotaFormateado: (prod.cuotas && prod.cuotas.precioPorCuota) 
                    ? formateadorPrecio.format(prod.cuotas.precioPorCuota) 
                    : "",
                precioSinImpuestosFormateado: formateadorPrecio.format(prod.precioSinImpuestos || 0),
            };
        });

        // 4. Retornamos la respuesta con la misma estructura que esperaba tu Hook
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

// ==========================================
// NUEVA FUNCIÓN: No altera nada de lo anterior
// ==========================================
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
            date: serverTimestamp(), // Fecha oficial del servidor de Firebase
            status: 'generada'
        };

        const ordersCollection = collection(db, 'orders');
        const docRef = await addDoc(ordersCollection, order);
        
        return {
            success: true,
            orderId: docRef.id // ID único generado por Firebase para la orden
        };
    } catch (error) {
        console.error("Error al crear la orden en Firestore:", error);
        return {
            success: false,
            message: "No se pudo procesar la compra de la orden."
        };
    }
};