import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useLocation, useSearchParams } from 'react-router-dom';
import Adjustment_Tables from './Adjustment_Tables';
import { baseURL } from '../../../../api/baseUrl';

export default function AdjustmentVoucherForm() {
    const location = useLocation();
   // const selectRow = location.state.selectRow;
    const selectRow = location.state ? location.state.selectRow : "";

    const currentDate = new Date().toISOString().split('T')[0];

    const [openInvoice, setOpenInvoice] = useState([]);
    console.log("adjust bug ", selectRow);

    useEffect(() => {
        if (selectRow) {
            adjustmentVoucher();
        }
    }, [selectRow]);

    const adjustmentVoucher = () => {
        if(selectRow && selectRow.Cust_code){
            axios.get(baseURL+'/unitRV_Adjustment/openInvoices', {
                params: {
                    selectedCustCode: selectRow.Cust_code
                },
            })
                .then((res) => {
                    setOpenInvoice(res.data.Result)
                    //console.log("----------", res.data.Result);
                })
                .catch((err) => {
                    console.log("err");
                })
        }
       
    }
   
    const currentYear = new Date().getFullYear() % 100; // Calculate the last 2 digits of the current year
    const initialGeneratedNumber = `${currentYear-1}/${currentYear}/0000`;
    const [generatedNumber, setGeneratedNumber] = useState('')
    const generateNumber=()=>{
        

        const last4Digits = Number(generatedNumber.slice(-4));

        // Increment the last 4 digits
        const nextNumber = String(last4Digits + 1).padStart(4, '0');
    
        // Create the final number with dynamic year values
        const newNumber = `${currentYear-1}/${currentYear}/${nextNumber}`;
    
        // Update the state with the new number
        setGeneratedNumber(newNumber);
        
    }
    console.log("generate",generatedNumber );
    
    return (
        <div>

            <div className='row col-md-12'>
                <div className="mt-2 col-md-6">
                    <form className=''>
                        <div className="">

                            <div className="d-flex ms-3" style={{ gap: '10px' }}>
                                <div className=" col-md-5">
                                    <label className="form-label ">Href No</label>
                                    <input className="in-field  " style={{ marginTop: '-5px' }} value={generatedNumber ? generatedNumber: "Draft"} disabled />
                                </div>

                                <div className=" col-md-6">
                                    <label className="form-label">Date</label>
                                    <input className="in-field" type="date" style={{ marginTop: '-5px' }} value={currentDate} disabled/>
                                </div>

                            </div>



                            <div className="col-md-11 ms-3">
                                <label className="form-label">Receive From</label>
                                <input className="in-field" type="text" value={selectRow.CustName} disabled
                                style={{ marginTop: '-10px' }} />
                            </div>

                            <div className="row col-md-12 col-sm-12">
                                <div className="box col-md-6">
                                    <div className="">
                                        <label className="form-label"> Type</label>
                                        <select className="ip-select">
                                            <option value="option 1">Cash</option>
                                            <option value="option 2">Online Payment</option>
                                            <option value="option 3">Cheque</option>
                                        </select>

                                    </div>

                                    <div className="">
                                        <label className="form-label">Amount</label>
                                        <input className="in-field" style={{ marginTop: '-7px' }}
                                            // value={selectRow.Amount}
                                             />
                                    </div>

                                    <div className="">
                                        <label className="form-label">HO Reference</label>
                                        <input className="in-field" style={{ marginTop: '-7px' }}
                                            value={'Draft'} disabled/>
                                    </div>

                                    <div className="">
                                        <label className="form-label">Status</label>
                                        <input className="in-field" style={{ marginTop: '-7px' }}
                                            value={'Draft'} disabled
                                        />
                                    </div>
                                </div>

                                <div className="box col-md-6">
                                    <div className="mt-1">
                                        <label htmlFor="myBox" className="bg-light form-title tab_font mb-2">Description</label>
                                        <textarea className="form-control" rows='2' id="" style={{ height: '200px', resize: 'none' }}
                                            value={selectRow.Description}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className='row col-md-12 '>

                                    <div className="col-md-2">
                                        <button
                                         className="button-style mt-2 group-button"
                                            style={{ width: '70px' }}  
                                            type='button'
                                            >
                                            Save
                                        </button>
                                    </div>


                                    <div className="col-md-2">
                                        <button className="button-style mt-2 group-button"
                                            style={{ width: '70px' }}  type='button' onClick={generateNumber} >
                                            Post
                                        </button>
                                    </div>

                                    <div className=" col-md-3">
                                        <button className="button-style mt-2 group-button"
                                            style={{ width: '90px' }}   type='button' >
                                            Print
                                        </button>
                                    </div>
                                    <div className=" col-md-3">
                                        <button className="button-style mt-2 group-button"
                                            style={{ width: '90px' }}   type='button' >
                                            Delete
                                        </button>
                                    </div>
                                    <div className=" col-md-2">
                                        <button className="button-style mt-2 group-button"
                                            style={{ width: '70px' }}    >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>


                    </form>



                </div>


                <div className='col-md-6'>
                    <Adjustment_Tables openInvoice={openInvoice} selectRow={selectRow}/>
                </div>

            </div>











            <div className='row col-md-6 mt-2'>

                <div className='col-md-4 mt-2'>

                    <label className="form-label">Against Invoices</label>
                </div>

                <div className=" col-md-4">
                    <button className="button-style mt-1 mb-2 group-button"
                    >
                        Remove Invoice
                    </button>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Amount Adjusted</label>
                    <input className="in-field " style={{ marginTop: '-10px' }} 
                    value={selectRow.On_account} />
                </div>

            </div>

            <div style={{ height: "250px", overflowY: "scroll", overflowX: 'scroll' }} className='col-md-6'>
                <Table className='table-data border mt-2'>
                    <thead className='tableHeaderBGColor' style={{ textAlign: "center" }}>
                        <tr>
                            <th style={{ whiteSpace: 'nowrap' }}>Srl no</th>
                            <th>Amount</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Invoice No</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Date</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Type</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Account</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Received</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Receive Now</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Id</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Unitname</th>
                            <th style={{ whiteSpace: 'nowrap' }}>PVSrlID</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Unit_UId</th>
                            <th style={{ whiteSpace: 'nowrap' }}>HOPrvId</th>
                            <th style={{ whiteSpace: 'nowrap' }}>RecdPvSrl</th>
                            <th style={{ whiteSpace: 'nowrap' }}>HO_Uid</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Dc_inv_no</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Inv_No</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Inv_Type</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Inv_Amount</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Amt_received</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Receive_Now</th>
                            <th style={{ whiteSpace: 'nowrap' }}>InvUpdated</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Inv_date</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Updated</th>
                            <th style={{ whiteSpace: 'nowrap' }}>RefNo</th>
                            <th style={{ whiteSpace: 'nowrap' }}>UnitId</th>

                        </tr>
                    </thead>


                    <tbody className='tablebody'>
                        <tr className="" >
                            
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>


        </div>
    )
}
