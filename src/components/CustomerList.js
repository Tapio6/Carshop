import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import { AgGridReact, AgGridColumn } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import EditCustomer from "./EditCustomer";
import { CSVLink } from "react-csv";

function CustomerList() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, [])

    //LIST ALL CUSTOMERS
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    //DELETE CUSTOMER
    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                fetchCustomers();
            } else {
                alert('Something is wrong');
            }
        })
        .catch(err => console.error(err))
        }
    }

    //ADD NEW CUSTOMER
    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {

            } else {
                alert('Something went wrong')
            }
        })
        .catch(err => console.error(err))
    }

    //EDIT CUSTOMER
    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(_ => {
            fetchCustomers();
            
        })
        .catch(err => console.error(err))
    }
    

    //ADD TRAINING TO CUSTOMER
    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok) {

            } else {
                alert('Something is wrong')
            }
        })
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'firstname', sortable: true, filter: true, width: 150},
        {field: 'lastname', sortable: true, filter: true, width: 150},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: 150},
        {field: 'city', sortable: true, filter: true, width: 150},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            width: 150,
            cellRendererFramework: params => <AddTraining addTraining={addTraining} customer={params.data} />
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 120,
            cellRendererFramework: params =>
            <Button variant="outlined" size="small" color="error" onClick={() => deleteCustomer(params.value)}
            >Delete
            </Button>
        },
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            field: 'links.0.href',
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params} />
        },
    ]

    /*EXPORT CSV FILE
    
    const csvReport = {
        data: columns,
        headers: columns,
        filename: 'Customers.csv'
      };
*/

    return(
    <React.Fragment>
        <AddCustomer addCustomer={addCustomer} />
        <div className="ag-theme-material" style={{height: 700, width: '90%', margin: 'centre'}}>
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={12}
                
                
            />
        </div>
    </React.Fragment>
    );
}

export default CustomerList;