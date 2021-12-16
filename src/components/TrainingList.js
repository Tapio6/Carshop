import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function TrainingList() {

    const [training, setTraining] = useState([]);

    useEffect(() => {
        fetchTraining();
    }, [])

    const fetchTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTraining(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = url => {
        if (window.confirm('Are you sure?')) {
       fetch(url, { method: 'DELETE' })
       .then(response => {
        if (response.ok) {
            fetchTraining();
           
        }
         else
         alert('Poisto ei onnistunut')
       })
       .catch(err => console.error(err))
    }
}


    const columns = [
        {field: 'date', sortable: true, filter: true, valueFormatter: (params) => {return dayjs(params.value).format('DD.MM.YYYY hh:mm')}},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {
            headerName: "Customer",
            cellRendererFramework: params => params.data.customer.firstname + " " + params.data.customer.lastname
        },
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            field: 'links.0.href',
            cellRendererFramework: params =>
            <Button
                size="small" color="error" onClick={() => deleteTraining("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)}
                >Delete
            </Button>
        }
    ]

    return(
    <React.Fragment>
        <div className="ag-theme-material" style={{height: 700, width: '80%', margin: 'auto'}}>
        <br></br>
        <AgGridReact
                rowData={training}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={12}
            />
        </div>
    </React.Fragment>
    )

}

export default TrainingList;