import React from 'react'
import { Table } from 'react-bootstrap'

export default function OpenReceipt({data}) {

  console.log("receipt,", data);
  return (
    <div  className='mt-4' style={{height:"400px",overflowY: "scroll",overflowX:"scroll"}}>
    <Table striped className="table-data border">
      <thead className="tableHeaderBGColor">
        <tr style={{whiteSpace:"nowrap"}}>
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
         
          <th>Adjusted</th>
          <th style={{whiteSpace:"nowrap"}}>Docu No</th>
          <th>Description</th>
          <th style={{whiteSpace:"nowrap"}}>HO Ref</th>
          <th style={{whiteSpace:"nowrap"}}>HO PrvId</th>
          <th>Tally_UId</th>
          <th>Updated</th>
          
        </tr>
      </thead>
    <tbody className='tablebody'>
      {
        data.map((item,index)=>{
          const invDate = new Date(item.Recd_PV_Date);
          const formattedDate = `${invDate.getDate().toString().padStart(2, '0')}/${(invDate.getMonth() + 1).toString().padStart(2, '0')}/${invDate.getFullYear()}`;
          return(
            <tr style={{whiteSpace:'nowrap'}}>
              <td>{item.TxnType}</td>
              <td>{item.Recd_PVNo}</td>
              <td>{item.RecdPVID}</td>
              <td>{item.Amount}</td>
              <td>{item.On_account}</td>
              <td>{item.CustName}</td>
              <td>{item.Id}</td>
              <td>{item.Unitname}</td>
              <td>{item.RecdPVId}</td>
              <td></td>
              <td>{item.Unit_UId}</td>
              <td></td>
              {/* <td>{item.Recd_PV_Date}</td> */}
              <td>{formattedDate}</td>
              <td>{item.ReceiptStatus}</td>
              <td>{item.Cust_code}</td>
              <td></td>
              <td>{item.DocuNo}</td>
              <td>{item.Description}</td>
              <td>{item.HORef}</td>
              <td>{item.HOPrvId}</td>
              <td></td>
              <td>{item.TallyUpdate}</td>
            </tr>
          )
        })
      }
  
    </tbody>
    
</Table>
    </div>
  )
}
