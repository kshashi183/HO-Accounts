import React from "react";
import { Table } from "react-bootstrap";

export default function TaxSummary() {
  return (
    <div>
      <div style={{ height: "400px", overflowY: "scroll",overflowX: "scroll", marginTop: "20px" }}>
        <Table
          striped
          className="table-data border"
          style={{ border: "1px" }}
        >
          <thead className="tableHeaderBGColor">
            <tr>
              <th style={{whiteSpace:"nowrap"}}>Invoice Type</th>
              <th style={{whiteSpace:"nowrap"}}>Tax Name</th>
              <th style={{whiteSpace:'nowrap'}}>Tax %</th>
              <th style={{whiteSpace:'nowrap'}}>Taxable Amount</th>
              <th style={{whiteSpace:'nowrap'}}>Tax Amount</th>
            
            </tr>
          </thead>
          <tbody className="tablebody"></tbody>
        </Table>
      </div>
    </div>
  );
}
