// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Table } from 'react-bootstrap';
// import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// // import Adjustment_Tables from './Adjustment_Tables';
// import { baseURL } from '../../../../api/baseUrl';
// import { Typeahead } from 'react-bootstrap-typeahead';
// import CancelModal from './CancelModal';
// import AddVoucherModal from './AddVoucherModal';
// import { toast } from 'react-toastify';

// export default function AdjustmentVoucherForm() {
//     const navigate = useNavigate();



//     const options = [
//         { value: "option 1", label: "Bank" },
//         { value: "option 2", label: "Cash" },
//         { value: "option 3", label: "Adjustment" },
//         { value: "option 4", label: "Rejection" },
//         { value: "option 5", label: "TDS Receivable" },
//         { value: "option 6", label: "Rate Difference" },
//         { value: "option 7", label: "Short Supply" },
//         { value: "option 8", label: "Balance Recoverable" },
//         { value: "option 9", label: "Other Income" },
//         { value: "option 10", label: "Balance Not Recoverable" },
//         { value: "option 11", label: "QR Code And RTGS" },
//     ];
//     const location = useLocation();
//     // const selectRow = location.state.selectRow;
//     const selectRow = location.state ? location.state.selectRow : "";

//     const currentDate = new Date().toISOString().split('T')[0];

//     const [openInvoice, setOpenInvoice] = useState([]);
//     console.log("adjust bug ", selectRow);
//     const [selectedDCInvNo, setSelectedDCInvNo] = useState(null);
//     const [selectCustData, setSelectCustData] = useState([]);



//     const [getCustomer, setGetCustomer] = useState([])
//     const [selectedCustCode, setSelectedCustCode] = useState("");



//   //  const [selectedCustOption, setSelectedCustOption] = useState([]);
//   const [selectedCustOption, setSelectedCustOption] = useState(
//     selectRow.CustName
//       ? [{ Cust_Name: selectRow.CustName }]
//       : [] // Set an empty array if CustName is undefined or not a valid option
//   );
  




//     const handleChange = () => {

//     }
//     const [getCustCode, setGetCustCode] = useState('');
//     const [getCustNames, setGetCustNames] = useState();


//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, "0");
//         const day = String(date.getDate()).padStart(2, "0");
//         return `${year}-${month}-${day}`;
//     };
//     const [rvData, setRvData] = useState({
//         apiData: null,
//         flag: false,
//         date: new Date(),
//         insertId: "",
//         firstTableArray: [],
//         secondTableArray: [],
//         custData: [],
//         // postData: {
//         //     RecdPVID: "",
//         //     Recd_PVNo: "Draft",

//         //     Recd_PV_Date: formatDate(new Date()),

//         //     ReceiptStatus: "Draft",
//         //     CustName: "",
//         //     Cust_code: "",
//         //     TxnType: "",
//         //     Amount: "",
//         //     On_account: "",
//         //     Description: "",
//         //     selectedCustomer: "",
//         //     RecdPvSrl: 0,
//         //     PVSrlID: "",
//         //     InvUpdated: 0,
//         //     Sync_Hold: 0,
//         // },
//         data: {
//             inv_data: [],
//             receipt_details: [],
//             receipt_id: "",
//             receipt_data: null,
//         },
//         open: false,
//     });

//     useEffect(() => {
//         if (selectRow || getCustCode) {
//             adjustmentVoucher();
//         }
//     }, [selectRow, getCustCode]);

//     // const adjustmentVoucher = () => {
//     //     if (selectRow && selectRow.Cust_code) {
//     //         axios.get(baseURL + '/unitRV_Adjustment/openInvoices', {
//     //             params: {
//     //                 selectedCustCode: selectRow.Cust_code
//     //             },
//     //         })
//     //             .then((res) => {
//     //                 // setOpenInvoice(res.data.Result)
//     //                 //console.log("----------", res.data.Result);

//     //                 setRvData((prevRvData) => ({
//     //                     ...prevRvData,
//     //                     data: {
//     //                         ...prevRvData.data,
//     //                         inv_data: res.data.Result,

//     //                     },
//     //                 }));
//     //             })
//     //             .catch((err) => {
//     //                 console.log("err");
//     //             })
//     //     }

//     // }

//     console.log("get custcode", getCustCode, selectRow.Cust_code);

//     const adjustmentVoucher = () => {
//         if (getCustCode === selectRow.Cust_code || getCustCode === '') {

