import React from "react";
import { Table } from "react-bootstrap";

export default function CreateNewForm() {
  return (
    <>
      <div className="">
        <div className="mt-2">
          <form className="">
            <div className="">
              <div className="d-flex ms-3" style={{ gap: "10px" }}>
                <div className=" col-md-5">
                  <label className="form-label ">Href No</label>
                  <input className="in-field" value="Draft"  style={{ marginTop: "-5px" }}/>
                </div>

                <div className=" col-md-6">
                  <label className="form-label">Date</label>
                  <input
                    className="in-field"
                    type="date"
                    style={{ marginTop: "-5px" }}
                  />
                </div>
              </div>

              <div className="row">
                <div className=" col-md-6">
                  <label className="form-label">Select Unit </label>
                  <select className="ip-select">
                    <option value="option 1">Magod</option>
                    <option value="option 2">a</option>
                    <option value="option 3">Cheque</option>
                  </select>
                </div>

                <div className=" col-md-5  ms-4">
                  <label className="form-label">Customer</label>
                  <select className="ip-select">
                    <option value="option 1"></option>
                    <option value="option 2">Online Payment</option>
                    <option value="option 3">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="col-md-11 ms-3">
                <label className="form-label">Receive Form</label>
                <input
                  className="in-field"
                  type="text"
                  style={{ marginTop: "-10px" }}
                />
              </div>

              <div className="row col-md-12 col-sm-12">
                <div className="box col-md-6">
                  <div className="">
                    <label className="form-label">Transaction Type</label>
                    <select className="ip-select">
                      <option value="option 1">Cash</option>
                      <option value="option 2">Online Payment</option>
                      <option value="option 3">Cheque</option>
                    </select>
                  </div>

                  <div className="">
                    <label className="form-label">Amount</label>
                    <input className="in-field" style={{ marginTop: "-7px" }} />
                  </div>

                  <div className="">
                    <label className="form-label">HO Reference</label>
                    <input className="in-field" style={{ marginTop: "-7px" }} />
                  </div>

                  <div className="">
                    <label className="form-label">Status</label>
                    <input className="in-field" style={{ marginTop: "-7px" }} />
                  </div>
                </div>

                <div className="box col-md-6">
                  <div className="mt-1">
                    <label
                      htmlFor="myBox"
                      className="bg-light form-title tab_font mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      rows="2"
                      id=""
                      style={{ height: "200px", resize: "none" }}
                    ></textarea>
                  </div>
                </div>

                <div className="row col-md-12 ms-4">
                  <div className="col-md-2">
                    <button
                      className="button-style mt-2 group-button"
                      style={{ width: "70px" }}
                    >
                      Save
                    </button>
                  </div>

                  <div className="col-md-2">
                    <button
                      className="button-style mt-2 group-button"
                      style={{ width: "60px" }}
                    >
                      Post
                    </button>
                  </div>

                  <div className=" col-md-2">
                    <button
                      className="button-style mt-2 group-button"
                      style={{ width: "70px" }}
                    >
                      Print
                    </button>
                  </div>
                  <div className=" col-md-2">
                    <button
                      className="button-style mt-2 group-button"
                      style={{ width: "70px" }}
                    >
                      Delete
                    </button>
                  </div>
                  <div className=" col-md-2">
                    <button
                      className="button-style mt-2 group-button"
                      style={{ width: "70px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="row col-md-12 mt-2">
          <div className="col-md-6 mt-2">
            <label className="form-label">Against Invoices</label>
          </div>

          <div className=" col-md-6">
            <button className="button-style mt-1 mb-2 group-button">
              Remove Invoice
            </button>
          </div>
        </div>

        <div
          style={{ height: "250px", overflowY: "scroll", overflowX: "scroll" }}
        >
          <Table className="table-data border">
            <thead
              className="tableHeaderBGColor"
              style={{ textAlign: "center" }}
            >
              <tr style={{ whiteSpace: "nowrap" }}>
                <th style={{ whiteSpace: "nowrap" }}>Srl no</th>
                <th>Amount</th>
                <th>Invoice No</th>
                <th>Date</th>
                <th>Type</th>
                <th>Account</th>
                <th>Received</th>
                <th>Receive Now</th>
                <th>Id</th>
                <th>Unitname</th>
                <th>PVSrlID</th>
                <th>Unit_UId</th>
                <th>HOPrvId</th>
                <th>RecdPvSrl</th>
                <th>HO_Uid</th>
                <th>Dc_inv_no</th>
                <th>Inv_No</th>
                <th>Inv_Type</th>
                <th>Inv_Amount</th>
                <th>Amt_received</th>
                <th>Receive_Now</th>
                <th>InvUpdated</th>
                <th>Inv_date</th>
                <th>Updated</th>
                <th>RefNo</th>
                <th>UnitId</th>
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
    </>
  );
}
