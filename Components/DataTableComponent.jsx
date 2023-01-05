import React from "react";
import DataTable from "react-data-table-component";

const DataTableComponent = () => {

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
    ];

    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 3,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 4,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 5,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 6,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 7,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 8,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 9,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 10,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 11,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 12,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

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