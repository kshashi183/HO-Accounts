import React from 'react'
import { Table } from 'react-bootstrap'

export default function OpenInvoice({data}) {

  //console.log("open inmv", data);
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
      {
        data.map((item,index)=>{
          const invDate = new Date(item.Inv_Date);

          // Format the date as dd/mm/yy
         
          const formattedDate = `${invDate.getDate().toString().padStart(2, '0')}/${(invDate.getMonth() + 1).toString().padStart(2, '0')}/${invDate.getFullYear()}`;
          
          return(

            <tr><td>{item.Inv_No}</td>
           
            <td>{formattedDate}</td>
            <td>{item.DC_InvType}</td>
            <td>{item.GrandTotal}</td>
            <td>{item.Balance}</td>
       
            <td></td>
            <td>{item.Cust_Name}</td>
            
            </tr>
          )
        })
      }
  
    </tbody>
    
</Table>
    </div>
  )
}
