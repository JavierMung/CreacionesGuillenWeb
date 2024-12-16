function Select({
    options = [],
    value,
    placeholder = "Seleccione una opción",
    required = false,
    readonly = false,
    onChange,
  }) {
    return (
      <select
        value={value}
        onChange={onChange}
        disabled={readonly}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  
  export default Select;
  