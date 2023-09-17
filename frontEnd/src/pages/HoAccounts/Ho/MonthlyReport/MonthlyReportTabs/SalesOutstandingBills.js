import React from 'react'
import { Table } from 'react-bootstrap'

export default function SalesOutstandingBills() {
  return (
    <div>
        <div style={{height:"400px",overflowY: "scroll",overflowX: "scroll",marginTop:"20px"}}>
           <Table striped className="table-data border" style={{border:"1px"}}>
                <thead className="tableHeaderBGColor">
                <tr>
                       
                        <th style={{whiteSpace:"nowrap"}}>Customer Code</th>
                        <th style={{whiteSpace:"nowrap"}}>Customer Name</th>
                        <th style={{whiteSpace:"nowrap"}}>Total Billing</th>
                        <th style={{whiteSpace:"nowrap"}}>Amount Received</th>
                        <th>Balance</th>
                        <th style={{whiteSpace:"nowrap"}}>Unit Name</th>
                        <th>Cust_Code</th>
                        <th>Cust_Name</th>
                        <th style={{whiteSpace:"nowrap"}}>Total Billing</th>
                        <th style={{whiteSpace:"nowrap"}}>Amount Received</th>
                        <th style={{whiteSpace:"nowrap"}}>Value Added</th>
                        <th style={{whiteSpace:"nowrap"}}>Material Value</th>
                        <th>Period</th>
                        <th>Outstanding</th>
                        
                </tr>
                </thead>
                 <tbody className='tablebody'>
                  </tbody>
          </Table>
         </div>      
    </div>
  )
}
