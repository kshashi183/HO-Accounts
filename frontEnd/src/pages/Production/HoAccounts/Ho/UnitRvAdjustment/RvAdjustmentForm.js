import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function RvAdjustmentForm() {
    const navigate=useNavigate();
    return (
        <div>
            <div className='col-md-12'>
                <div className='row'>
                    <h4 className='title '>HO Receipt Adjuster</h4>
                </div>
            </div>
            <div className='row mt-1'>

                <div className="col-md-2">
                    <label className="form-label">Select Unit</label>
                    <select className="ip-select">
                        <option value="option 1"> Name1</option>
                        <option value="option 2">Name2</option>
                        <option value="option 3">Name3</option>
                    </select>
                </div>

                <div className="col-md-2 mt-2">
                    <label className="form-label"> </label>
                    {/* <input type='search'></input> */}
                    <select className="ip-select">
                        <option value="option 1"> Name1</option>
                        <option value="option 2">Name2</option>
                        <option value="option 3">Name3</option>
                    </select>
                </div>

                <div className="col-md-3 mt-2">
                    <button className="button-style mt-2 group-button"
                        style={{ width: "180px", marginLeft: "20px" }}>
                        Adjustment Voucher
                    </button>
                </div>
                <div className="col-md-2 mt-2">
                    <button className="button-style mt-2 group-button"
                      onClick={e => navigate("/home")}  >
                        Close
                    </button>
                </div>

                <div className='row col-md-3 mt-4   ' style={{}}>

                    <input className="form-check-input mt-2  "
                        type="checkbox"
                        //   checked={false}
                        name='Working'
                        id="flexCheckDefault" />

                    <div className=' col-md-5  ' style={{}}>

                        <h5>Show All</h5>
                    </div>

                    
                </div>

            </div>




            <div className='col-md-12'>
                <div className='mt-3 col-md-12'>
                    <div style={{ height: "250px", overflowY: "scroll", overflowX: 'scroll' }}>
                        <Table className='table-data border'>
                            <thead className='tableHeaderBGColor' style={{ textAlign: "center" }}>
                                <tr>
                                    <th style={{ whiteSpace: 'nowrap' }}>Rv No</th>
                                    <th>Amount</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>On Account</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Receipt Statsu</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Rv Date</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Description</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Txn Type</th>
                                </tr>
                            </thead>


                            <tbody className='tablebody'>
                                <tr className="" >
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
            </div>
        </div>
    );
}
