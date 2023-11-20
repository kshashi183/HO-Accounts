import React, { useState,useRef } from "react";
import ImportOpenInvoice from "./ImportOpenInvoice";
import ImportOpenReceipt from "./ImportOpenReceipt";
import ImportHoReceiptVoucher from "./ImportHoReceiptVoucher";
import TallyInvoicesSync from "./TallyInvoicesSync";
import { Tab, Tabs } from "react-bootstrap";

export default function Import(props) {
  const fileInputRef = useRef(null);
  const [xmlData, setXmlData] = useState(props.data);
  const [flag, setFlag] = useState(false)
  const [dataa, setData] =useState({
    open_inv:[],
    open_rec:[]
  })
  const [updatedataa, setupdateData] =useState({
    open_inv:[],
    open_rec:[]
  })
  const [receipt_data,setReceiptData] = useState([])
  const [report,setReport] = useState([])
  console.log("propssss", props);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    console.log("1111111111");
    const file = event.target.files[0];
    const reader = new FileReader();


    reader.onload = (e) => {
      const xmlString = e.target.result;
    
      const parsedData = parseXmlData(xmlString);
      console.log("xml IMPORTED DATA ", parsedData);
      setReceiptData(xmlString)
     sync_data(parsedData)
      };
      reader.readAsText(file);
    };




    const sync_data = (parsedData)=>{
      // Check and sync for open_inv
      // console.log("parseddata.......", parsedData);
      const syncedData = [];
      const syncedData1 = [];
      const missingInParsed = [];
      const missingInData = [];
      const syncedData2 =[];

      props.data.open_inv.forEach((unitInv) => {
        const matchedInv = parsedData.open_inv.find((importInv) => parseInt(importInv.DC_Inv_No) === parseInt(unitInv.DC_Inv_No));
        if (matchedInv) {
          if (
            parseInt(matchedInv.PymtAmtRecd) !== parseInt(unitInv.PymtAmtRecd) ||
            parseInt(matchedInv.GrandTotal) !== parseInt(unitInv.GrandTotal) ||
            matchedInv.DCStatus !== unitInv.DCStatus
          ) {
            syncedData.push({
              ...unitInv,
              UnitName: matchedInv.UnitName,
              
              Remarks: 'Value Different',
              DC_Inv_No: matchedInv.DC_Inv_No,
              Unit_PymtAmtRecd: unitInv.PymtAmtRecd,
              Unit_GrandTotal: unitInv.GrandTotal,
              Unit_DCStatus: unitInv.DCStatus,
              Unit_DC_InvType:unitInv.DC_InvType,
              Unit_Cust_Name:unitInv.Unit_Cust_Name,
              Unit_Inv_No:unitInv.Inv_No
              
            });
            syncedData1.push({
              ...unitInv,
              UnitName: matchedInv.UnitName,
              
              Remarks: 'Value Different',
              DC_Inv_No: matchedInv.DC_Inv_No,
              Unit_PymtAmtRecd: unitInv.PymtAmtRecd,
              Unit_GrandTotal: unitInv.GrandTotal,
              Unit_DCStatus: unitInv.DCStatus,
              
            });
          }
          else{
            syncedData1.push({
              ...matchedInv,
              UnitName: matchedInv.UnitName,
              
              DC_Inv_No: matchedInv.DC_Inv_No,
              Unit_PymtAmtRecd: unitInv.PymtAmtRecd,
              Unit_GrandTotal: unitInv.GrandTotal,
              Unit_DCStatus: unitInv.DCStatus,
              
            });
          }

        } 
        
        else {
          // Record in parsedData is missing in data
          syncedData1.push({
            ...unitInv,
            Remarks: 'Closed or Missing in HO',
            UnitName: unitInv.UnitName,
          
            DC_Inv_No: unitInv.DC_Inv_No,
            Unit_PymtAmtRecd: unitInv.PymtAmtRecd,
            Unit_GrandTotal: unitInv.GrandTotal,
            Unit_DCStatus: unitInv.DCStatus,
            
         
            HO_DCStatus: 'Unknown',
            //Remarks: 'Closed or Missing in HO',
          });
        }
      });
      setData((prevData) => ({ ...prevData, open_inv: syncedData1 }));
      setupdateData((prevDatanew) => ({ ...prevDatanew, open_inv: syncedData}))
    }
    const parseXmlData = (xmlString) => {
      console.log("");
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      const multiMediaNodesunit = xmlDoc.querySelectorAll('MagodUnits');
      const multiMediaNodes = xmlDoc.querySelectorAll('unit_invoices_list');
      const multiMediaNodes1 = xmlDoc.querySelectorAll('unit_recipts_register');
      const parsedData = {
        open_inv:[],
        open_rec:[]
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
    //extractData(multiMediaNodesunit, unitname);
    extractData(multiMediaNodes1, parsedData.open_rec);
    extractData(multiMediaNodes, parsedData.open_inv);
      setReport(parsedData)
        return parsedData;
      
    }; 

    const postData = async()=>{
     
    }
  return (
    <div>
      <div className="row">
      <input
          type="file"
        accept=".xml"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileSelect}/>
        <div className="col-md-4 mb-3 col-sm-12">
          <button className="button-style  group-button"style={{ width: "190px" }}
          onClick={handleButtonClick} >
            Import Open Sync File
          </button>
        </div>
        <div className="col-md-4 mb-3 col-sm-12" >
          <button className="button-style  group-button" style={{ width: "110px" }} 
          onClick={postData} 
          >
            Update Unit
          </button>
        </div>
      </div>

      <Tabs style={{fontSize: "13px"}}>
        <Tab eventKey="openInvoice" title="Open Invoice">
          <ImportOpenInvoice data={dataa.open_inv}/>
        </Tab>
        <Tab eventKey="openReceipts" title="Open Receipts">
          <ImportOpenReceipt />
        </Tab>
        <Tab eventKey="hoReceiptVoucher" title="Ho Receipt Voucher">
          <ImportHoReceiptVoucher />
        </Tab>
        <Tab eventKey="tallyInvoicesSync" title="Tally Invoices Sync">
          <TallyInvoicesSync />
        </Tab>
      </Tabs>
    </div>
  );
}
