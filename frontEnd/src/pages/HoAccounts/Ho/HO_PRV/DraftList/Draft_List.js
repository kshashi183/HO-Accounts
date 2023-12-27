
import React from 'react'
import { Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


export default function Draft_List() {
    const navigate=useNavigate();
    return (
        <>
     
            <div className="row col-md-12 "   >

                <label className="form-label">Magod Laser :HO Receipt Voucher List</label>


                <div className='col-md-3'>
                    <button className="button-style  group-button "
                        style={{ width: "150px" }}
                    //   onClick={openVoucherButton}
                    >
                        Open Voucher
                    </button>
                </div>


                <div className='col-md-2'>
                    <button className="button-style  group-button "
                        style={{ width: "100px" }} onClick={e => navigate("/HOAccounts")} >
                        Close
                    </button>
                </div>

            </div>



            <hr className="horizontal-line mt-2" />
            <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '350px', }}>
                <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor">
                        <tr>
                            <th>HO Ref</th>
                            <th>Date</th>

                            <th>Unitname</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Status</th>

                        </tr>
                    </thead>

                    <tbody className='tablebody'>
                        <td></td>

                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                    </tbody>
                </Table>

            </div >
        </>
    )
}