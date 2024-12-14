function DataList({ id, producto, handleChange, nombre, menu }) {
    return (
        <div className="text-start">
            <label htmlFor={"dataListColor" + nombre} className="form-label">{menu}</label>
            <input name={menu} onChange={(e) => handleChange(id, e)} className="form-control" list="datalistOptionsColores" id={"dataListColor" + nombre} placeholder="Ejem. Azul marino" />
            <datalist id="datalistOptionsColores">
                {producto.map((valor, index) => {

                    return (<>
                        <option value={valor} >{valor}</option>
                    </>)
                })}
            </datalist>
        </div>);
}

export default DataList;