//             if (selectRow && selectRow.Cust_code) {
//                 axios.get(baseURL + '/unitRV_Adjustment/openInvoices', {
//                     params: {
//                         selectedCustCode: selectRow.Cust_code
//                     },
//                 })
//                     .then((res) => {
//                         // setOpenInvoice(res.data.Result)
//                         //console.log("----------", res.data.Result);

//                         setRvData((prevRvData) => ({
//                             ...prevRvData,
//                             data: {
//                                 ...prevRvData.data,
//                                 inv_data: res.data.Result,

//                             },
//                         }));
//                     })
//                     .catch((err) => {
//                         console.log("err");
//                     })
//             }
//         }
//         else {

//             toast.success("Data loading")
//             axios.get(baseURL + '/unitRV_Adjustment/openInvoices', {
//                 params: {
//                     selectedCustCode: getCustCode
//                 },
//             })
//                 .then((res) => {
//                     // setOpenInvoice(res.data.Result)
//                     //console.log("----------", res.data.Result);

//                     setRvData((prevRvData) => ({
//                         ...prevRvData,
//                         data: {
//                             ...prevRvData.data,
//                             inv_data: res.data.Result,

//                         },
//                     }));
//                 })
//                 .catch((err) => {
//                     console.log("err");
//                 })

//         }

//     }

//     const currentYear = new Date().getFullYear() % 100; // Calculate the last 2 digits of the current year
//     const initialGeneratedNumber = `${currentYear - 1}/${currentYear}/0000`;
//     const [generatedNumber, setGeneratedNumber] = useState('')
//     const generateNumber = () => {


//         const last4Digits = Number(generatedNumber.slice(-4));

//         // Increment the last 4 digits
//         const nextNumber = String(last4Digits + 1).padStart(4, '0');

//         // Create the final number with dynamic year values
//         const newNumber = `${currentYear - 1}/${currentYear}/${nextNumber}`;

//         // Update the state with the new number
//         setGeneratedNumber(newNumber);

//     }
//     console.log("generate", generatedNumber);



//     //ADD Invoice table 

//     const [rowChecked, setRowChecked] = useState([]);

//     // const handleCheckboxChange = (rowIndex) => {

//     //     const updatedRowChecked = [...rowChecked];

//     //     updatedRowChecked[rowIndex] = !updatedRowChecked[rowIndex];

//     //     setRowChecked(updatedRowChecked);

//     //     if (updatedRowChecked[rowIndex]) {
//     //         // setSelectedDCInvNo(tableData[rowIndex]?.DC_Inv_No);
//     //     } else {
//     //         setSelectedDCInvNo(null);
//     //     }
//     // };



//     const handleSelectCustomer = (selected) => {
//         const selectedCustomer = selected[0];
//         setSelectedCustOption(selected); // Update selected option state
//         setGetCustomer(selectedCustomer ? selectedCustomer.Cust_Name : ""); // Update selected Name
//         setGetCustCode(selectedCustomer ? selectedCustomer.Cust_Code : ""); // Update selected Code
//     };

//     useEffect(() => {

//         handleCustomerNames();
//     }, []);

//     const handleCustomerNames = () => {
//         axios
//             .post(baseURL + "/hoCreateNew/customerNames")
//             .then((res) => {
//                 setGetCustNames(res.data);
//             })
//             .catch((err) => {
//                 console.log("err in table", err);
//             });
//     };

//     // const [secondTableArray, setSecondTableArray] = useState([]);

//     // const handleCheckboxChange = (event, rowData) => {
//     //     const isChecked = event.target.checked;

//     //     const updatedInvData = openInvoice.map((row) => {
//     //         if (row === rowData) {
//     //             return { ...row, isSelected: isChecked };
//     //         }
//     //         return row;
//     //     });

//     //     const selectedRow = isChecked ? rowData : null;
//     //     setOpenInvoice(updatedInvData);

//     //     if (isChecked) {
//     //         setSecondTableArray((prevArray) => [...prevArray, selectedRow]);
//     //     } else {
//     //         setSecondTableArray((prevArray) =>
//     //             prevArray.filter((item) => item.DC_Inv_No !== rowData.DC_Inv_No)
//     //         );
//     //     }
//     // };

//     const handleCheckboxChange = (event, rowData) => {
//         const isChecked = event.target.checked;

