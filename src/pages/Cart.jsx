import { CartContext } from '../context/CartContext';
import { useContext, useState } from 'react';
import { CartItems } from '../components/CartItems/CartItems';
import { CartInfo } from '../components/CartInfo/CartInfo';
import { CartCheckout } from '../components/CartCheckout/CartCheckout';
import { ModalSuccessBuy } from '../components/ModalSuccessBuy/ModalSuccessBuy';
import Loader from '../components/Loader/Loader'; 
import { createOrder } from '../services/products';

function Cart() {
  const { cart, totalQuantity, clearCart } = useContext(CartContext);
  
  const [step, setStep] = useState("cart"); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); 
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState(() => {
    const tieneCuotas = cart.some(item => item.cuotasSeleccionadas > 1);
    return {
      nombre: "", 
      apellido: "", 
      email: "", 
      telefono: "", 
      dni: "",
      direccion: "", 
      codigoPostal: "", 
      metodoPago: tieneCuotas ? "tarjeta" : "transferencia", 
      tarjetaNumero: "", 
      tarjetaVence: "", 
      tarjetaCcv: ""
    };
  });

  const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  if (isProcessing) {
    return (
      <div className="loading-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <Loader />
      </div>
    );
  }

  const MONTO_ENVIO_GRATIS = 3000000;
  const COSTO_ENVIO_BASE = 15000;

  const subtotal = cart.reduce((acc, prod) => acc + (prod.precioLista * prod.quantity), 0);
  const esEnvioGratis = subtotal >= MONTO_ENVIO_GRATIS;
  const costoEnvio = esEnvioGratis ? 0 : COSTO_ENVIO_BASE;
  const totalFinal = subtotal + costoEnvio;
  
  const cuantoFaltaParaGratis = MONTO_ENVIO_GRATIS - subtotal;


  const handleNextStep = async () => {
    if (step === "cart") {
      setStep("checkout");
    } else if (step === "checkout") {
      const formulario = document.getElementById("form-checkout-orden");

      if (formulario) {
        if (!formulario.checkValidity()) {
          formulario.reportValidity();
          return;
        }
      }

      setIsProcessing(true); 
      console.log("¡Enviando datos reales a Firestore!");


      const resultado = await createOrder(formData, cart, totalFinal);

      setIsProcessing(false); 

      if (resultado.success) {
        setOrderId(resultado.orderId);
        setIsModalOpen(true);   
      } else {
        alert(resultado.message); 
      }
    }
  };

  const handleBackStep = () => {
    if (step === "checkout") {
      setStep("cart");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStep("cart");
    setOrderId("");
    

    setFormData({
      nombre: "", apellido: "", email: "", telefono: "", dni: "",
      direccion: "", codigoPostal: "", metodoPago: "transferencia",
      tarjetaNumero: "", tarjetaVence: "", tarjetaCcv: ""
    });

    if (typeof clearCart === "function") {
      clearCart();
    }
  };

  return (
    <div className="pagina-carrito">
      
      {cart.length === 0 ? (
        <h2 className="carrito-vacio">El carrito está vacío</h2>
      ) : (
        <>
          {step === "cart" ? (
            <CartItems cart={cart} />
          ) : (
            <CartCheckout formData={formData} setFormData={setFormData} cartItems={cart} />
          )}

          <CartInfo 
            totalQuantity={totalQuantity}
            subtotal={subtotal}
            costoEnvio={costoEnvio}
            totalFinal={totalFinal}
            formateadorPrecio={formateadorPrecio}
            step={step}
            onNextStep={handleNextStep}
            onBackStep={handleBackStep} 
            esEnvioGratis={esEnvioGratis}
            cuantoFaltaParaGratis={cuantoFaltaParaGratis}
            costoEnvioBase={COSTO_ENVIO_BASE}
            cartItems={cart}
            metodoPagoSeleccionado={formData.metodoPago}
          />
        </>
      )}

      <ModalSuccessBuy 
        isOpen={isModalOpen}
        orderId={orderId}
        formData={formData}
        totalFinal={totalFinal}
        formateadorPrecio={formateadorPrecio}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Cart;