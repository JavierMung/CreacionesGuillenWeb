const options = { day: '2-digit', month: 'long', year: 'numeric' }

const formatterDolar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

const formatterDate = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', options)
}

export { formatterDate, formatterDolar }