//         setRvData((prevRvData) => {
//             const updatedInvData = prevRvData.data.inv_data.map((row) => {
//                 if (row === rowData) {
//                     return { ...row, isSelected: isChecked };
//                 }
//                 return row;
//             });

//             const selectedRow = isChecked ? rowData : null;

//             return {
//                 ...prevRvData,
//                 data: {
//                     ...prevRvData.data,
//                     inv_data: updatedInvData,
//                 },
//                 secondTableArray: selectedRow
//                     ? [...prevRvData.secondTableArray, selectedRow]
//                     : prevRvData.secondTableArray.filter(
//                         (item) => item.DC_Inv_No !== rowData.DC_Inv_No
//                     ),
//             };
//         });


//     };

//     const [addVoucherPopup, setAddVoucherPopup] = useState(false)

//     console.log("recd pvid", selectRow.Cust_Name,selectedCustOption );
//     const addToVoucher = async () => {

//         if (selectRow.CustName !== selectedCustOption[0].Cust_Name) {
//             setAddVoucherPopup(true);
//         }

//         else {

//             try {
//                 const selectedRows = rvData.secondTableArray;
//                 const HOPrvId = selectRow.HOPrvId;
//                 console.log("first table arry", rvData.firstTableArray, rvData.data.receipt_details);

//                 // if(rvData.data.receipt_details.length>0 ){
//                 //       const selectedRow = rvData.firstTableArray[0];

//                 //       if (parseFloat(selectedRow.Receive_Now) < 0) {
//                 //         toast.error("Receive Now cannot be negative");
//                 //         return;
//                 //       }

//                 //       if (
//                 //         parseFloat(selectedRow.Receive_Now) +
//                 //           parseFloat(selectedRow.Amt_received) >
//                 //         parseFloat(selectedRow.Inv_Amount)
//                 //       ) {
//                 //         toast.error("Cannot Receive More than Invoice Amount");
//                 //         return;
//                 //       }


//                 //     }






//                 if (selectedRows.length === 0) {
//                     toast.error("No rows selected for addition to voucher.");
//                     return;
//                 }

//                 // Extract On Account value from rvData.postData
//                 let onAccountValue = parseFloat(selectRow.On_account) || 0;

//                 //   if (onAccountValue <= 0) {
//                 //     toast.error("On Account is already exhausted. Cannot add more rows.");
//                 //     return;
//                 //   }

//                 console.log("selected rows", selectedRows);



//                 const rowsToAdd = [];

//                 for (const row of selectedRows) {
//                     const balance = parseFloat(row.Balance);

//                     // Check if the row is not already in receipt_details
//                     const isRowAlreadyAdded = rvData.data.receipt_details.some(
//                         (existingRow) => existingRow.Dc_inv_no === row.DC_Inv_No
//                     );

//                     // Only add rows if there's enough On_account balance and the row is not already added
//                     if (!isRowAlreadyAdded) {
//                         if (balance <= onAccountValue) {
//                             rowsToAdd.push(row);
//                             onAccountValue -= balance;
//                         } else {
//                             rowsToAdd.push({ ...row, Balance: onAccountValue });
//                             onAccountValue = 0;
//                             break; // Stop adding rows if the On_account becomes 0
//                         }
//                     }
//                 }

//                 if (rowsToAdd.length === 0) {
//                     toast.error("Row already exists");
//                     return;
//                 }

//                 // Continue with the existing API call
//                 const response = await axios.post(
//                     baseURL + "/unitRV_Adjustment/addToVoucher",
//                     {
//                         selectedRows: rowsToAdd,
//                         HOPrvId,
//                     }
//                 );

//                 console.log("After API call: onAccountValue =", onAccountValue);

//                 // Filter out rows that already exist in receipt_details
//                 const newRows = response.data.filter(
//                     (newRow) =>
//                         !rvData.data.receipt_details.some(
//                             (existingRow) => existingRow.PVSrlID === newRow.PVSrlID
//                         )
//                 );

//                 // Update receipt_details and other data after addToVoucher API call
//                 setRvData((prevRvData) => ({
//                     ...prevRvData,
//                     data: {
//                         ...prevRvData.data,
//                         receipt_details: [...prevRvData.data.receipt_details, ...newRows],
//                         inv_data: prevRvData.data.inv_data.map((row) => ({
//                             ...row,
//                             isSelected: false,
//                         })),
//                     },

//                     secondTableArray: [],
//                 }));

