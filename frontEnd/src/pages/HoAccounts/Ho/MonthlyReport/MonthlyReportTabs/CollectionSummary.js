import React from 'react'
import { Table } from 'react-bootstrap'

export default function CollectionSummary() {
  return (
    <div>
        <div style={{height:"400px",width:"400px",overflowY: "scroll",overflowX: "scroll",marginTop:"20px"}}>
           <Table striped className="table-data border" style={{border:"1px"}}>
                <thead className="tableHeaderBGColor">
                <tr>
                       <th>Txn Type</th>
                       <th>Amount</th>
                        
                </tr>
                </thead>
                 <tbody className='tablebody'>
                  </tbody>
          </Table>
         </div>
      
    </div>
  )
}
