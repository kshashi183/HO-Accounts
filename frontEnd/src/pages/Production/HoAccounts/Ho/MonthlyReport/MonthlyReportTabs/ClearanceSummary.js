import React from 'react'
import { Table } from 'react-bootstrap'

export default function ClearanceSummary() {
  return (
    <div>
        <div style={{height:"400px",overflowY: "scroll",overflowX: "scroll",marginTop:"20px"}}>
           <Table striped className="table-data border" style={{border:"1px"}}>
                <thead className="tableHeaderBGColor">
                <tr>
                       <th>Tax</th>
                       <th style={{whiteSpace:"nowrap"}}>Invoice Type</th>
                       <th>Under Notification</th>
                       <th>Material</th>
                       <th style={{whiteSpace:"nowrap"}}>Excise Class</th>
                       <th style={{whiteSpace:"nowrap"}}>Total Quantity</th>
                       <th style={{whiteSpace:"nowrap"}}>Total Value</th>
                       <th style={{whiteSpace:"nowrap"}}>Total Weight Kg</th>       
                </tr>
                </thead>
                 <tbody className='tablebody'>
                  </tbody>
          </Table>
         </div>
      
    </div>
  )
}
