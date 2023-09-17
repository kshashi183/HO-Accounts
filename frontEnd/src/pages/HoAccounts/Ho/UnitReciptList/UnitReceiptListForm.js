import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import PaymentReceiptVoucherPdf from '../../../../PDF/PaymentReceiptVoucher';

export default function UnitReceiptListForm() {

    const contentRef = React.useRef();

    // Create a reference for the ReactToPrint component
    const printRef = React.useRef();
    const [getClosedInvoices, setGetClosedInvoices] = useState([])
    const [openInvoices, setOpenInvoices] = useState([])
    const [printButtonClicked, setPrintButtonClicked] = useState(false);
    const location = useLocation();
    const selectRow = location.state.selectRow || '';
    console.log("se", selectRow);

    useEffect(() => {

        if (selectRow) {
            getInvoiceList();
            handleOpenInvoice();

            // handlePrintButtonClick();
        }

    }, [selectRow])

    console.log("custcode", selectRow.Cust_code);

    const getInvoiceList = () => {
        axios.get('http://localhost:3001/unitReceiptList/getInvoices', {
            params: {
                RecdPVID: selectRow.RecdPVID
            },
        })

            .then((res) => {
                setGetClosedInvoices(res.data.Result)
                console.log("re", res.data.Result);
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    const handleOpenInvoice = () => {
        axios.get('http://localhost:3001/unitReceiptList/getOpenInvoices', {
            params: {
                Cust_code: selectRow.Cust_code
            },
        })

            .then((res) => {
                setOpenInvoices(res.data.Result)
                console.log("openinv", res.data.Result);
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    const handlePrintButtonClick = (e) => {
        e.preventDefault();
      
         printRef.current.handlePrint();
      };

    

    

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
                                    <input className=""
                                        value={selectRow.Recd_PVNo} disabled />
                                </div>

                                <div className="">
                                    <label className="form-label">Date</label>
                                    <input className="" type="text"
                                        value={selectRow.Formatted_Recd_PV_Date} disabled
                                    />
                                </div>

                                <div className="">
                                    <label className="form-label">Status</label>
                                    <input className="" type="text" disabled />
                                </div>
                            </div>

                            <div className="">
                                <div className="col-md-6">
                                    <label className="form-label">Customer Name</label>
                                    <input className="" type="text" value={selectRow.CustName} />
                                </div>

                                <div className="row col-md-12 col-sm-12">
                                    <div className="box col-md-6">
                                        <div className="">
                                            <label className="form-label">Transaction Type</label>
                                            <select className="ip-select" disabled>
                                                <option value="option 1"></option>
                                                <option value="option 2">Online Payment</option>
                                                <option value="option 3">Cheque</option>
                                            </select>
                                        </div>

                                        <div className="">
                                            <label className="form-label">Amount</label>
                                            <input className="" style={{ marginTop: '-7px' }}
                                                value={selectRow.Amount} disabled
                                            />
                                        </div>

                                        <div className="">
                                            <label className="form-label">On Account</label>
                                            <input className="" style={{ marginTop: '-7px' }}
                                                value={selectRow.On_account} disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="box col-md-6">
                                        <div className="mt-1">
                                            <label htmlFor="myBox" className="bg-light form-title tab_font mb-2">Description</label>
                                            <textarea className="form-control" rows='2' id="" style={{ height: '130px', resize: 'none' }}
                                                value={selectRow.Description}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="box02 col-md-4">

                                <div className="row mt-3">
                                    <button disabled={selectRow.Recd_PVNo !== ''}
                                        className={selectRow.TaxName !== '' ? 'disabled-button' : 'button-style  group-button'}
                                    >
                                        Save
                                    </button>
                                </div>

                                <div className="row mt-3">
                                    <button

                                        disabled={selectRow.Recd_PVNo !== ''}
                                        className={selectRow.TaxName !== '' ? 'disabled-button' : 'button-style  group-button'}
                                    >
                                        Delete
                                    </button>
                                </div>

                                <div className="row mt-3">
                                    <button
                                        disabled={selectRow.Recd_PVNo !== ''}
                                        className={selectRow.TaxName !== '' ? 'disabled-button' : 'button-style  group-button'}>
                                        Post
                                    </button>
                                </div>

                                <div className="row mt-3">
                                    <button
                                        className='button-style  group-button'
                                        onClick={handlePrintButtonClick}>
                                        Print
                                    </button>
                                    <ReactToPrint
                                        trigger={() => <div style={{ display: 'none' }}><PaymentReceiptVoucherPdf ref={contentRef} 
                                        selectRow={selectRow}
                               /></div>}
                                        content={() => contentRef.current}
                                        ref={printRef} // Attach the reference to the ReactToPrint component
                                        documentTitle="Payment Receipt Voucher"
                                    />
                                    
                                </div>
                                <div className="row mt-3">
                                    <button
                                        className='button-style  group-button'>
                                        Close
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

                            {
                                getClosedInvoices.map((item, index) => {
                                    return (
                                        <tr style={{ whiteSpace: 'nowrap' }}>
                                            <td>{index + 1}</td>
                                            <td>{item.Inv_No}</td>
                                            <td>{item.Formatted_Inv_date}</td>
                                            <td>{item.Inv_Type}</td>
                                            <td>{item.Inv_Amount}</td>
                                            <td>{item.Amt_received}</td>
                                            <td>{item.Receive_Now}</td>
                                            <td>{item.RefNo}</td>
                                            <td>{<input type='checkbox' disabled />}</td>
                                        </tr>
                                    )
                                })
                            }

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

                            {
                                openInvoices.map((item, index) => {
                                    return (
                                        <tr>
                                            <td><input type='checkBox' /></td>
                                            <td>{item.DC_InvType}</td>
                                            <td>{item.DC_Inv_No}</td>
                                            <td>{item.Formatted_Inv_Date}</td>
                                            <td>{item.GrandTotal}</td>
                                            <td>{item.PymtAmtRecd}</td>
                                            <td>{item.Balance}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>

                </div>




            </div>


        </div>
    );
}
