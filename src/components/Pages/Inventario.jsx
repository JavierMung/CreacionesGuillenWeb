import Card from "../../helpers/Card";
import ColumnForm from "../../helpers/ColumnForm";
import { productos } from "../../helpers/Data";
import LazyLoad from 'react-lazy-load';
function Inventario() {
    return (
        <>
            <div className="row justify-content-center text-center">
                <h1>Inventario</h1>
                <div className="col-lg-8 col-md-9">
                    <div className="row justify-content-center text-center">

                        {productos.map((producto, index) => {
                            return (
                                <>
                                    <ColumnForm lg={4} md={6}>
                                        <LazyLoad className="m-1" offset={700} >
                                            <Card producto={producto} index={index} />
                                        </LazyLoad>
                                    </ColumnForm>
                                </>
                            )
                        })}

                        </div>
                    </div>

            </div>
        </>);
}

export default Inventario;