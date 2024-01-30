import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { baseURL } from "../../../../api/baseUrl";
import xmljs from 'xml-js';

export default function SyncUnit() {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState([]);
  const [unitCustData, setUnitCustData] = useState([]);
  const [buttonTF, setButtonTF] = useState(false)

  const handleButtonClick = () => {

    fileInputRef.current.click();
    console.log("Xml File", fileInputRef);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const xmlString = e.target.result;

        const parsedData = parseXmlData(xmlString);
        // setReceiptData(xmlString);
        setUnitCustData(parsedData.unit_cust_data);
        // setInvoiceTax(parsedData.open_inv_tax);
        // setVendorList(parsedData.open_vendor_data);
        // sync_data(parsedData);
        console.log("jjjj", parsedData);
      };
      reader.readAsText(file);
    } else {
      console.error("No valid file selected.");
    }
  };

  const parseXmlData = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const multiMediaNodesunit = xmlDoc.querySelectorAll("MagodUnits");
    const multiMediaNodes = xmlDoc.querySelectorAll("Unit_Cust_Data");
    const multiMediaNodes1 = xmlDoc.querySelectorAll("unit_invoices_list");
    const multiMediaNodes2 = xmlDoc.querySelectorAll("unit_taxes_list");
    const multiMediaNodes3 = xmlDoc.querySelectorAll("dc_inv_summary");
    const multiMediaNodes4 = xmlDoc.querySelectorAll("unit_recipts_register");
    const multiMediaNodes5 = xmlDoc.querySelectorAll(
      "unit_receipts_adjusted_inv_list"
    );
    const multiMediaNodes6 = xmlDoc.querySelectorAll("canceled_vouchers_list");
    const parsedData = {
      unitname: [],
      unit_cust_data: [],
      unit_inv_list: [],
      unit_taxes_list: [],
      unit_dc_summary: [],
      unit_receipt_register: [],
      unit_receipt_adjusted_list: [],
      unit_cancelled_vr_list: [],
    };
    // Function to extract data dynamically from nodes
    const extractData = (nodes, targetArray) => {
      nodes.forEach((node) => {
        const mediaObject = {};

        node.childNodes.forEach((childNode) => {
          if (childNode.nodeType === Node.ELEMENT_NODE) {
            mediaObject[childNode.tagName] = childNode.textContent;
          }
        });
        targetArray.push(mediaObject);
      });
    };

    // Call the function for both arrays
    extractData(multiMediaNodesunit, parsedData.unitname);
    extractData(multiMediaNodes, parsedData.unit_cust_data);
    extractData(multiMediaNodes1, parsedData.unit_inv_list);
    extractData(multiMediaNodes2, parsedData.unit_taxes_list);
    extractData(multiMediaNodes3, parsedData.unit_dc_summary);
    extractData(multiMediaNodes4, parsedData.unit_receipt_register);
    extractData(multiMediaNodes5, parsedData.unit_receipt_adjusted_list);
    extractData(multiMediaNodes6, parsedData.unit_cancelled_vr_list);
    setReport(parsedData);
    return parsedData;
  };

  useEffect(() => {
    try {

      if (
        report.unit_cust_data.length > 0 ||
        report.unit_inv_list.length > 0 ||
        report.unit_taxes_list.length > 0 ||
        report.unit_receipt_register.length > 0 ||
        report.unit_receipt_adjusted_list.length > 0 ||
        report.unit_dc_summary.length > 0 ||
        report.unit_cancelled_vr_list.length > 0
      ) {
     handleInsertData();
      }
    } catch (err) {
      console.log("The length is zero Initially");
    }
  }, [report]);

  const [xmlAlldata, setXmlData] = useState({
    custXml: [],
    invoiceXml: [],
    invoiceTaxXml: []

  })
  const handleInsertData = async() => {
    setIsLoading(true);

    const handleRequest = async (url, successMessage) => {
      axios
        .post(baseURL + url, report)
        .then((res) => {

          console.log(`${successMessage} data inserted successfully`, res.data);
          toast.success(`${successMessage} data inserted successfully`);

          if (res.data.CustData === 'saveCustData') {
            console.log("Received responseData:", res.data.responseData)
            const m = res.data.responseData.map((i) => {
             // console.log("item colmn", i.CustAllData.UnitName, i.CustAllData.Sync_HOId);
            })

            setXmlData(prevData => ({
              ...prevData,
              custXml: res.data.responseData
            }));
       
          }
          else {
            console.log("Kfghj");
          }



        })
        .catch((err) => {
          console.log("Error in table", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
         handleExport();
      
    };


    // Handle each type of data insertion
    await  handleRequest("/fromUnitSync/saveCustDataIntoHoDB", "Customer");
    // handleRequest("/fromUnitSync/saveInvDataIntoHoDB", "Invoice");
    // handleRequest("/fromUnitSync/saveInvTaxesDataIntoHoDB", "Invoice Taxes");
    // handleRequest("/fromUnitSync/saveInvSummaryDataIntoHoDB", "DcInvoice");

    // handleRequest(
    //   "/fromUnitSync/saveReceiptRegisterDataIntoHoDB",
    //   "Receipt Register"
    // );
    // handleRequest(
    //   "/fromUnitSync/saveReceptDetailsDataIntoHoDB",
    //   "Receipt Details"
    // );
    // handleRequest(
    //   "/fromUnitSync/saveCanceledVrListDataIntoHoDB",
    //   "Cancelled Vr"
    // );



    // handleExport();
  };

  //console.log(report);
  // console.log(unitCustData);
   console.log("xml data", xmlAlldata.custXml);

 

  const tableToXml = () => {
    
    console.log("xml data111", xmlAlldata.custXml);
    const xmlData = {
      ENVELOPE: {
          HEADER: {
              TALLYREQUEST: { _text: 'Import Data' }
          },
          Unit_Cust_Data_SyncInfo: xmlAlldata.custXml.map((item, index) => ({
        Id: item.CustAllData.Sync_HOId,
        UnitName:item.CustAllData.UnitName
        
      
      })),

      },
    
      

    };

    const xml = xmljs.js2xml(xmlData, { compact: true, spaces: 2 });
    return xml;
  };











  const handleExport = () => {
    const xml = tableToXml();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cust data.xml';
    a.click();
    window.URL.revokeObjectURL(url);

    // exportInvoices(xml);
  };

  return (
    <>
      <div className={`col-md-12 ${isLoading ? "loading" : ""}`}>
        <div className="row">
          <h4 className="title">From Unit Sync</h4>
        </div>

     
      </div>
      <div className="col-md-12">
        <button
          className={`button-style mt-2 group-button ${isLoading ? "loading" : ""
            }`}
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "From Unit Sync"}
        </button>
        <input
          type="file"
          accept=".xml"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </div>
      {isLoading && <Spinner />}
    </>
  );
}
