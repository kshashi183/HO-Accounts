import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { baseURL } from '../../../../../api/baseUrl';

export default function UnitOutStanding() {

    const [unitOutstandingData, setUnitOutstandingData] = useState([])

    useEffect(() => {
        getDataSubmit();
    }, []);

    const getDataSubmit = () => {

        axios.get(baseURL+'/customerOutstanding/unitOutstandingData',

        )
            .then((res) => {
                // console.log("unitoutstanding",res.data.Result);
                setUnitOutstandingData(res.data.Result)
            })
    }
    return (
        <div className='col-md-12'>
            <div className='mt-3 col-md-12'>
                <div style={{ height: "250px", overflowY: "scroll", overflowX: 'scroll' }}>
                    <Table className='table-data border'  striped>
                        <thead className='tableHeaderBGColor' >
                            <tr>
                                <th>UnitName</th>
                                <th>Cust_Code</th>
                                <th>Cust_Name</th>
                                <th>Branch</th>
                                <th>Out_Standing_Amount</th>
                                <th>InvoiceCount</th>
                            </tr>
                        </thead>


                        <tbody className='tablebody'>
                            {
                                unitOutstandingData.map((item, i) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.UnitName}</td>
                                                <td>{item.Cust_Code}</td>
                                                <td>{item.Cust_name}</td>
                                                <td>{item.Branch}</td>
                                                <td>{item.OutStandingAmount}</td>
                                                <td>{item.OutStandingInvoiceCount}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
