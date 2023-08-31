import React from "react";
import InvoiceSummary from "./MonthlyReportTabs/InvoiceSummary";
import TaxSummary from "./MonthlyReportTabs/TaxSummary";
import ClearanceSummary from "./MonthlyReportTabs/ClearanceSummary";
import CollectionSummary from "./MonthlyReportTabs/CollectionSummary";
import CustomerValueAddition from "./MonthlyReportTabs/CustomerValueAddition";
import SalesOutstandingBills from "./MonthlyReportTabs/SalesOutstandingBills";
import AllOutstandingBills from "./MonthlyReportTabs/AllOutstandingBills";
import MachineUtilisation from "./MonthlyReportTabs/MachineUtilisation";
import MaterialSalesSummary from "./MonthlyReportTabs/MaterialSalesSummary";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function MonthlyReport() {
  const navigate=useNavigate();
  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">HO Accounts Monthly Report</h4>
        </div>
      </div>
<div className=" row col-md-12">
<div className=" row col-md-12">
{/* <h6 className="mt-2 col-md-3">Unit Monthly Report Jigani for Jan 2018</h6> */}
<label className="form-label mt-2 col-md-4" style={{whiteSpace:'nowrap'}}>Unit Monthly Report Jigani for Jan 2018</label>
<div className="col-md-2">
                 <label className="form-label">Select List</label>
                 <select className="ip-select">
                    <option value="option 1"> Name1</option>
                    <option value="option 2">Name2</option>
                    <option value="option 3">Name3</option>
                 </select>
       </div>
       <div className="col-md-1">
  <label className="form-label">Month</label>
<input  className="col-md-8"  type="number" id="quantity" name="quantity" min="1" max="12"/>
  </div>

  <div className="col-md-1 ">
  <label className="form-label">Year</label>
<input  className="col-md-8"  type="number" id="quantity" name="quantity" min="2000" max="9999"/>
  </div>


  <div className="col-md-2 ">
            <button className="button-style  group-button">
                Load Data
              </button> 
            </div>
  <div className='col-md-2'>
                    <button className="button-style mt-2 group-button" type='button'
                        
                        onClick={e=>navigate("/home")}
                    >
                        Close
                    </button>

                </div>
</div>



</div>

     


      

      <hr
        style={{
          backgroundColor: "black",
          height: "3px",
        }}
      />
      <div>
      <Tabs style={{display:"flex"}}>
        <Tab eventKey="invoiceSummary" title="Invoice Summary">
          <InvoiceSummary />
        </Tab>
        <Tab  eventKey="taxSummary" title="Tax Summary">
          <TaxSummary />
        </Tab>
        <Tab eventKey="clearanceSummary" title="Clearance Summary">
          <ClearanceSummary />
        </Tab>
        <Tab eventKey="collectionSummary" title="Collection Summary">
          <CollectionSummary />
        </Tab>
        <Tab eventKey="customerValueAddition" title="Customer Value Addition">
          <CustomerValueAddition />
        </Tab>
        <Tab eventKey="salesOutstandingBills" title="Sales Outstanding Bills">
          <SalesOutstandingBills />
        </Tab>
        <Tab eventKey="allOutstandingBills" title="All Outstanding Bills">
          <AllOutstandingBills />
        </Tab>
        <Tab eventKey="machineUtilisation" title="Machine Utilisation">
          <MachineUtilisation />
        </Tab>
        <Tab eventKey="MaterialSalesSummary" title="Material Sales Summary"  >
          <MaterialSalesSummary />
        </Tab>
      </Tabs>
      </div>
    </div>
  );
}
