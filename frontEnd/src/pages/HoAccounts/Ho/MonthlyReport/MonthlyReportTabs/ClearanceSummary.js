import React, { useState } from "react";
import { NavItem, Table } from "react-bootstrap";

export default function ClearanceSummary({ getClearanceValues }) {
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
              <th>Tax</th>
              <th>Invoice Type</th>
              <th>Under Notification</th>
              <th>Material</th>
              <th>Excise Class</th>
              <th>Total Quantity</th>
              <th>Total Value</th>
              <th>Total Weight Kg</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getClearanceValues?.map((item, key) => {
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
                  <td>{item.InvoiceType}</td>
                  <td></td>
                  <td>{item.Material}</td>
                  <td>{item.Excise_CL_no}</td>
                  <td>{item.TotalQty}</td>
                  <td>{item.TotalValue}</td>
                  <td>{item.TotalWeight}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
