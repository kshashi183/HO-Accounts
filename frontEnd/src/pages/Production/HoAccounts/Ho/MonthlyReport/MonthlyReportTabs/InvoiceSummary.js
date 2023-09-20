import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function InvoiceSummary({ getInvoiceValues }) {
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
              <th>With Tax</th>
              <th>Branch Sale</th>
              <th>Invoice Type</th>
              <th>Grand Total</th>
              <th>Received</th>
              <th>Value Added</th>
              <th>Material Value</th>
              <th>Discount</th>
              <th>Delivery Chg</th>
              <th>Transport Charges</th>
              <th>Tax Amount</th>
              <th>Inv Total</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getInvoiceValues?.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>
                    {item.WithTax === 1 ? (
                      <input type="checkbox" value={item.WithTax} checked />
                    ) : (
                      <input type="checkbox" value={item.WithTax} disabled />
                    )}
                  </td>
                  <td></td>
                  <td>{item.InvoiceType}</td>
                  <td>{item.GrandTotal}</td>
                  <td>{item.PymtAmtRecd}</td>
                  <td>{item.ValueAdded}</td>
                  <td>{item.MaterialValue}</td>
                  <td>{item.Discount}</td>
                  <td>{item.Del_Chg}</td>
                  <td>{item.TptCharges}</td>
                  <td>{item.TaxAmount}</td>
                  <td>{item.InvTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
