import { Tab } from 'bootstrap';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Tabs } from 'react-bootstrap';
import UnitOutStanding from '../Tables/UnitOutStanding';
import CustomerOutStanding from '../Tables/CustomerOutStanding';
import HeaderData from './HeaderData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
// import PreviewReportPdf from '../../../../../PDF/PreviewReportPdf';
import { Typeahead } from 'react-bootstrap-typeahead';
import PreviewReportPdf from '../../../../../PDF/PreviewReportPdf';
import { baseURL } from '../../../../../api/baseUrl';
// import PreviewReportPdf from '../../../../../../PDF/PreviewReportPdf';



export default function TabData() {


  // let dummydata = [
  //   {
  //   Cust_Code: "Alabama",

  //     population: 4780127,

  //     capital: "Montgomery",

  //     region: "South",
  //   },


  // ];

  let [selected, setSelected] = useState("");
  const contentRef = React.useRef();
  const [selectedOption, setSelectedOption] = useState([{ Cust_name: 'MAGOD LASER MACHINING PVT LTD' }]);



  // Create a reference for the ReactToPrint component

  const printRef = React.useRef();



  const handlePrintButtonClick = () => {

    printRef.current.handlePrint();
  };

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [key, setKey] = useState("unit_O");
  const [customersData, setCustomersData] = useState([]);
  const [selectedCustCode, setSelectedCustCode] = useState("0000");

  useEffect(() => {
    getCustomerData();
  }, [])

  console.log("11111111111111");
  // const handleChange = (event) => {
  //   const selectedCode = event.target.value;
  //   setSelectedCustCode(selectedCode);
  // };
  // const handleSubmit = (Cust_Code) => {

  //   console.log("cust code1", Cust_Code);
  // }
  const getCustomerData = () => {
   
    axios.get(baseURL+'/customerOutstanding/getCustomers')
      .then((res) => {
        console.log("get customers", res.data.Result);
        setCustomersData(res.data.Result)
      })

  }




  
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
  
  

//  console.log("dadadDDDD", customersData);
  return (
    <>
      <div className='col-md-12'>
        <div className='row'>
          <div className='title '><h4>Unit Invoices List </h4></div>
        </div>
      </div>
      <div className='row mt-1'>

        <div className="col-md-3">
          <label className="form-label" >Select Customer</label>
        

          <Typeahead

            id="basic-example"
            labelKey={(option) => (option && option.Cust_name ? option.Cust_name.toString() : '')}
            valueKey="Cust_Code"
            options={customersData}
            placeholder="Select Customer"

            onChange={handleTypeaheadChange}
            selected={selectedOption}
            
          />


        </div>

        <div className="col-md-3">
          <label className="form-label">Search Inv No</label>
          <input className='' type='search'
            placeholder="Search Invoice Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          
          ></input>
        </div>


        <div className="col-md-3">
          <button className="button-style mt-2 group-button"
            onClick={handlePrintButtonClick}
            style={{ width: "150px", marginLeft: "20px" }}>
            Print
          </button>
          <ReactToPrint

            trigger={() => <div style={{ display: 'none' }}><PreviewReportPdf ref={contentRef} selectedCustCode={selectedCustCode} /></div>}

            content={() => contentRef.current}

            ref={printRef} // Attach the reference to the ReactToPrint component

            documentTitle="Preview Report"

          />
        </div>
        <div className='col-md-3 '>
          <button className="button-style mt-2 group-button" type='button'

            onClick={e => navigate("/HOAccounts")}
          >
            Close
          </button>

        </div>

      </div>
      <div>

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className=" mt-3 tab_font"
        >
          <Tab eventKey="unit_O" title="Unit Outstanding">
            <UnitOutStanding />
          </Tab>

          <Tab eventKey="customer_O" title="Customer Outstanding">
            <CustomerOutStanding selectedCustCode={selectedCustCode} searchQuery={searchQuery} />
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
