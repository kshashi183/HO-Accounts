import React, { useEffect, useRef, useState } from "react";
import ThreeTabs from "./ThreeTabs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { xml2js, js2xml } from "xml-js";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import { Tab, Table, Tabs } from "react-bootstrap";

export default function ShowSyncStatus() {
  const navigate = useNavigate();
  const [report, setReport] = useState([]);
  const [unitName, setUnitName] = useState("");
  const [key, setKey] = useState("Inv");
  const [unitdata, setunitData] = useState([]);
  const [getName, setGetName] = useState("");
  const fileInputRef = useRef(null);
  const [getVersion, setGetVersion] = useState("");

  const handleButtonClick = (e) => {
    fileInputRef.current.click();
    console.log("Xml File", fileInputRef);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const xmlString = e.target.result;

      const parsedData = parseXmlData(xmlString);
      // setReceiptData(xmlString);
      // sync_data(parsedData);
      console.log("heloo", parsedData);
      // setUnitName(parsedData.open_unit[0].UnitName);
    };
    reader.readAsText(file);
  };

  const parseXmlData = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const multiMediaNodesunit = xmlDoc.querySelectorAll("MagodUnits");
    const multiMediaNodes = xmlDoc.querySelectorAll("unit_invoices_list");
    const parsedData = {
      open_inv: [],
      open_unit: [],
    };
    // Function to extract data dynamically from nodes
    const extractData = (nodes, targetArray) => {
      nodes.forEach((node) => {
        const mediaObject = {};

        node.childNodes.forEach((childNode) => {
          if (childNode.nodeType === Node.ELEMENT_NODE) {
            mediaObject[childNode.tagName] = childNode.textContent;
          }
        });
        targetArray.push(mediaObject);
      });
    };

    // Call the function for both arrays
    extractData(multiMediaNodesunit, parsedData.open_unit);
    extractData(multiMediaNodes, parsedData.open_inv);
    setReport(parsedData);
    setUnitName(parsedData.open_unit[0].UnitName);
    return parsedData;
  };

  const handleUnitName = () => {
    axios
      .get(baseURL + `/showSyncStatus/hoUnitNames`)
      .then((res) => {
        // console.log("firstTable", res.data)
        setunitData(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  };

  useEffect(() => {
    handleUnitName();
  }, []);

  const handleUnitSelect = (e) => {
    setGetName(e.target.value);
  };

  console.log("the version:", getName);

  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">HO Unit Sync Review</h4>
        </div>
      </div>
      <div className="col-md-12">
        <label className="form-label">Magod Laser Machining Pvt Ltd</label>
      </div>
      <div className="row mb-3">
        <div className="col-md-12 col-sm-12" style={{ marginLeft: "0px" }}>
          <div className="ip-box  mt-2">
            <div className="row">
              <div className=" row col-md-12">
                <label
                  className="form-label col-md-3"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Syncronise Account Details{" "}
                </label>

                <div className="col-md-2 mt-3">
                  <select
                    className="ip-select"
                    onChange={(e) => handleUnitSelect(e)}
                  >
                    {unitdata.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.UnitName}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="button-style  group-button  "
                  style={{ width: "120px" }}
                  onClick={handleButtonClick}
                >
                  Load Data
                </button>
                <input
                  type="file"
                  accept=".xml"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />

                <button
                  className="button-style  group-button "
                  style={{ width: "150px" }}
                >
                  Export Report
                </button>

                <button
                  className="button-style  group-button "
                  style={{ width: "150px" }}
                >
                  Reset Invoice
                </button>

                <button
                  className="button-style  group-button "
                  style={{ width: "80px" }}
                  onClick={(e) => navigate("/home")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="horizontal-line" />
      <div>
        <div className="row">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-1 tab_font "
          >
            <Tab eventKey="Inv" title="Invoices">
              <div className="">
                <label className="form-label">
                  Missing /Mismatch Invoice Count 0
                </label>
              </div>
              <div className="col-md-12 row">
                <div className="col-md-6">
                  <div className="row">
                    <div className=" col-md-5">
                      <div>
                        <label className="form-label">Unit Information</label>{" "}
                      </div>
                    </div>
                    <button
                      className="button-style mt-2 group-button"
                      style={{ width: "80px" }}
                    >
                      Filter
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-5">
                      <div>
                        <label className="form-label"> HO Information</label>{" "}
                      </div>
                    </div>
                    <button
                      className="button-style mt-2 group-button"
                      style={{ width: "80px" }}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    height: "300px",
                    overflowX: "scroll",
                    overflowY: "scroll",
                  }}
                >
                  <Table striped className="table-data border mt-1">
                    <thead className="tableHeaderBGColor">
                      <tr>
                        <th style={{ whiteSpace: "nowrap" }}>Inv Type</th>
                        <th style={{ whiteSpace: "nowrap" }}>Inv No</th>
                        <th>Date</th>
                        <th style={{ whiteSpace: "nowrap" }}>Inv Total</th>
                        <th style={{ whiteSpace: "nowrap" }}>Amt Received</th>
                        <th style={{ whiteSpace: "nowrap" }}>Customer</th>
                        <th style={{ whiteSpace: "nowrap" }}>Inv Status</th>
                      </tr>
                    </thead>

                    <tbody className="tablebody">
                      <tr>
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

                <div
                  className="col-md-6"
                  style={{
                    height: "300px",
                    overflowX: "scroll",
                    overflowY: "scroll",
                  }}
                >
                  <Table striped className="table-data border mt-1">
                    <thead className="tableHeaderBGColor">
                      <tr>
                        <th style={{ whiteSpace: "nowrap" }}>Inv Type</th>
                        <th style={{ whiteSpace: "nowrap" }}>Inv No</th>
                        <th>Date</th>
                        <th style={{ whiteSpace: "nowrap" }}>Inv Total</th>
                        <th style={{ whiteSpace: "nowrap" }}>Amt Received</th>
                        <th>Customer</th>
                        <th style={{ whiteSpace: "nowrap" }}>Inv Status</th>
                      </tr>
                    </thead>

                    <tbody className="tablebody">
                      <tr>
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

              {/* Table3 and table4 */}

              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    height: "300px",
                    overflowX: "scroll",
                    overflowY: "scroll",
                  }}
                >
                  <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor">
                      <tr>
                        <th>VoucherNo</th>
                        <th>TxnType</th>
                        <th>Receive_Now</th>
                        <th>VoucherStatus</th>
                      </tr>
                    </thead>

                    <tbody className="tablebody">
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div
                  className="col-md-6"
                  style={{
                    height: "300px",
                    overflowX: "scroll",
                    overflowY: "scroll",
                  }}
                >
                  <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor">
                      <tr>
                        <th>VoucherNo</th>
                        <th>TxnType</th>
                        <th>Receive_Now</th>
                        <th>VoucherStatus</th>
                      </tr>
                    </thead>

                    <tbody className="tablebody">
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Tab>

            <Tab eventKey="PR" title="Payment Recepients"></Tab>

            <Tab eventKey="HOR" title=" HO Payment Receipnts"></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
