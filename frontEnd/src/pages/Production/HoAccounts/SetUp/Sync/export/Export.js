import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import OpenInvoice from './OpenInvoice'
import OpenReceipt from './OpenReceipt'
import HoReceiptVoucher from './HoReceiptVoucher'

export default function Export() {
  return (
    <div>
        <div>
      <div className="mb-3" >
        <button className="button-style  group-button"style={{ width: "180px" }} >
          Export Open Sync File
        </button>
      </div>

      <Tabs>
        <Tab eventKey="openInvoice" title="Open Invoice">
          <OpenInvoice/>
        </Tab>
        <Tab eventKey="openReceipts" title="Open Receipts">
          <OpenReceipt/>
        </Tab>
        <Tab eventKey="hoReceiptVoucher" title="Ho Receipt Voucher">
          <HoReceiptVoucher/>
        </Tab>
      </Tabs>
    </div>
      
    </div>
  )
}


