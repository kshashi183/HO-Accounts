import React from "react";
import ImportOpenInvoice from "./ImportOpenInvoice";
import ImportOpenReceipt from "./ImportOpenReceipt";
import ImportHoReceiptVoucher from "./ImportHoReceiptVoucher";
import TallyInvoicesSync from "./TallyInvoicesSync";
import { Tab, Tabs } from "react-bootstrap";

export default function Import() {
  return (
    <div>
      <div className="row">
        <div className="col-md-4 mb-3 col-sm-12">
          <button className="button-style  group-button"style={{ width: "190px" }} >
            Import Open Sync File
          </button>
        </div>
        <div className="col-md-4 mb-3 col-sm-12" >
          <button className="button-style  group-button" style={{ width: "110px" }} >
            Update Unit
          </button>
        </div>
      </div>

      <Tabs style={{fontSize: "13px"}}>
        <Tab eventKey="openInvoice" title="Open Invoice">
          <ImportOpenInvoice />
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
