import React from 'react'
import { Table } from 'react-bootstrap'

export default function InvoiceSummary() {
  return (
    <div>
        <div style={{height:"400px",overflowY: "scroll",overflowX: "scroll",marginTop:"20px"}}>
           <Table striped className="table-data border" style={{border:"1px"}}>
                <thead className="tableHeaderBGColor">
                <tr>
                       
                        <th style={{whiteSpace:'nowrap'}}>With Tax</th>
                        <th style={{whiteSpace:'nowrap'}}>Branch Sale</th>
                        <th style={{whiteSpace:'nowrap'}}>Invoice Type</th>
                        <th style={{whiteSpace:'nowrap'}}>Grand Total</th>
                        <th style={{whiteSpace:'nowrap'}}>Received</th>
                        <th style={{whiteSpace:'nowrap'}}>Value Added</th>
                        <th style={{whiteSpace:'nowrap'}}>Material Value</th>
                        <th style={{whiteSpace:'nowrap'}}>Discount</th>
                        <th style={{whiteSpace:'nowrap'}}>Delivery Chg</th>
                        <th style={{whiteSpace:'nowrap'}}>Transport Charges</th>
                        <th style={{whiteSpace:'nowrap'}}>Tax Amount</th>
                        <th style={{whiteSpace:'nowrap'}}>Inv Total</th>
                        
                        

                       
                        
                </tr>
                </thead>
                 <tbody className='tablebody'>
                  </tbody>
          </Table>
         </div>
      
    </div>
  )
}
