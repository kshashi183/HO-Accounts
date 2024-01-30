import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export default function ImportOpenReceipt({data}) {

  const [selectRow, setSelectRow] = useState([]);
  const itemsPerPage = 200; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the start and end indices for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const currentPageData = data.slice(startIndex, endIndex);
  console.log(currentPageData, "currentPageData");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  function formatAmount(amount) {
    // Assuming amount is a number
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return formattedAmount;
  }

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
  };

  return (
    <>
    <div className="mt-4" style={{height:"300px",overflowY: "scroll",overflowX:"scroll"}}>
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
        <tbody className="tablebody">
            {currentPageData
              ? currentPageData.map((rv, key) => (
                  <tr
                    key={rv.RecdPVID}
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => selectedRowFun(rv, key)}
                    className={
                      key === selectRow?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td>{rv.Recd_PVNo}</td>
                    <td>{formatDate(rv.Recd_PV_Date)}</td>
                    <td>{rv.CustName}</td>
                    <td>{rv.TxnType}</td>
                    <td style={{ textAlign: "right" }}>
                      {formatAmount(rv.HO_Amount)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {formatAmount(rv.Unit_Amount)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {formatAmount(rv.HO_On_account)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {formatAmount(rv.Unit_On_account)}
                    </td>
                    <td>{rv.HO_ReceiptStatus}</td>
                    <td>{rv.Unit_ReceiptStatus}</td>
                    <td>{rv.Unit_UId}</td>
                  </tr>
                ))
              : ""}
          </tbody>
      </Table>
    </div>

    <div>
    <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
    </>
  );
}
