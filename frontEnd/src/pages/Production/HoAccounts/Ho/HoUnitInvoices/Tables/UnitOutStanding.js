import React from 'react'
import { Table } from 'react-bootstrap'

export default function UnitOutStanding() {
  return (
    <div className='col-md-12'>
      <div className='mt-3 col-md-12'>
            <div style={{height:"250px",overflowY: "scroll",overflowX:'scroll'}}>
        <Table className='table-data border'>
            <thead className='tableHeaderBGColor' style={{textAlign:"center"}}>
                <tr>
                <th>UnitName</th>
                <th>Cust_Code</th>
                <th>Cust_Name</th>
                <th>Branch</th>
                <th>Out_Standing_Amount</th>
                <th>InvoiceCount</th>
                </tr>
            </thead>


            {/* <tbody className='tablebody'>
                <tr className="" >
                    <td>TaskNo</td>
                    <td>Machine</td>
                    <td>Operation</td>
                    <td>NCProgramNo</td>
                    <td>EstimatedTime</td>
                    <td>ActualTime</td>
                    <td>Qty</td>
                    <td>QtyAllotted</td>
                    <td>QtyCut</td>
                </tr>
            </tbody> */}
        </Table>
        </div>
    </div>
</div>
  )
}
