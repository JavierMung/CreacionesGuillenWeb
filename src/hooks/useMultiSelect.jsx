import { useState } from 'react';

// Hook personalizado para manejar selecciones múltiples en selects
const useMultiSelect = (setFiltros) => {
    // Estado para las opciones seleccionadas
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Función de cambio para las opciones seleccionadas
    const handleChangeMulti = (selected) => {
        setSelectedOptions(selected);

        // Extraer solo los valores de las opciones seleccionadas
        const selectedValues = selected.map(option => option.value);

        // Devolver los valores seleccionados
        return selectedValues;
    };

    // Función para actualizar el estado filtros
    const updateFiltros = (identificador, selectedValues) => {
        // Actualizar el estado con los valores seleccionados
        setFiltros(prevState => ({
            ...prevState,
            [identificador]: selectedValues
        }));
    };

    // Devolver el estado y la función de cambio, y la función para actualizar los filtros
    return { selectedOptions, handleChangeMulti, updateFiltros };
};

export default useMultiSelect;
