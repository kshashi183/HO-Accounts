import React from 'react';

import { Table } from 'react-bootstrap';

export default function TaxMasterTable() {
    
  return (
    <div>
       <div className='row mt-1'>
    <div>
     <div style={{height:"430px",overflowY: 'scroll', overflowX: 'scroll'}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Id</th>
           <th>TaxName</th>
           <th>PrintName</th>
           <th style={{whiteSpace:'nowrap'}}>Tax %</th>
           <th style={{whiteSpace:'nowrap'}}>Tax on</th>
           <th style={{whiteSpace:'nowrap'}}>Effective From</th>
           <th style={{whiteSpace:'nowrap'}}>Effective To</th>
           <th style={{whiteSpace:'nowrap'}}>Acct Head</th>
           <th>Service</th>
           <th>Sales</th>
           <th style={{whiteSpace:'nowrap'}}>Job Work</th>
           <th>IGST</th>
           <th>Tally</th>
         </tr>
       </thead>


     <tbody>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
       </tbody>
 </Table>
     </div>

 </div>
</div>
    </div>
  );
}