//                 console.log("ONACCOUNTVALUE", onAccountValue);

//                 // Make API call to update On_account on the backend

//                 //   const updateOnAccountResponse = await axios.post(
//                 //     baseURL + "/Payment_Receipts/updateOnAccount",
//                 //     {
//                 //       onAccountValue: onAccountValue,
//                 //       RecdPVID: RecdPVID,
//                 //     }
//                 //   );

//                 //   setRvData((prevRvData) => ({
//                 //     ...prevRvData,
//                 //     postData: {
//                 //       ...prevRvData.postData,
//                 //       On_account:
//                 //         updateOnAccountResponse.data.updatedOnAccount[0]?.On_account,
//                 //     },
//                 //   }));
//                 return response.data;
//             } catch (error) {
//                 console.error("Error adding rows to voucher:", error);
//                 throw error;
//             }

//         }
//     };


//     const [cancelPopup, setCancelPopup] = useState(false)
//     const cancelSubmit = () => {
//         setCancelPopup(true)
//     }


//     return (
//         <>
//             {
//                 cancelPopup && <CancelModal setCancelPopup={setCancelPopup} cancelPopup={cancelPopup} />
//             }
//             {
//                 addVoucherPopup && <AddVoucherModal addVoucherPopup={addVoucherPopup}
//                     setAddVoucherPopup={setAddVoucherPopup}
//                 />
//             }
//             <div className="row col-md-12">
//                 <div className="col-md-10">
//                     <label className="form-label ">Create Adjustment Voucher for Receipt Voucher {selectRow.Recd_PVNo}</label>

//                 </div>
//                 <div className="col-md-2">
//                     <button style={{ width: '90px' }}
//                         className="button-style group-button "
//                         onClick={() => navigate("/HOAccounts")}
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//             <hr className="horizontal-line mt-2" />



//             <div className="row col-md-12 " >
//                 <div className="col-md-2">
//                     <label className="form-label ">Href No</label>
//                     <input class="" type="text" placeholder=""
//                         value={generatedNumber ? generatedNumber : "Draft"} disabled />
//                 </div>

//                 <div className="col-md-3">
//                     <label className="form-label">Date</label>
//                     <input
//                         className=""
//                         value={currentDate}
//                     // onChange={handleInputChange}
//                     />
//                 </div>

//                 <div className="col-md-2">
//                     <label className="form-label">Status</label>
//                     <input className="" value={'Draft'} disabled />
//                 </div>

//                 <div className="col-md-4 ">
//                     <label className="form-label">Receive Form</label>
//                     <input className="" value={selectRow.CustName} type="text" disabled />
//                 </div>


//             </div>







//             <div className="row col-md-12 " style={{}}>

//                 <div className="col-md-2">

//                     <label className="form-label"> Type</label>
//                     <select className="ip-select">
//                         <option value="option 1">Cash</option>
//                         <option value="option 2">Online Payment</option>
//                         <option value="option 3">Cheque</option>
//                     </select>
//                 </div>



//                 <div className="col-md-3">
//                     <label className="form-label">Amount</label>
//                     <input className="" />
//                 </div>

//                 <div className="col-md-3">
//                     <label className="form-label">HO Reference</label>
//                     <input className="" value={'Draft'} disabled />
//                 </div>


//                 <div className="col-md-3">
//                     <label
//                         className="form-label"
//                     >
//                         Description
//                     </label>
//                     <textarea value={selectRow.Description}
//                         className="form-control"
//                         rows="2"
//                         id=""
//                         style={{ height: "60px", resize: "none" }}
//                     ></textarea>
//                 </div>


//             </div>

//             <div className=" row col-md-12" style={{gap:'50px'}}>



//                 <div className="col-md-1 ">
//                     <button className="button-style group-button" style={{ width: '90px' }}>Save</button>
//                 </div>

//                 <div className="col-md-1">
//                     <button className="button-style group-button"
//                         style={{ width: '90px'}}>Delete</button>
//                 </div>

//                 <div className=" col-md-1 ">
//                     <button className="button-style group-button" style={{ width: '90px' }}>Post</button>
//                 </div>
//                 <div className=" col-md-1 ">
//                     <button className="button-style group-button"
//                         style={{ width: '90px' }}>Print</button>
//                 </div>

