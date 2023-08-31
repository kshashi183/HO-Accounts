import React from 'react';
import { Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap'
export default function InvoiceList() {
    return (
        <>
            <div className='row col-md-12'>
                <div className='col-md-6' style={{ height: '700px', overflowX: 'scroll', overflowY: 'scroll' }}>

                    <Table striped className="table-data border">
                        <thead className="tableHeaderBGColor">
                            <tr>

                                <th>Tally</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Bill Type</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Inv Type</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Inv No</th>
                                <th>Customer</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Grand Total</th>
                                <th style={{ whiteSpace: 'nowrap' }}>PO No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Tally Ref</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Cust_Code</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Updated</th>


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
                    <Form className="form mt-2" style={{overflowY:"scroll", height:'400px'}} >
                        <div className=" ">
                            <div className="row ">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>Invoice No</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>PN No</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px", }} />
                                    </div>
                                </div>

                            </div>



                            <div className="row mt-1">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>Type</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>PN Date</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>
                                </div>

                            </div>



                            <div className="row mt-1 ">
                                <div className="row col-md-12">
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-2'>PO No</label>
                                        <input class=" " type="text" placeholder="" style={{ fontSize: "13px", }} />
                                    </div>


                                </div>

                            </div>

                            <div className="row mt-1 ">
                                <div className="row col-md-12">
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-2'>Customer</label>
                                        <input class=" " type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>


                                </div>

                            </div>







                            <div className="row mt-1">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>Place</label>

                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>NetTotal</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>
                                </div>

                            </div>



                            <div className="row mt-1">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>State</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>Net Value</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>
                                </div>

                            </div>



                            <div className="row mt-1">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>Pin Code</label>
                                        <div>
                                            <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-10'>Assessamble Value</label>

                                        <div>
                                            <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>
                                </div>

                            </div>







                            <div className="row col-md-12 mt-2">
                               
                                <div className=" col-md-6">

                                    <label className="form-label ms-2"> Address</label>

                                    <textarea className="form-control sticky-top" rows='2' id="" style={{ height: '240px', resize: 'none' }}></textarea>

                                </div>
                                <div className='col-md-6'>
                                    <div className="">
                                        <label className='form-label col-md-10'>Deliver Charges</label>
                                        <div>
                                            <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className="">
                                        <label className='form-label col-md-10'>Taxes</label>
                                        <div>
                                            <input class="x" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className=" mt-1">
                                        <label className='form-label col-md-5'>Invoice total</label>
                                        <div>
                                            <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className=" mt-1">
                                        <label className='form-label col-md-5'>Round Off</label>
                                        <div>
                                            <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className=" mt-1">
                                        <label className='form-label col-md-5'>Grand Total</label>
                                        <div>
                                            <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Form>










                    <div className='col-md-12 mt-1' style={{ height: '300px', overflowX: 'scroll', overflowY: 'scroll' }}>

                        <Table striped className="table-data border">
                            <thead className="tableHeaderBGColor">
                                <tr>

                                    
                                    <th style={{ whiteSpace: 'nowrap' }}>Tax Name</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Taxable Amount</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Tax %</th>
                                    <th>Customer</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Tax Amount</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv Taxid</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Sync_Hold</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Unit_Uid</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Updated</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>UnitName</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>dc_invTaxid</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Dc_Inv_No</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Dc TaxId</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>TaxID</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Tax_Name</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>TaxOn</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>TaxableAmount</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>TaxPercent</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>ToWords</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv Type</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Acct Head</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv Id</th>


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







        </>
    );
}
