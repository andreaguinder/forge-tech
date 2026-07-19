
const Loader = ({ className = "" }) => {

  return (

          <div className={`waveLoader ${className}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
  );
};

export default Loader;