//                 <div className=" col-md-1 ">
//                     <button className="button-style group-button"
//                         style={{ width: '90px' }}
//                         onClick={cancelSubmit}
//                     >Cancel</button>
//                 </div>
//             </div>








//             <div className="row col-md-12">
//                 <div className="col-md-6 mt-2 mb-3">
//                     <div className="row col-md-12 mt-2">

//                         <div className="col-md-4 mt-2">
//                             <label className="form-label">Against Invoices</label>
//                         </div>

//                         <div className="col-md-4">
//                             <button className="button-style group-button ">
//                                 Remove Invoice
//                             </button>
//                         </div>

//                         <div className="col-md-4">
//                             <label className="form-label" style={{ whiteSpace: 'nowrap' }}>Amount Adjusted</label>
//                             <input type='text' value={selectRow.On_account} />
//                         </div>


//                     </div>

//                     <div
//                         style={{
//                             height: "250px",
//                             overflowY: "scroll",
//                             overflowX: "scroll",
//                         }}
//                     >
//                         <Table className="table-data border mt-2">
//                             <thead
//                                 className="tableHeaderBGColor"
//                                 style={{ textAlign: "center" }}
//                             >
//                                 <tr>
//                                     <th style={{ whiteSpace: 'nowrap' }}>Srl no</th>
//                                     <th>Amount</th>
//                                     <th style={{ whiteSpace: 'nowrap' }}>Invoice No</th>
//                                     <th style={{ whiteSpace: 'nowrap' }}>Date</th>
//                                     <th style={{ whiteSpace: 'nowrap' }}>Type</th>
//                                     <th style={{ whiteSpace: 'nowrap' }}>Account</th>
//                                     <th style={{ whiteSpace: 'nowrap' }}>Received</th>
//                                     <th style={{ whiteSpace: 'nowrap' }}>Receive Now</th>
//                                     <th style={{ whiteSpace: 'nowrap' }}>Id</th>


//                                 </tr>
//                             </thead>

//                             <tbody className="tablebody">
//                                 {rvData.data.receipt_details
//                                     ? rvData.data.receipt_details.map((data, index) => (
//                                         <>
//                                             <tr
//                                                 style={{ whiteSpace: "nowrap" }}
//                                                 //   onClick={() => handleRowSelect(data)}
//                                                 key={data.PVSrlID}
//                                                 className={
//                                                     rvData.firstTableArray.some(
//                                                         (row) => row.Dc_inv_no === data.Dc_inv_no
//                                                     )
//                                                         ? "selectedRow"
//                                                         : ""
//                                                 }
//                                             >
//                                                 {/* <td>{data.RecdPvSrl}</td> */}
//                                                 <td>{index + 1}</td>

//                                                 <td>{data.Inv_No}</td>

//                                                 <td>
//                                                     {new Date(data.Inv_date)
//                                                         .toLocaleDateString("en-GB")
//                                                         .replace(/\//g, "-")}
//                                                 </td>

//                                                 <td>{data.Inv_Type}</td>
//                                                 <td>{(data.Inv_Amount)}</td>
//                                                 <td>{(data.Amt_received)}</td>
//                                                 <td>
//                                                     <input
//                                                         //type="number"
//                                                         // onBlur={onBlurr}
//                                                         name="Receive_Now"
//                                                         value={(data.Receive_Now)}
//                                                         // onChange={(e) =>
//                                                         //   handleInputChange(
//                                                         //     e,
//                                                         //     data.Inv_No,
//                                                         //     data.Receive_Now
//                                                         //   )
//                                                         // }

//                                                         // disabled={rvData && rvData.postData.ReceiptStatus !== "Draft"
//                                                         //   ? rvData.postData.ReceiptStatus
//                                                         //   : ""}

//                                                         onKeyPress={(e) => {
//                                                             // Allow only numbers (0-9) and backspace
//                                                             const isNumber = /^[0-9\b]+$/;
//                                                             if (!isNumber.test(e.key)) {
//                                                                 e.preventDefault();
//                                                             }
//                                                         }}
//                                                     />
//                                                 </td>
//                                                 <td>{data.RefNo}</td>
//                                                 <td>
//                                                     <input
//                                                         type="checkbox"
//                                                     // checked={
//                                                     //   rvData.postData.InvUpdated === 1
//                                                     //     ? rvData.postData.InvUpdated
//                                                     //     : ""
//                                                     // }
//                                                     // onChange={(e) => handlesaveChange(rv.Inv_No)}
//                                                     />
//                                                 </td>
//                                             </tr>
//                                         </>
//                                     ))
//                                     : ""}
//                             </tbody>
//                         </Table>
//                     </div>
//                 </div>


