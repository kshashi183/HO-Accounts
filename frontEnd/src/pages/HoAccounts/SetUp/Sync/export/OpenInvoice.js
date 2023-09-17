import React from 'react'
import { Table } from 'react-bootstrap'

export default function OpenInvoice() {
  return (
    <div  className='mt-4' style={{height:"400px",overflowY: "scroll",overflowX:"scroll"}}>
    <Table striped className="table-data border">
      <thead className="tableHeaderBGColor">
        <tr>
          <th style={{whiteSpace:"nowrap"}}>Invoice No</th>
          <th>Date</th>
          <th>Type</th>
          <th style={{whiteSpace:"nowrap"}}>Grand Total</th>
          <th>Balance</th>
          <th>Customer</th>
        </tr>
      </thead>
    <tbody className='tablebody'>
  
    </tbody>
    
</Table>
    </div>
  )
}
