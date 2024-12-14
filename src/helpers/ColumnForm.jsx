import  Titulo  from "./Titulo.jsx"
function ColumnForm({ children, titulo, lg, md, sm, text="start", margin = "mt-2" }) {
    return (
        <div className={`text-${text} col-lg-${lg} col-md-${md} col-sm-${sm} ${margin} align-self-center`}  >
            {titulo && <Titulo Titulo={titulo} />}
            {children}

        </div>
    );
}

export default ColumnForm;