import { encargados } from './Data';
import DataList from './DataList';
const Formulario = ({ id, producto, active, formData, handleChange, handleRemove, showRemoveButton }) => {



    return (
        <>
            <div className="form-check">
                <div className="row">
                    <div className="col-md-3">
                        <DataList menu={'Tamaño'} id={id} nombre={producto.nombre} producto={producto.tamaños} handleChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                        <DataList menu={'Color'} id={id} nombre={producto.nombre} producto={producto.colores} handleChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                        <div className="text-start">
                            <label className="form-label">Cantidad</label>
                            <input name={'cantidad'} onChange={(e) => handleChange(id, e)} className="form-control" placeholder="Ejem. 300" type={"number"} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-start">
                            <label className='form-label'>Encargado</label>
                            <select name={'encargado'} onChange={(e) => handleChange(id, e)} className="form-select" aria-label="Default select example" disabled={!active}>
                                <option selected>Seleccionar encargado</option>
                                {encargados.map((encargado, index) => {
                                    return (<>
                                        <option value={encargado.nombre}>{encargado.nombre}</option>
                                    </>)
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="formulario">
                    {/* Agrega más campos aquí */}
                    {showRemoveButton && <button style={{ background: "transparent", border: "none" }} className='text-danger' onClick={() => handleRemove(id)}>Eliminar producto</button>}
                </div>
                <hr className="dropdown-divider" />
            </div>
        </>
    );
};

export default Formulario;
