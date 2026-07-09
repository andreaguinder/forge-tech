
import { useState } from "react";
import { Button } from "../Button"
import { productos } from '../../data/productos.json'

export const Counter = ({ minValue = 0, stock = 1 }) => {

    const [value, setValue] = useState(minValue)

    const sumar = () => {
        if(value >= stock) return
        setValue(value + 1)
    }

    const restar = () => {
        if(value <= minValue) return
        setValue(value - 1)
    }

    return (

        <div className="contador">
            <Button className="btn-mas-menos" onClick={restar}>
                - 
            </Button>
            { value }
            <Button className="btn-mas-menos" onClick={sumar}>
                + 
            </Button>
        </div>

    )

}