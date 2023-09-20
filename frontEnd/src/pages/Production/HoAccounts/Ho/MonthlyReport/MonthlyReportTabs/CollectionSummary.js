import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function CollectionSummary({ getCollectionValues }) {
  
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
          width: "400px",
          overflowY: "scroll",
          overflowX: "scroll",
          marginTop: "20px",
        }}
      >
        <Table striped className="table-data border" style={{ border: "1px" }}>
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Txn Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getCollectionValues?.map((item, key) => {
              return (
                <tr
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.TxnType}</td>
                  <td>{item.Amount}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
