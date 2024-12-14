import '../styles/ModalStyle.css'; 
function ModalAlert() {
    return (<>
        <div className="modal fade" id="tuModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="tuModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="tuModalLabel">Título del Modal</h5>
                        <button type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Contenido del Modal
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" >Cerrar</button>
                        <button type="button" className="btn btn-primary">Entendido</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ModalAlert;