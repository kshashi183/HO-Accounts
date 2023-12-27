import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import Adjustment_Tables from './Adjustment_Tables';
import { baseURL } from '../../../../api/baseUrl';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function AdjustmentVoucherForm() {
    const navigate = useNavigate();
    const location = useLocation();
    // const selectRow = location.state.selectRow;
    const selectRow = location.state ? location.state.selectRow : "";

    const currentDate = new Date().toISOString().split('T')[0];

    const [openInvoice, setOpenInvoice] = useState([]);
    console.log("adjust bug ", selectRow);
    const [selectedDCInvNo, setSelectedDCInvNo] = useState(null);
    const[selectCustData, setSelectCustData]=useState([]);

    useEffect(() => {
        if (selectRow) {
            adjustmentVoucher();
        }
    }, [selectRow]);

    const adjustmentVoucher = () => {
        if (selectRow && selectRow.Cust_code) {
            axios.get(baseURL + '/unitRV_Adjustment/openInvoices', {
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
    const initialGeneratedNumber = `${currentYear - 1}/${currentYear}/0000`;
    const [generatedNumber, setGeneratedNumber] = useState('')
    const generateNumber = () => {


        const last4Digits = Number(generatedNumber.slice(-4));

        // Increment the last 4 digits
        const nextNumber = String(last4Digits + 1).padStart(4, '0');

        // Create the final number with dynamic year values
        const newNumber = `${currentYear - 1}/${currentYear}/${nextNumber}`;

        // Update the state with the new number
        setGeneratedNumber(newNumber);

    }
    console.log("generate", generatedNumber);



    //ADD Invoice table 

    const [rowChecked, setRowChecked] = useState([]);
    const handleCheckboxChange = (rowIndex) => {

        const updatedRowChecked = [...rowChecked];

        updatedRowChecked[rowIndex] = !updatedRowChecked[rowIndex];

        setRowChecked(updatedRowChecked);

        if (updatedRowChecked[rowIndex]) {
          // setSelectedDCInvNo(tableData[rowIndex]?.DC_Inv_No);
        } else {
            setSelectedDCInvNo(null);
        }
    };

    const [getCustomer, setGetCustomer] = useState([])
    const [selectedCustCode, setSelectedCustCode] = useState("");
    const [selectedOption, setSelectedOption] = useState([{ Cust_name: selectRow.CustName }]);


    const handleTypeaheadChange = (selectedOptions) => {
        if (selectedOptions && selectedOptions.length > 0) {
            const selectedCustomer = selectedOptions[0];
            const custName = selectedCustomer.Cust_name;

            // Set the selected customer in state
            setSelectedOption([selectedCustomer]); // Ensure it's an array

            // Set the selected Cust_Code in state
            setSelectedCustCode(selectedCustomer.Cust_Code);
        } else {
            // Handle the case where nothing is selected (optional)
            setSelectedOption([]); // Clear the selected customer in state
            setSelectedCustCode(''); // Clear the selected Cust_Code in state
        }
    };

    const handleChange=()=>{

    }

    return (
        <>

            <div className='row col-md-12'>
                <div className=" col-md-6">



                    <div className="d-flex " style={{ gap: '10px' }}>
                        <div className=" col-md-5">
                            <label className="form-label ">Href No</label>
                            <input className="in-field  " style={{ marginTop: '-5px' }} value={generatedNumber ? generatedNumber : "Draft"} disabled />
                        </div>

                        <div className=" col-md-6">
                            <label className="form-label">Date</label>
                            <input className="in-field" type="date" style={{ marginTop: '-5px' }} value={currentDate} disabled />
                        </div>

                    </div>



                    <div className="col-md-11 ">
                        <label className="form-label">Receive From</label>
                        <input className="in-field" type="text" value={selectRow.CustName} disabled
                            style={{ marginTop: '-10px' }} />
                    </div>




                    <div className="d-flex " style={{ gap: '10px' }}>
                        <div className=" col-md-5">
                            <label className="form-label"> Type</label>
                            <select className="ip-select">
                                <option value="option 1">Cash</option>
                                <option value="option 2">Online Payment</option>
                                <option value="option 3">Cheque</option>
                            </select>

                            <label className="form-label">Amount</label>
                            <input className="in-field" style={{ marginTop: '-7px' }}
                            // value={selectRow.Amount}
                            />

                        </div>

                        <div className=" col-md-6">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" rows='2' id="" style={{ height: '80px', resize: 'none' }}
                                value={selectRow.Description}
                            ></textarea>
                        </div>

                    </div>


                    <div className="d-flex " style={{ gap: '10px' }}>
                        <div className=" col-md-5">
                            <label className="form-label">HO Reference</label>
                            <input className="in-field" style={{ marginTop: '-7px' }}
                                value={'Draft'} disabled />
                        </div>

                        <div className=" col-md-6">
                            <label className="form-label">Status</label>
                            <input className="in-field" style={{ marginTop: '-7px' }}
                                value={'Draft'} disabled
                            />
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
                                style={{ width: '70px' }} type='button' onClick={generateNumber} >
                                Post
                            </button>
                        </div>

                        <div className=" col-md-3">
                            <button className="button-style mt-2 group-button"
                                style={{ width: '90px' }} type='button' >
                                Print
                            </button>
                        </div>
                        <div className=" col-md-3">
                            <button className="button-style mt-2 group-button"
                                style={{ width: '90px' }} type='button' >
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


                <div className='col-md-6'>
                   


                    <div className='row col-md-12 mb-2'>

                        <label className="form-label col-md-3 mt-1" style={{ whiteSpace: 'nowrap' }}>Select Invoices</label>


                        <div className='col-md-3 mt-2'>

                            <Typeahead

                                id="basic-example"
                                labelKey={(option) => (option && option.Cust_name ? option.Cust_name.toString() : '')}
                                valueKey="Cust_Code"
                                options={getCustomer}
                                placeholder="Select Customer"

                                onChange={handleTypeaheadChange}
                                selected={selectedOption}
                            />


                        </div>


                        <div className=" col-md-4 ">
                            <button className="button-style mt-1 group-button "
                            // onClick={addInvoiceSubmit}
                            >
                                Add Invoice
                            </button>
                        </div>
                        <div className="col-md-2 ">
                            <button className="button-style mt-1 group-button"
                                onClick={() => navigate("/HOAccounts")} style={{ width: '80px' }}>
                                Close
                            </button>
                        </div>






                    </div>


                    <div style={{ height: "300px", overflowY: "scroll", overflowX: 'scroll' }}>
                        <Table className='table-data border'>
                            <thead className='tableHeaderBGColor' style={{ textAlign: "center" }}>
                                <tr>
                                    <th style={{ whiteSpace: 'nowrap' }}>Select</th>

                                    <th style={{ whiteSpace: 'nowrap' }}>Type</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Invoice No</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Date</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Grand Total</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Amount Received</th>
                                </tr>
                            </thead>


                            <tbody className='tablebody'>



                                {

                                    selectedCustCode === ''
                                        ?
                                        openInvoice.map((item, rowIndex) => {
                                            return (

                                                <tr key={rowIndex} >
                                                    <td><input type='checkbox'
                                                        checked={rowChecked[rowIndex]} // Use the checked state for this row
                                                        onChange={() => handleCheckboxChange(rowIndex)}
                                                    /></td>
                                                    <td>
                                                        <input style={{ border: 'none', width: '70px' }}
                                                            type='text'
                                                            value={item.DC_InvType}
                                                            onChange={(e) => handleChange(rowIndex, 'DC_InvType', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input style={{ border: 'none', width: '70px' }}
                                                            type='text'
                                                            value={item.Inv_No}
                                                            onChange={(e) => handleChange(rowIndex, 'Inv_No', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input style={{ border: 'none', width: '90px' }}
                                                            type='text'
                                                            value={item.Formatted_Inv_Date}
                                                            onChange={(e) => handleChange(rowIndex, 'Formatted_Inv_Date', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input style={{ border: 'none', width: '70px' }}
                                                            type='text'
                                                            value={item.GrandTotal}
                                                            onChange={(e) => handleChange(rowIndex, 'GrandTotal', e.target.value)}
                                                        />
                                                    </td>

                                                    <td>
                                                        <input style={{ border: 'none', width: '70px' }}
                                                            type='text'
                                                            value={item.PymtAmtRecd}
                                                            onChange={(e) => handleChange(rowIndex, 'PymtAmtRecd', e.target.value)}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        }) :


                                     
                                           

                                                <tr  >
                                                    <td><input type='checkbox'
                                                         // Use the checked state for this row
                                                      
                                                    /></td>
                                                    <td>
                                                        <input style={{ border: 'none', width: '70px' }}
                                                            type='text'
                                                            
                                                       
                                                        />
                                                    </td>
                                                    <td>
                                                        <input style={{ border: 'none', width: '70px' }}
                                                            type='text'
                                                          
                                                            
                                                        />
                                                    </td>
                                                    <td>
                                                        <input style={{ border: 'none', width: '90px' }}
                                                            type='text'
                                                           
                                                            
                                                        />
                                                    </td>
                                                    <td>
                                                        <input style={{ border: 'none', width: '70px' }}
                                                            type='text'
                                                          
                                                            
                                                        />
                                                    </td>

                                                    <td>
                                                        <input style={{ border: 'none', width: '70px' }}
                                                            type='text'
                                                            
                                                         
                                                        />
                                                    </td>
                                                </tr>
                                            
                                      
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>






                <div className='row col-md-6 '>

                    <div className='col-md-4 '>

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


        </>
    )
}
