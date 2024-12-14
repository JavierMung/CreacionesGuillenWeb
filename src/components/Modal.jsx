
function Modal({ Titulo,  id="" , children, IsStatic = false}) {

    return (
        <div className="modal fade" id={`exampleModal${id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${id}`} aria-hidden="true" data-bs-backdrop={IsStatic?"static":"n"} data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`exampleModalLabel${id}`}>{Titulo}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;