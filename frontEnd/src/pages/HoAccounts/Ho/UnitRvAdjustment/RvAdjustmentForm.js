import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Typeahead } from 'react-bootstrap-typeahead';

const initial={
    HoRefDate:'', TxnType:'', Amount:'', Description:'',HORef:'', Status:''
}

export default function RvAdjustmentForm() {

    const [rvAdjustmentData, setRvAdjustmentData] = useState([]);
    const [getCustomer, setGetCustomer] = useState([])
    //const [searchQuery, setSearchQuery] = useState('')
    const [selectedCustCode, setSelectedCustCode] = useState("");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        AdjsutmentSubmit()
        getCustomersSubmit()
    }, [selectedCustCode, showAll])

    const AdjsutmentSubmit = () => {
        if (showAll) {
            axios.get('http://localhost:3001/unitRV_Adjustment/rvAdjustment',)
                .then((res) => {
                    setRvAdjustmentData(res.data.Result)
                })
                .catch((err) => {
                    console.log("err");
                })
        }
        else {
            axios.get('http://localhost:3001/unitRV_Adjustment/rvAdjustment', {
                params: {
                    selectedCustCode: selectedCustCode
                },
            })
                .then((res) => {
                    setRvAdjustmentData(res.data.Result)
                })
                .catch((err) => {
                    console.log("err");
                })
        }

    }

    const getCustomersSubmit = () => {
        axios.get('http://localhost:3001/unitRV_Adjustment/getCustomers')
            .then((res) => {
                setGetCustomer(res.data.Result)
                //console.log("cust", res.data.Result);
            })
            .catch((err) => {
                console.log("err");
            })
    }

    const [selectedOption, setSelectedOption] = useState([{ Cust_name: 'MAGOD LASER MACHINING PVT LTD' }]);
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
    const navigate = useNavigate();

    const [selectRow, setSelectRow] = useState(initial);
    const selectedRowFun = (item, index) => {
        let list = { ...item, index: index }
        //  setSelectRow(initial)


        setSelectRow(list);
        // setState(true);

    }
    function handleButtonClick(selectRow) {
    
        
        navigate("/HOAccounts/HO/AdjustmentVoucher", {state:{selectRow }});
      }
      
    
    return (
        <div>
            
            <div className='col-md-12'>
                <div className='row'>
                    <h4 className='title '>HO Receipt Adjuster</h4>
                </div>
            </div>
            <div className='row mt-1'>

                <div className="col-md-2">
                    <label className="form-label">Select Unit</label>
                    <select className="ip-select">
                        <option value="option 1"> Jigani</option>
                        <option value="option 2">Peenya</option>
                        <option value="option 3">Name3</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <label className="form-label" >Select Customer</label>
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


                <div className="col-md-3 mt-2">
                    <button className="button-style mt-2 group-button"
                        style={{ width: "180px", marginLeft: "20px" }}
                        onClick={() => 
                            
                            {
                            console.log('data', selectRow);
                            handleButtonClick(selectRow);}
                        }
                        >
                        Adjustment Voucher
                    </button>
                </div>
                <div className="col-md-2 mt-2">
                    <button className="button-style mt-2 group-button"
                        onClick={e => navigate("/home")}  >
                        Close
                    </button>
                </div>

                <div className='row col-md-3  mt-3  ' >

                    <div className='col-md-1 mt-3'>
                        <input className="  custom-checkbox"
                            type="checkbox"
                            onChange={() => setShowAll(!showAll)} />
                    </div>


                    <div className=' col-md-3 ' >
                        <label className="form-label" style={{whiteSpace:'nowrap'}}>Show All</label>
                    </div>


                </div>

            </div>




            <div className='col-md-12'>
                <div className='mt-3 col-md-12'>
                    <div style={{ height: "400px", overflowY: "scroll", overflowX: 'scroll' }}>
                        <Table className='table-data border' striped>
                            <thead className='tableHeaderBGColor' >
                                <tr>
                                    <th style={{ whiteSpace: 'nowrap' }}>Rv No</th>
                                    {showAll && <th>Cust_Code</th>}
                                    {showAll && <th>Cust_name</th>}
                                    <th>Amount</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>On Account</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Receipt Status</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Rv Date</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Description</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Txn Type</th>
                                </tr>
                            </thead>


                            <tbody className='tablebody'>
                                {
                                    rvAdjustmentData.map((item, key) => {
                                        return (
                                            <tr  onClick={() => selectedRowFun(item, key)}

                                            className={key === selectRow?.index ? 'selcted-row-clr' : ''}>
                                                <td style={{ whiteSpace: 'nowrap' }}>{item.Recd_PVNo}  </td>
                                                {
                                                    showAll && <td>{item.Cust_code}</td>
                                                }
                                                {
                                                    showAll && <td style={{ whiteSpace: 'nowrap' }}>{item.CustName}</td>
                                                }
                                                <td>{item.Amount}</td>
                                                <td>{item.On_account}</td>
                                                <td>{item.ReceiptStatus}</td>
                                                <td style={{ whiteSpace: 'nowrap' }}>{item.Formatted_Recd_PV_Date}</td>
                                                <td>{item.Description}</td>
                                                <td>{item.TxnType}</td>
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
    );
}