//                 <div className="col-md-6 mt-2">
//                     <div className="row col-md-12 mb-2">
//                         <label
//                             className="form-label col-md-3"
//                             style={{ whiteSpace: "nowrap", marginTop: "10px" }}
//                         >
//                             Select Invoices
//                         </label>

//                         <div className="col-md-3 mt-3">
//                             <Typeahead
//                                 id="basic-example"
//                                 labelKey={(option) =>
//                                     option && option.Cust_Name
//                                         ? option.Cust_Name.toString()
//                                         : ""
//                                 }
//                                 options={getCustNames}
//                                 placeholder="Select Customer"
//                                 onChange={handleSelectCustomer}
//                                 selected={selectedCustOption}
//                             />
//                         </div>

//                         <div className=" col-md-4 ms-5 mb-1">
//                             <button className="button-style group-button "
//                                 onClick={addToVoucher}
//                             >
//                                 Add Invoice
//                             </button>
//                         </div>
//                     </div>

//                     <div
//                         style={{
//                             height: "250px",
//                             overflowY: "scroll",
//                             overflowX: "scroll",
//                         }}
//                     >
//                         <Table className="table-data border mt-3">
//                             <thead
//                                 className="tableHeaderBGColor"
//                                 style={{ textAlign: "center" }}
//                             >
//                                 <tr style={{ whiteSpace: "nowrap" }}>
//                                     <th>Select</th>
//                                     <th>Type</th>
//                                     <th>Invoice No</th>
//                                     <th>Rate</th>
//                                     <th>Grand Total</th>
//                                     <th>Amount Received</th>
//                                 </tr>
//                             </thead>

//                             <tbody className='tablebody'>



//                                 {

//                                     selectedCustCode === ''
//                                         ?
//                                         rvData.data.inv_data.map((item, rowIndex) => {
//                                             return (

//                                                 <tr key={rowIndex} >
//                                                     <td><input type='checkbox'
//                                                         checked={rowChecked[rowIndex]} // Use the checked state for this row
//                                                         onChange={(e) => handleCheckboxChange(e, item)}

//                                                     /></td>
//                                                     <td>
//                                                         <input style={{ border: 'none', width: '70px' }}
//                                                             type='text'
//                                                             value={item.DC_InvType}
//                                                         //   onChange={(e) => handleChange(rowIndex, 'DC_InvType', e.target.value)}


//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <input style={{ border: 'none', width: '70px' }}
//                                                             type='text'
//                                                             value={item.Inv_No}
//                                                             onChange={(e) => handleChange(rowIndex, 'Inv_No', e.target.value)}
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <input style={{ border: 'none', width: '90px' }}
//                                                             type='text'
//                                                             value={item.Formatted_Inv_Date}
//                                                             onChange={(e) => handleChange(rowIndex, 'Formatted_Inv_Date', e.target.value)}
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <input style={{ border: 'none', width: '70px' }}
//                                                             type='text'
//                                                             value={item.GrandTotal}
//                                                             onChange={(e) => handleChange(rowIndex, 'GrandTotal', e.target.value)}
//                                                         />
//                                                     </td>

//                                                     <td>
//                                                         <input style={{ border: 'none', width: '70px' }}
//                                                             type='text'
//                                                             value={item.PymtAmtRecd}
//                                                             onChange={(e) => handleChange(rowIndex, 'PymtAmtRecd', e.target.value)}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             )
//                                         }) :





//                                         <tr  >
//                                             <td><input type='checkbox'

//                                             /></td>
//                                             <td>
//                                                 <input style={{ border: 'none', width: '70px' }}
//                                                     type='text'
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input style={{ border: 'none', width: '70px' }}
//                                                     type='text'
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input style={{ border: 'none', width: '90px' }}
//                                                     type='text'
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input style={{ border: 'none', width: '70px' }}
//                                                     type='text'
//                                                 />
//                                             </td>

//                                             <td>
//                                                 <input style={{ border: 'none', width: '70px' }}
//                                                     type='text'
//                                                 />
//                                             </td>
//                                         </tr>


//                                 }
//                             </tbody>
//                         </Table>
//                     </div>
//                 </div>
//             </div>


//         </>
//     )
// }
