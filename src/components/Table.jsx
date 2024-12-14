function Table({ data, columns, isEditable, deleteRow, addRow }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th>
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead >
                <tbody>
                    {
                        data.map((data) => (
                            <tr>
                                {data.map((data) => (
                                    <td>
                                        {data}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}

export default Table;