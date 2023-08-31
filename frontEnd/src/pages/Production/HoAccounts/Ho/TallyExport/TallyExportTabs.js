import React, { useState } from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import InvoiceList from './InvoiceListTab/InvoiceList';
import PaymentReceiptFormTable from './PaymentReceiptTab/PaymentReceiptFormTable';
import HOPaymentReceipt from './HOPaymentReceiptTab/HOPaymentReceipt';

export default function TallyExportTabs() {
    const [key, setKey] = useState("");
  return (
    <div>
      <div className='row'>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-2 tab_font "
    >
      <Tab eventKey="Inv" title="Invoices">
    <InvoiceList/>
       
      </Tab>

      <Tab eventKey="PR" title="Payment Recepients">
       <PaymentReceiptFormTable/>
      </Tab>

      <Tab eventKey="HOR" title=" Ho Payment Receipnts">
       <HOPaymentReceipt/>
       </Tab>

      
      
    </Tabs>
  </div>
    </div>
  );
}
