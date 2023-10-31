import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FormAndTable() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="row col-md-12 mb-2">
        <label
          className="form-label col-md-3 mt-1"
          style={{ whiteSpace: "nowrap" }}
        >
          Select Invoices
        </label>

        <div className="col-md-3 mt-2">
          <select className="ip-select">
            <option value="option 1">MAGOD LASER</option>
            <option value="option 2"></option>
            <option value="option 3"></option>
          </select>
        </div>

        <div className=" col-md-4 ">
          <button className="button-style mt-1 group-button ">
            Add Invoice
          </button>
        </div>
        <div className="col-md-2 ">
          <button
            className="button-style mt-1 group-button"
            onClick={() => navigate("/HOAccounts")}
            style={{ width: "80px" }}
          >
            Close
          </button>
        </div>
      </div>

      <div
        style={{ height: "700px", overflowY: "scroll", overflowX: "scroll" }}
      >
        <Table className="table-data border">
          <thead className="tableHeaderBGColor" style={{ textAlign: "center" }}>
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>Select</th>
              <th>Type</th>
              <th>Invoice No</th>
              <th>Rate</th>
              <th>Grand Total</th>
              <th>Amount Received</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            <tr style={{ whiteSpace: "nowrap" }} className="">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
