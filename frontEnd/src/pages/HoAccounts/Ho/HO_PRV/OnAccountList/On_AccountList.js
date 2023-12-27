import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Table } from "react-bootstrap";



export default function On_AccountList() {
    const navigate=useNavigate();
    return (
        <>
            

<div className="col-md-12">
        <div className="row">
          <h4 className="title">Unit Open  Payment Receipt Vouchers</h4>
        </div>
      </div>
       
       
        <label className="form-label">Magod Laser Machining Pvt Ltd</label>
    
     
                  
 <div className="row col-md-12 col-sm-12"   >
     


         <div className="col-md-2 mt-2" style={{whiteSpace:'nowrap'}}>
         <label className="form-label"> On Account Details</label>
         </div>
      

         <button className="button-style mt-3 group-button col-md-3" 
          style={{ width: "150px" }} 
        //   onClick={openVoucherButton}
          >
          Open Voucher
         </button>

         <div className="col-md-2" >
          <label className="form-label">Select Unit</label>
          <select
          
            className="ip-select mt-1"
          
            
          >
            <option value='' >Jigani</option>
            <option value='Sales & Jobwork' >Peenya</option>
           
          </select>

        </div>

         <button className="button-style mt-3 group-button" 
          style={{ width: "100px", marginLeft:'450px' }} onClick={e=> navigate("/HOAccounts")} >
          Close
         </button>
    
     
 </div>


{/* <PaymentTable/> */}
<hr className="horizontal-line mt-1" />

      <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '350px',  }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th>+</th>
            <th>Cust Code</th>
            <th>Customer</th>
            <th>OnAccount Amount</th>

          </tr>
        </thead>

        <tbody className='tablebody'>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          
        </tbody>
      </Table>

        </div >
        {/* <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      pageCount={Math.ceil(groupedArray.length / itemsPerPage)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    /> */}
  
   
        </>
    )
}