import React from 'react'
import { Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap'

export default function PaymentReceiptFormTable() {
  return (
    <div>
      <div className='row col-md-12'>
                <div className='col-md-6' style={{ height: '500px', overflowX: 'scroll', overflowY: 'scroll' }}>

                    <Table striped className="table-data border">
                        <thead className="tableHeaderBGColor">
                            <tr>

                               
                                <th style={{ whiteSpace: 'nowrap' }}>Recd PVNo</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Txn Type</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Cust Name</th>
                                
                                <th style={{ whiteSpace: 'nowrap' }}>DocuNo</th>
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







                <div className='col-md-6'>
                    <Form className="form mt-2" >
                        <div className=" ">
                            <div className="row ">
                                <div className="row col-md-12">
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5' style={{whiteSpace:'nowrap'}}>Receipt Voucher No</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5'>Received From</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px", }} />
                                    </div>
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5'>Amount</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px", }} />
                                    </div>
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5'>Transaction Type</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px", }} />
                                    </div>
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5'>Description</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px", }} />
                                    </div>
                                </div>

                            </div>



                      



                           

                           







                           



                           










                           

                        </div>
                    </Form>










                    <div className='col-md-12 mt-1' style={{ height: '300px', overflowX: 'scroll', overflowY: 'scroll' }}>

                        <Table striped className="table-data border">
                            <thead className="tableHeaderBGColor">
                                <tr>

                                    
                                    <th style={{ whiteSpace: 'nowrap' }}>Invoice No</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Type</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Date</th>
                                 
                                    <th style={{ whiteSpace: 'nowrap' }}> Amount</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Receive</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Id</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Pvrid</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Unitname</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>RecdPVID</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>PVSrlID</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Unit_Uid</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>  HoPvrid</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>RecdPvSrl</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Sync_Hold</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Dc_inv_no</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv_No</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv_Type</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv_Amount</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Amt_received</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Receive_Now</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>InvUpdated</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv_date</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Updated</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Ref No</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>vouchet_type</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Prefix</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>LedgerName</th>




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
    </div>
  )
}
