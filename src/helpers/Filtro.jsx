import Select from 'react-select';
import ColumnForm from "./ColumnForm";

function Filtro({ nombre, identificador, value, handleChange, size = 3, type = "search", options = null, selectedOptions = null, handleChangeMulti = null }) {

    const renderInput = () => {
        switch (type) {
            case "search":
                return <input onChange={handleChange} value={value} name={identificador} className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" />;
            case "date":
                return <input onChange={handleChange} value={value} name={identificador} className="form-control me-2" type="date" placeholder="Buscar..." aria-label="Search" />;
            case "number":
                return <input onChange={handleChange} value={value} name={identificador} className="form-control me-2" type="number" placeholder="Buscar..." aria-label="Search" />;
            case "selectMultiple":
                return <>
                    <Select
                        isMulti
                        options={options}
                        value={selectedOptions}
                        onChange={handleChangeMulti}
                    />
                </>

            case "select":
                return <select
                    value={value || ""} // Seleccionar el primer elemento del arreglo (si existe)
                    name="status"
                    className="form-control me-2"
                    onChange={handleChange}
                >
                    {selectedOptions}
                </select>
            // Agrega más casos según los tipos de entrada que necesites
            default:
                return null;
        }
    };

    return (
        <ColumnForm md={size}>
            <div className="box" style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px" }}>
                <label className="form-label">{nombre}</label>
                {renderInput()}
            </div>
        </ColumnForm>
    );
}

export default Filtro;