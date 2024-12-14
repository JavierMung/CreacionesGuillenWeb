function Input({ placeholder, type, value, pattern, required = false, readonly = false }) {
    return (
        <input type={type} placeholder={placeholder} readOnly={readonly} value={value} required={required} pattern={pattern} />
    );
}

export default Input;