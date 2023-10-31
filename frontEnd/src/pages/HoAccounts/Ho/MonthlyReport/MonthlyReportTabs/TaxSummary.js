import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function TaxSummary({ getTaxValues }) {
  const [selectRow, setSelectRow] = useState([]);

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
  };

  return (
    <div>
      <div
        style={{
          height: "260px",
          overflowY: "scroll",
          overflowX: "scroll",
          marginTop: "20px",
        }}
      >
        <Table striped className="table-data border" style={{ border: "1px" }}>
          <thead className="tableHeaderBGColor">
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>Invoice Type</th>
              <th>Tax Name</th>
              <th>Tax %</th>
              <th>Taxable Amount</th>
              <th>Tax Amount</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getTaxValues?.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.InvoiceType}</td>
                  <td>{item.TaxName}</td>
                  <td>{item.TaxPercent}</td>
                  <td>{item.TaxableAmount}</td>
                  <td>{item.TaxAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
