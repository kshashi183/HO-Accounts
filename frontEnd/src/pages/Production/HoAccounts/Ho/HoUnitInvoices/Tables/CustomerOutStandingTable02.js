import React from 'react'
import { Table } from 'react-bootstrap'

export default function CustomerOutStandingTable02() {
  return (
    <div>
    <div className='mt-3'>
          <div style={{height:"250px",overflowY: "scroll",overflowX:'scroll'}}>
            <Table className='table-data border'>
                <thead className='tableHeaderBGColor' style={{textAlign:"center"}}>
                    <tr>
                    <th>VrRef</th>
                    <th>Amount</th>
                    <th>TxnType</th>
                    <th style={{whiteSpace:'nowrap'}}>Status</th>
                    </tr>
                </thead>
        
        
                {/* <tbody className='tablebody'>
                    <tr className="" >
                        <td>TaskNo</td>
                        <td>Machine</td>
                        <td>Operation</td>
                    </tr>
                </tbody> */}
            </Table>
      </div>
  </div>
 </div>
  )
}
