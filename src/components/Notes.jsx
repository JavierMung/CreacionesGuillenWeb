import '../styles/Notes.css'
import { MdClose } from 'react-icons/md';

function Notes({ titulo, children }) {
    return (

        <div className="note">
            <div className="note-header">
                <h3 className="note-title">{titulo}</h3>
                <button className="delete-button" >
                    <MdClose />
                </button>
            </div>
            <p className="note-content">
                {children}
            </p>
        </div>
    );
}

export default Notes;