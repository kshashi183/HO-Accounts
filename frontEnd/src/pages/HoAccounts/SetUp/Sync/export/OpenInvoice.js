import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap'
import ReactPaginate from "react-paginate";

export default function OpenInvoice({data}) {

  const [selectRow, setSelectRow] = useState([]);

  //console.log(data)
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
  //console.log("open inmv", data);
  return (
    <>
    <div  className='mt-4' style={{height:"300px",overflowY: "scroll",overflowX:"scroll"}}>
    <Table striped className="table-data border">
      <thead className="tableHeaderBGColor">
        <tr>
          <th style={{whiteSpace:"nowrap"}}>Invoice No</th>
          <th>Date</th>
          <th>Type</th>
          <th style={{whiteSpace:"nowrap"}}>Grand Total</th>
          <th>Balance</th>
          <th>Customer</th>
        </tr>
      </thead>
      <tbody className="tablebody">
            {currentPageData
              ? currentPageData.map((item, key) => (
                  <tr
                    key={item.DC_Inv_No}
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => selectedRowFun(item, key)}
                    className={
                      key === selectRow?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td>{item.Inv_No}</td>
                    <td>{formatDate(item.Inv_Date)}</td>
                    <td>{item.DC_InvType}</td>
                    <td style={{ textAlign: "right" }}>
                      {formatAmount(item.GrandTotal)}
                    </td>

                    <td style={{ textAlign: "right" }}>
                      {formatAmount(item.PymtAmtRecd)}
                    </td>
                    <td>{item.Cust_Name}</td>
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
    
  )
}
