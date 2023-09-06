import React from 'react';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function OpenVoucher() {

const navigate=useNavigate();

    return (
        <div>
            <div className='col-md-12'>
                <div className='row'>
                    <h4 className='title '>Receipt Voucher List </h4>
                </div>
            </div>


            <div className='row mt-1'>
                <div className='col-md-3 mt-2'>
                   
                    <label className="form-label" style={{whiteSpace:'nowrap'}}>Payment Receipt Vouchers</label>
                </div>
              

                <div className="col-md-2">
                    <label className="form-label">Search</label>
                    <input type='search'></input>
                </div>

                <div className="col-md-3">
                 <button className="button-style mt-2 group-button"
                        style={{ width: "150px", marginLeft: "20px" }}  onClick={()=>navigate("/HOAccounts/HO/Openvoucher")}>
                        Open Voucher
                    </button> 
                </div>

                <div className="col-md-3">
                 <button className="button-style mt-2 group-button"
                          onClick={()=>navigate("/home")}>
                        Close
                    </button> 
                </div>
                

            </div>


         <div className='row'>
            <div className='col-md-2'>
                    <label className="form-label">Select Unit</label>
                    <select className="ip-select">
                        <option value="option 1"> Name1</option>
                        <option value="option 2">Name2</option>
                        <option value="option 3">Name3</option>
                    </select>
            </div>

            <div className='col-md-2 mt-4'>
                   
                    <select className="ip-select mt-2">
                        <option value="option 1"> Name1</option>
                        <option value="option 2">Name2</option>
                        <option value="option 3">Name3</option>
                    </select>
            </div>
          </div>



          <div className='col-md-12 mt-3' style={{ height: '500px', overflowX: 'scroll', overflowY: 'scroll' }}>

<Table striped className="table-data border">
    <thead className="tableHeaderBGColor">
        <tr>

            
            <th style={{ whiteSpace: 'nowrap' }}>Receipt VrNo</th>
            <th style={{ whiteSpace: 'nowrap' }}>Receipt Status</th>
            
            
            <th style={{ whiteSpace: 'nowrap' }}>Date</th>
            <th style={{ whiteSpace: 'nowrap' }}>Customer</th>
            <th style={{ whiteSpace: 'nowrap' }}>Transaction Type</th>
            <th style={{ whiteSpace: 'nowrap' }}>Amount</th>
            <th style={{ whiteSpace: 'nowrap' }}>On Account</th>
            <th style={{ whiteSpace: 'nowrap' }}>Description</th>


        </tr>

    </thead>

    <tbody className='tablebody'>

        <tr>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

        </tr>

    </tbody>
</Table>

</div>
        </div>
    );
}
