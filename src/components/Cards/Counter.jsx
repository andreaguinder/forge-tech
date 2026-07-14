import { Button } from "../Button";
// Ya no necesitamos importar 'useState' ni la data harcodeada acá

export const Counter = ({ minValue = 1, stock = 1, value, onChange }) => {

  const sumar = () => {
    // Si ya llegamos al límite del stock, no hace nada
    if (value >= stock) return;
    onChange(value + 1); // Avisamos al componente padre que sume uno
  };

  const restar = () => {
    if (value <= minValue) return;
    onChange(value - 1); // Avisamos al componente padre que reste uno
  };

  return (
    <div className="contador">
      <Button className="btn-mas-menos" onClick={restar} disabled={value <= minValue}>
        - 
      </Button>
      
      {/* Mostramos el valor controlado por el padre */}
      <span>{ value }</span>
      
      <Button className="btn-mas-menos" onClick={sumar} disabled={value >= stock}>
        + 
      </Button>
    </div>
  );
};