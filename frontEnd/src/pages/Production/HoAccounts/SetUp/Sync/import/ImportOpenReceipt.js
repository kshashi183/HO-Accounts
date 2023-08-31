import React from "react";
import { Table } from "react-bootstrap";

export default function ImportOpenReceipt() {
  return (
    <div className="mt-4" style={{height:"400px",overflowY: "scroll",overflowX:"scroll"}}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th style={{whiteSpace:"nowrap"}}>RV No</th>
            <th>Recd_PV</th>
            <th>Customer</th>
            <th>Type</th>
            <th>HO_Amount</th>
            <th>Unit_Amount</th>
            <th>HO_On_account</th>
            <th>Unit_On_account</th>
            <th>HO_Receipt_Status</th>
            <th>Unit_Receipt_Status</th>
            <th>Unit_UId</th>
          </tr>
        </thead>
        <tbody className="tablebody"></tbody>
      </Table>
    </div>
  );
}
