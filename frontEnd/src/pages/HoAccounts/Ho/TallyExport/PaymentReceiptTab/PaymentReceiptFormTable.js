import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap'
import { baseURL } from '../../../../../api/baseUrl';

export default function PaymentReceiptFormTable({ selectedDate, setFlag, flag }) {
    const [paymentReceiptDetails, setPaymentReceiptDetails] = useState([])
    const [payment, setPayment] = useState([]);


    useEffect(() => {
        if (selectedDate) {
            PaymentReceiptSubmit();
        }

    }, [selectedDate])

    const PaymentReceiptSubmit = () => {
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        axios.get(baseURL+'/tallyExport/getPaymentReceipntData',
            {
                params: {
                    date: selectedDate
                }
            }  // Pass selectedDate as a query parameter
        )
            .then((res) => {
                console.log("Paymnet Receipnt", res.data.Result);
                setPaymentReceiptDetails(res.data.Result)
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    const paymentReceipt = (Recd_PVNo) => {
        axios.get(baseURL+'/tallyExport/getPayment',
            {
                params: {
                    Recd_PVNo: Recd_PVNo
                }
            }
        )
            .then((res) => {
               // console.log("Paymnet", res.data.Result);
                setPayment(res.data.Result)
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    const [selectRow, setSelectRow] = useState('');
    const selectedRowFun = (item, index) => {
        let list = { ...item, index: index }

        setSelectRow(list);

        paymentReceipt(item.Recd_PVNo)
    }

    const convertDateFormat = (dateString) => {
        if (dateString) {
            const parts = dateString.split('-');
            if (parts.length === 3) {
                const [yy, dd, mm] = parts;
                // Rearrange the parts to create the new format
                return `${dd}/${mm}/${yy}`;
            }
        }
        
        return dateString;
    };

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

                            {flag &&
                                paymentReceiptDetails.map((item, key) => {
                                    return (
                                        <tr style={{ whiteSpace: 'nowrap' }}
                                            onClick={() => selectedRowFun(item, key)}

                                            className={key === selectRow?.index ? 'selcted-row-clr' : ''}
                                        >
                                            <td>{item.Recd_PVNo}</td>
                                            <td>{item.TxnType}</td>
                                            <td>{item.CustName}</td>
                                            <td>{ }</td>
                                            <td>{item.Amount}</td>
                                            <td>{item.On_account}</td>
                                            <td>{item.Description}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>

                </div>







                <div className='col-md-6'>
                    <Form className="form mt-2" >
                        <div className=" ">
                            <div className="row ">
                                <div className="row col-md-12">
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5' style={{ whiteSpace: 'nowrap' }}>Receipt Voucher No</label>
                                        <input class="" type="text" value={selectRow.Recd_PVNo} style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5'>Received From</label>
                                        <input class="" type="text" value={selectRow.CustName} disabled style={{ fontSize: "13px", }} />
                                    </div>
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5'>Amount</label>
                                        <input class="" type="text" value={selectRow.Amount} disabled style={{ fontSize: "13px", }} />
                                    </div>
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5'>Transaction Type</label>
                                        <input class="" type="text" value={selectRow.TxnType} disabled style={{ fontSize: "13px", }} />
                                    </div>
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-5'>Description</label>
                                        <input class="" type="text" value={selectRow.Description} disabled style={{ fontSize: "13px", }} />
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
                                    <th style={{ whiteSpace: 'nowrap' }}>Sync_HoId</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Dc_inv_no</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv_No</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv_Type</th>
                                   
                                    <th style={{ whiteSpace: 'nowrap' }}>Amt_received</th>
                                    
                                    <th style={{ whiteSpace: 'nowrap' }}>InvUpdated</th>
                                  
                                    <th style={{ whiteSpace: 'nowrap' }}>Updated</th>
                                    
                                    <th style={{ whiteSpace: 'nowrap' }}>vouchet_type</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Prefix</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>LedgerName</th>




                                </tr>

                            </thead>

                            <tbody className='tablebody'>

                                {
                                    payment.map((item, index) => {
                                        return (
                                            <tr style={{whiteSpace:'nowrap'}}>
                                                <td>{item.RefNo}</td>
                                                <td>{item.Inv_Type}</td>
                                                <td>{convertDateFormat(item.Inv_date)}</td>
                                                <td>{item.Inv_Amount}</td>
                                                <td>{item.Receive_Now}</td>
                                                <td>{item.Id}</td>
                                                <td>{item.PvrId}</td>
                                                <td>{item.Unitname}</td>
                                                <td>{item.RecdPVID}</td>
                                                <td></td>
                                                <td>{item.Unit_UId}</td>
                                                <td>{item.HOPrvId}</td>
                                                <td>{item.RecdPvSrl}</td>
                                                <td>{}</td>
                                                <td>{item.Dc_inv_no}</td>
                                                <td>{item.Inv_No}</td>
                                                <td>{item.Inv_Type}</td>
                                                <td>{item.Amt_received}</td>
                                                <td>{<input type='checkBox'/>}</td>
                                                <td>{<input type='checkBox'/>}</td>
                                                <td>{item.voucher_type}</td>
                                                <td>{item.PreFix}</td>
                                                <td>{item.LedgerName}</td>
                                                
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>

                    </div>
                </div>










            </div>
        </div>
    )
}
