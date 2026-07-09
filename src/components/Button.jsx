import React from "react";

export const Button = ({children, className, onClick, role = "button", type="button" }) => {

    return (
        <button className={className} onClick={onClick} type={type} role={role}>
            {children}
        </button>
    )

}

