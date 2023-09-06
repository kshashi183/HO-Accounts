import React from 'react';
import { Table } from 'react-bootstrap';

export default function UnitReceiptListForm() {
    return (
        <div>

            <div className='col-md-12'>
                <div className='row'>

                    <h4 className='title'>Receipt Voucher Creator</h4>

                </div>
            </div>

            <div className='col-md-12'>

                <label className="form-label">Unit Payment Receipt</label>

            </div>
            <div className='col-md-12 mb-2'>

                <label className="form-label">Select Customer</label>

            </div>


            <hr className="horizontal-line" />

            <div className=''>
                <div className="mt-2">
                    <form className='row col-md-12'>
                        <div className="col-md-6">
                            <div className="d-flex" style={{ gap: '10px' }}>
                                <div className="">
                                    <label className="form-label">Vr No</label>
                                    <input className="" style={{ marginTop: '-10px' }} />
                                </div>

                                <div className="">
                                    <label className="form-label">Date</label>
                                    <input className="" type="text" style={{ marginTop: '-10px' }} />
                                </div>

                                <div className="">
                                    <label className="form-label">Status</label>
                                    <input className="" type="text" style={{ marginTop: '-10px' }} />
                                </div>
                            </div>

                            <div className="">
                                <div className="col-md-6">
                                    <label className="form-label">Customer Name</label>
                                    <select className="ip-select">
                                        <option value="option 1"> Name1</option>
                                        <option value="option 2">Name2</option>
                                        <option value="option 3">Name3</option>
                                    </select>
                                </div>

                                <div className="row col-md-12 col-sm-12">
                                    <div className="box col-md-6">
                                        <div className="">
                                            <label className="form-label">Transaction Type</label>
                                            <select className="ip-select">
                                                <option value="option 1">Cash</option>
                                                <option value="option 2">Online Payment</option>
                                                <option value="option 3">Cheque</option>
                                            </select>
                                        </div>

                                        <div className="">
                                            <label className="form-label">Amount</label>
                                            <input className="" style={{ marginTop: '-7px' }} />
                                        </div>

                                        <div className="">
                                            <label className="form-label">On Account</label>
                                            <input className="" style={{ marginTop: '-7px' }} />
                                        </div>
                                    </div>

                                    <div className="box col-md-6">
                                        <div className="mt-1">
                                            <label htmlFor="myBox" className="bg-light form-title tab_font mb-2">Description</label>
                                            <textarea className="form-control" rows='2' id="" style={{ height: '130px', resize: 'none' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="box02 col-md-4">
                                <div className="row mt-5">
                                    <button className="button-style mt-2 group-button"
                                    >
                                        Save
                                    </button>
                                </div>

                                <div className="row mt-4">
                                    <button className="button-style mt-2 group-button" >
                                        Delete
                                    </button>
                                </div>

                                <div className="row mt-4">
                                    <button className="button-style mt-2 group-button" >
                                        Post
                                    </button>
                                </div>

                                <div className="row mt-4">
                                    <button className="button-style mt-2 group-button" >
                                        Print
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>







            <div className='row mt-3'>
                <div className='col-md-6' style={{ height: '500px', overflowX: 'scroll', overflowY: 'scroll' }}>

                    <Table striped className="table-data border">
                        <thead className="tableHeaderBGColor">
                            <tr>


                                <th style={{ whiteSpace: 'nowrap' }}>Srl</th>

                                <th style={{ whiteSpace: 'nowrap' }}>Inv No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Date</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Type</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Amount</th>

                                <th style={{ whiteSpace: 'nowrap' }}>Received</th>

                                <th style={{ whiteSpace: 'nowrap' }}>Receivew Now</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Ref No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Inv Updated</th>


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
                                <td></td>
                                <td></td>

                            </tr>

                        </tbody>
                    </Table>

                </div>




                <div className='col-md-6' style={{ height: '500px', overflowX: 'scroll', overflowY: 'scroll' }}>

                    <Table striped className="table-data border">
                        <thead className="tableHeaderBGColor">
                            <tr>


                                <th style={{ whiteSpace: 'nowrap' }}>Select</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Inv Type</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Inv No</th>

                                <th style={{ whiteSpace: 'nowrap' }}>Date</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Amount</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Received</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Balance</th>


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


        </div>
    );
}
