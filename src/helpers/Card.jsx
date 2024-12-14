function Card({ producto, index }) {
    return (<>
        <div className="card" >
            <div className="card-body">
                <h4 className="card-title">{producto.nombre}</h4>
                <p className="card-text">{producto.descripcion}</p>
                <div>
                    <div id={"carouselFade" + index} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="1000000">
                                <img loading="lazy" height={150} src="https://images.ecestaticos.com/h34TvzTFVdrau9Un4Wdmwhed_e4=/0x115:2265x1390/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F8ec%2F08c%2F85c%2F8ec08c85c866ccb70c4f1c36492d890f.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div loading="lazy" className="carousel-item" data-bs-interval="1000000">
                                <img height={150} src="https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div loading="lazy" className="carousel-item" data-bs-interval="1000000">
                                <img height={150} src="https://fotografias.larazon.es/clipping/cmsimages02/2020/11/06/91888410-EE48-43F9-8645-E4680B2C06A3/98.jpg?crop=2851,1604,x0,y216&width=1900&height=1069&optimize=low&format=webply" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={"#carouselFade" + index} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={"#carouselFade" + index} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="text-start mt-2">
                    <label className="text-start">Colores</label>
                </div>
                <select className="form-select" aria-label="Default select example">
                    <option selected defaultValue={""}>Selecciona color</option>
                    {producto.colores.map((color, index) => {
                        return (<><option value={index}>{color}</option></>)
                    })}
                </select>
                <div className="text-start mt-2">
                    <label className="text-start">Tamaños</label>
                </div>

                <select className="form-select" aria-label="Default select example">
                    <option selected>Selecciona tamaño</option>
                    {producto.tamaños.map((tamaño, index) => {
                        return (<><option key={index} value={index}>{tamaño}</option></>)
                    })}
                </select>

            </div>
        </div>
    </>);
}

export default Card;