
import React from "react";


export const Button = ({ children, className, onClick, type = "button", ...props }) => {
  return (
    <button 
      className={className} 
      onClick={onClick} 
      type={type} 
      {...props}
    >
      {children}
    </button>
  );
};



