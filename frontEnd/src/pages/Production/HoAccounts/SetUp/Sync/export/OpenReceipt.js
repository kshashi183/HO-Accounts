import React from 'react'
import { Table } from 'react-bootstrap'

export default function OpenReceipt() {
  return (
    <div  className='mt-4' style={{height:"400px",overflowY: "scroll",overflowX:"scroll"}}>
    <Table striped className="table-data border">
      <thead className="tableHeaderBGColor">
        <tr>
          <th>Type</th>
          <th style={{whiteSpace:"nowrap"}}>RV No</th>
          <th>Recd_PV</th>
          <th>Amount</th>
          <th style={{whiteSpace:"nowrap"}}>On Account</th>
          <th>Customer</th>
          <th>Id</th>
          <th style={{whiteSpace:"nowrap"}}>Unit Name</th>
          <th style={{whiteSpace:"nowrap"}}>Recd PVID</th>
          <th>Sync_HOId</th>
          <th>Unit_UId</th>
          <th>Recd_PVNo</th>
          <th>Recd_PV_Date</th>
          <th style={{whiteSpace:"nowrap"}}>Receipt Status</th>
          <th>Cust_code</th>
          <th style={{whiteSpace:"nowrap"}}>Cust Name</th>
          <th>Amount</th>
          <th>Adjusted</th>
          <th style={{whiteSpace:"nowrap"}}>Docu No</th>
          <th>Description</th>
          <th style={{whiteSpace:"nowrap"}}>HO Ref</th>
          <th style={{whiteSpace:"nowrap"}}>HO PrvId</th>
          <th>Tally_UId</th>
          <th>Updated</th>
          <th>On_account</th>
          <th style={{whiteSpace:"nowrap"}}>Txn Type</th>
        </tr>
      </thead>
    <tbody className='tablebody'>
  
    </tbody>
    
</Table>
    </div>
  )
}
