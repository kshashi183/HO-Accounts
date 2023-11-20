import React from "react";
import { Table } from "react-bootstrap";

export default function ImportOpenInvoice({data}) {

  console.log("import data", data);
  return (
    <div className="mt-4" style={{height:"400px",overflowY: "scroll",overflowX:"scroll"}}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Select</th>
            <th>Type</th>
            <th>Customer</th>
            <th style={{whiteSpace:"nowrap"}}>Invoice No</th>
            <th>Date</th>
            <th style={{whiteSpace:"nowrap"}}>Invoice Value Unit</th>
            <th style={{whiteSpace:"nowrap"}}>Invoice Value HO</th>
            <th style={{whiteSpace:"nowrap"}}>Received Unit</th>
            <th style={{whiteSpace:"nowrap"}}>Received HO</th>
            <th>Unit_DC_Status</th>
            <th>HO_DC_Status</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody className="tablebody">

          {
            data.map((item,index)=>{
              return(
                <tr   key={item.DC_Inv_No} 
                style={{
                  background: item.Remarks === 'Value Different' ? 'red' : 'green',
                  whiteSpace: 'nowrap', // Add the whitespace: nowrap property
                }}
                // style={item.Remarks==='Value Different' ? {background : 'red'}:{background : 'green'} }
       >
                  <td>{item.Unitname}</td>
                  <td>{item.DC_InvType}</td>
                  <td>{item.Cust_Name}</td>
                  <td>{item.Inv_No}</td>
                  <td>{item.DC_Date}</td>
                  <td>{item.Unit_GrandTotal}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  );
}
