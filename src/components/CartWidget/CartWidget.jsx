import React, { useContext } from 'react';
import { Button } from '../Button'; 
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

export function CartWidget() {

  const contextValue = useContext(CartContext);


  const totalQuantity = contextValue?.totalQuantity || 0;


return (
    <Button 
      onClick={() => console.log("Abriendo carrito...")}
      className="cartButton" 
    >
      <ShoppingCart size={24} fill="currentColor"/>
      
      {totalQuantity > 0 && (
        <span className="badge"> 
          {totalQuantity > 99 ? '99+' : totalQuantity}
        </span>
      )}
    </Button>
  );
}