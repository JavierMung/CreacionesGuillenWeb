function Input({
    placeholder,
    type = "text",
    value,
    pattern,
    required = false,
    readonly = false,
  }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        readOnly={readonly}
        value={value}
        required={required}
        pattern={pattern}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    );
  }
  
  export default Input;
  