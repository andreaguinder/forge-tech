import { Button } from "../Button";


export const ItemCount = ({ minValue = 1, stock = 1, value, onChange }) => {

  const sumar = () => {

    if (value >= stock) return;
    onChange(value + 1);
  };

  const restar = () => {
    if (value <= minValue) return;
    onChange(value - 1);
  };

  return (
    <div className="contador">
      <Button className="btn-mas-menos" onClick={restar} disabled={value <= minValue}>
        -
      </Button>


      <span> {value} </span>

      <Button className="btn-mas-menos" onClick={sumar} disabled={value >= stock}>
        +
      </Button>
    </div>
  );
};