import React from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = ({columns,data}) => {

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                pagination
                selectableRows
            />
        </>
    )
}

export default DataTableComponent