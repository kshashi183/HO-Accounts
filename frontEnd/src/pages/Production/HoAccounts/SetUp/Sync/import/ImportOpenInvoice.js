import React from "react";
import { Table } from "react-bootstrap";

export default function ImportOpenInvoice() {
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
        <tbody className="tablebody"></tbody>
      </Table>
    </div>
  );
}
