
import React from "react";

// Usamos ...props para agarrar CUALQUIER otra propiedad nativa (disabled, id, aria-*, etc.)
export const Button = ({ children, className, onClick, type = "button", ...props }) => {
  return (
    <button 
      className={className} 
      onClick={onClick} 
      type={type} 
      {...props} // Las inyectamos acá automáticamente
    >
      {children}
    </button>
  );
};









/*import React from "react";

export const Button = ({children, className, onClick, role = "button", type="button" }) => {

    return (
        <button className={className} onClick={onClick} type={type} role={role}>
            {children}
        </button>
    )

}*/

