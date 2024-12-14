import ColumnForm from "../../helpers/ColumnForm";
import Notes from "../Notes";
function FastoOrder() {
    return (
        <div className="row justify-content-center">
            <h1>Notas</h1>
            <ColumnForm md={9}>
               <Notes titulo={"Pedido Infantes"}>
                    Este es un pedido de los infante
               </Notes>
            </ColumnForm>
            
        </div>
    );
}

export default FastoOrder;