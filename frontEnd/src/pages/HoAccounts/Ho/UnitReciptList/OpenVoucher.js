import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Typeahead } from 'react-bootstrap-typeahead';
import { baseURL } from '../../../../api/baseUrl';

export default function OpenVoucher() {

    const [getCustomers, setGetCustomers] = useState([]);
    const [invoiceListData, setInvoiceListData]=useState([])
    const [selectRow, setSelectRow] = useState('');
    const [selectedCustCode, setSelectedCustCode] = useState("");
    
    useEffect(() => {
        customers();
        if(selectedCustCode){
            basedOnCustomer();
        }
     
    }, [selectedCustCode])


    useEffect(() => {
        if (selectRow) {
          handleNavigation(selectRow);
        }
      }, [selectRow]);

    const customers = () => {
        axios.get(baseURL+'/unitReceiptList/getcustomerdata')
            .then((res) => {
                setGetCustomers(res.data.Result)
            })
            .catch((err) => {
                console.log("err");
            })
    }


    const basedOnCustomer=()=>{
        axios.get(baseURL+'/unitReceiptList/receiptBasedOnCustomer', {
            params: {
                selectedCustCode: selectedCustCode
            },
        })
        .then((res) => {
            setInvoiceListData(res.data.Result)
        })
        .catch((err) => {
            console.log("err");
        })
    }
    const navigate = useNavigate();
    //console.log("cust", invoiceListData);

    
    // const [selectedOption, setSelectedOption] = useState([{ Cust_name: 'MAGOD LASER MACHINING PVT LTD' }]);
    const [selectedOption, setSelectedOption] = useState([]);
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


   
   
    const selectedRowFun = (item, index) => {
        let list = { ...item, index: index }
        //  setSelectRow(initial)
       
        // console.log("se",list)
        setSelectRow(list);  
        
    }

    console.log("selectedrow",selectRow)
    
    const handleNavigation=(selectRow)=>{
        navigate("/HOAccounts/HO/Openvoucher", {state:{selectRow }});
   }
    

   const handleOpenVoucherClick = () => {
    if (invoiceListData.length > 0) {
        const firstRowData = invoiceListData[0];
        navigate("/HOAccounts/HO/Openvoucher", { state: { selectRow: firstRowData } });
    }
}

   
    return (
        <div>
            <div className='col-md-12'>
                <div className='row'>
                    <h4 className='title '>Receipt Voucher List </h4>
                </div>
            </div>


            <div className='row mt-1'>
                <div className='col-md-3 mt-2'>

                    <label className="form-label" style={{ whiteSpace: 'nowrap' }}>Payment Receipt Vouchers</label>
                </div>


                <div className="col-md-2">
                    <label className="form-label">Search</label>
                    <input type='search'></input>
                </div>

                <div className="col-md-3">
                    <button className="button-style mt-2 group-button"
                        style={{ width: "150px", marginLeft: "20px" }} 
                        
                        // onClick={() => navigate("/HOAccounts/HO/Openvoucher")}
                        onClick={handleOpenVoucherClick}
                        >
                        Open Voucher
                    </button>
                </div>

                <div className="col-md-3">
                    <button className="button-style mt-2 group-button"
                        onClick={() => navigate("/home")}>
                        Close
                    </button>
                </div>


            </div>


            <div className='row'>
                <div className='col-md-3'>
                    <label className="form-label">Select Unit</label>
                    <select className="ip-select">
                        <option value="option 1"> Jigani</option>
                        <option value="option 2">Peenya</option>

                    </select>
                </div>

                <div className='col-md-3'>
                    <label className="form-label">Select Customer</label>
                    {/* <select className="ip-select ">
                        <option value="option 1"> Name1</option>
                        <option value="option 2">Name2</option>
                        <option value="option 3">Name3</option>
                    </select> */}
                    <Typeahead

                        id="basic-example"
                        labelKey={(option) => (option && option.Cust_name ? option.Cust_name.toString() : '')}
                        valueKey="Cust_Code"
                        options={getCustomers}
                        placeholder="Select Customer"

                        onChange={handleTypeaheadChange}
                        selected={selectedOption}
                    />
                </div>
            </div>



            <div className='col-md-12 mt-3' style={{ height: '500px', overflowX: 'scroll', overflowY: 'scroll' }}>

                <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor">
                        <tr
                        
                        >


                            <th style={{ whiteSpace: 'nowrap' }}>Receipt VrNo</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Receipt Status</th>


                            <th style={{ whiteSpace: 'nowrap' }}>Date</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Customer</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Transaction Type</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Amount</th>
                            <th style={{ whiteSpace: 'nowrap' }}>On Account</th>
                            <th style={{ whiteSpace: 'nowrap' }}>Description</th>


                        </tr>

                    </thead>

                    <tbody className='tablebody'>

                      {
                        invoiceListData.map((item, key)=>{
                            return(
                                <tr
                                onClick={() => {
                                    selectedRowFun(item, key);
                                    console.log("items",item);
                                }}

                                className={key === selectRow?.index ? 'selcted-row-clr' : ''}
                                >
                                <td>{item.Recd_PVNo}</td>
                                <td></td>
                                <td style={{whiteSpace:'nowrap'}}>{item.Formatted_Recd_PV_Date}</td>
                                <td style={{whiteSpace:'nowrap'} }>{item.CustName}</td>
                                <td>{item.TxnType}</td>
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
        </div>
    );
}
