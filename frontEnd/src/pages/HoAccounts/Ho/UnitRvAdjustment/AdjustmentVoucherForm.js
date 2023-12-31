import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import Adjustment_Tables from './Adjustment_Tables';
import { baseURL } from '../../../../api/baseUrl';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function AdjustmentVoucherForm() {
    const navigate = useNavigate();



    const options = [
        { value: "option 1", label: "Bank" },
        { value: "option 2", label: "Cash" },
        { value: "option 3", label: "Adjustment" },
        { value: "option 4", label: "Rejection" },
        { value: "option 5", label: "TDS Receivable" },
        { value: "option 6", label: "Rate Difference" },
        { value: "option 7", label: "Short Supply" },
        { value: "option 8", label: "Balance Recoverable" },
        { value: "option 9", label: "Other Income" },
        { value: "option 10", label: "Balance Not Recoverable" },
        { value: "option 11", label: "QR Code And RTGS" },
    ];
    const location = useLocation();
    // const selectRow = location.state.selectRow;
    const selectRow = location.state ? location.state.selectRow : "";

    const currentDate = new Date().toISOString().split('T')[0];

    const [openInvoice, setOpenInvoice] = useState([]);
    console.log("adjust bug ", selectRow);
    const [selectedDCInvNo, setSelectedDCInvNo] = useState(null);
    const [selectCustData, setSelectCustData] = useState([]);

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
   

    
    const [selectedCustOption, setSelectedCustOption] = useState([]);


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

    const handleChange = () => {

    }
    const [getCustCode, setGetCustCode] = useState("");
    const [getCustNames, setGetCustNames] = useState([]);

    const handleSelectCustomer = (selected) => {
        const selectedCustomer = selected[0];
        setSelectedCustOption(selected); // Update selected option state
        setGetCustomer(selectedCustomer ? selectedCustomer.Cust_Name : ""); // Update selected Name
        setGetCustCode(selectedCustomer ? selectedCustomer.Cust_Code : ""); // Update selected Code
      };

      useEffect(() => {
      
        handleCustomerNames();
      }, []);

      const handleCustomerNames = () => {
        axios
          .post(baseURL + "/hoCreateNew/customerNames")
          .then((res) => {
            setGetCustNames(res.data);
          })
          .catch((err) => {
            console.log("err in table", err);
          });
      };


    return (
        <>








            <div className="row col-md-12">
                <div className="col-md-10">
                    <label className="form-label ">Create Adjustment Voucher for Receipt Voucher {selectRow.Recd_PVNo}</label>

                </div>
                <div className="col-md-2">
                    <button style={{ width: '90px' }}
                        className="button-style group-button "
                        onClick={() => navigate("/HOAccounts")}
                    >
                        Close
                    </button>
                </div>
            </div>
            <hr className="horizontal-line mt-2" />



            <div className="row col-md-12 " >
                <div className="col-md-2">
                    <label className="form-label ">Href No</label>
                    <input class="" type="text" placeholder=""
                        value={generatedNumber ? generatedNumber : "Draft"} disabled />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Date</label>
                    <input
                        className=""
                        value={currentDate}
                    // onChange={handleInputChange}
                    />
                </div>


            </div>







            <div className="row col-md-12 " style={{}}>

                <div className="col-md-2">

                    <label className="form-label"> Type</label>
                    <select className="ip-select">
                        <option value="option 1">Cash</option>
                        <option value="option 2">Online Payment</option>
                        <option value="option 3">Cheque</option>
                    </select>
                </div>

                <div className="col-md-3 ">
                    <label className="form-label">Receive Form</label>
                    <input className="" value={selectRow.CustName} type="text" disabled />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Amount</label>
                    <input className="" value={selectRow.Amount} />
                </div>

                <div className="col-md-3">
                    <label className="form-label">HO Reference</label>
                    <input className="" value={'Draft'} disabled />
                </div>



            </div>

            <div className=" row col-md-12">
                <div className="col-md-2">
                    <label className="form-label">Status</label>
                    <input className="" vvalue={'Draft'} disabled />
                </div>



                <div className="col-md-3">
                    <label
                        className="form-label"
                    >
                        Description
                    </label>
                    <textarea value={selectRow.Description}
                        className="form-control"
                        rows="2"
                        id=""
                        style={{ height: "70px", resize: "none" }}
                    ></textarea>
                </div>


                <div className="col-md-1 ">
                    <button className="button-style group-button" style={{ width: '90px' }}>Save</button>
                </div>

                <div className="col-md-2">
                    <button className="button-style group-button"
                        style={{ width: '90px', marginLeft: '70px' }}>Delete</button>
                </div>

                <div className=" col-md-1 ">
                    <button className="button-style group-button" style={{ width: '90px', marginLeft: '20px' }}>Post</button>
                </div>
                <div className=" col-md-1 ">
                    <button className="button-style group-button"
                        style={{ width: '90px', marginLeft: '70px' }}>Print</button>
                </div>
            </div>








            <div className="row col-md-12">
                <div className="col-md-6 mt-2 mb-3">
                    <div className="row col-md-12 mt-2">
                        <div className="col-md-6 mt-2">
                            <label className="form-label">Against Invoices</label>
                        </div>

                        <div className="col-md-6">
                            <button className="button-style mt-1 mb-2 group-button ms-5">
                                Remove Invoice
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            height: "250px",
                            overflowY: "scroll",
                            overflowX: "scroll",
                        }}
                    >
                        <Table className="table-data border">
                            <thead
                                className="tableHeaderBGColor"
                                style={{ textAlign: "center" }}
                            >
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

                            <tbody className="tablebody">
                                <tr style={{ whiteSpace: "nowrap" }} className="">
                                    {/* <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td> 
                  <td></td>
                  <td></td> */}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="col-md-6 mt-2">
                    <div className="row col-md-12 mb-2">
                        <label
                            className="form-label col-md-3"
                            style={{ whiteSpace: "nowrap", marginTop: "10px" }}
                        >
                            Select Invoices
                        </label>

                        <div className="col-md-3 mt-3">
                            <Typeahead
                                id="basic-example"
                                labelKey={(option) =>
                                    option && option.Cust_Name
                                        ? option.Cust_Name.toString()
                                        : ""
                                }
                                options={getCustNames}
                                placeholder="Select Customer"
                                onChange={handleSelectCustomer}
                                selected={selectedCustOption}
                            />
                        </div>

                        <div className=" col-md-4 ms-5 mb-1">
                            <button className="button-style group-button ">
                                Add Invoice
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            height: "250px",
                            overflowY: "scroll",
                            overflowX: "scroll",
                        }}
                    >
                        <Table className="table-data border">
                            <thead
                                className="tableHeaderBGColor"
                                style={{ textAlign: "center" }}
                            >
                                <tr style={{ whiteSpace: "nowrap" }}>
                                    <th>Select</th>
                                    <th>Type</th>
                                    <th>Invoice No</th>
                                    <th>Rate</th>
                                    <th>Grand Total</th>
                                    <th>Amount Received</th>
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
            </div>


        </>
    )
}
