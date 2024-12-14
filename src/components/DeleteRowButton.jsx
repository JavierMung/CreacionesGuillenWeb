function DeleteRowButton({ deleteRow }) {
    return (
        <button className="btn" onClick={deleteRow}>
            <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 512 512">
                <path fill="#c82828" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
            </svg>
        </button>
    );
}

export default DeleteRowButton;
