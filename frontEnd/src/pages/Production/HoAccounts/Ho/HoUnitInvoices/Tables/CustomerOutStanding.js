import React from 'react'
import { Table } from 'react-bootstrap'
import CustomerOutStandingTable02 from './CustomerOutStandingTable02'

export default function CustomerOutStanding() {
  return (
    <div className='row col-md-12'>
   <div className='mt-3 col-md-6'>
         <div style={{height:"250px",overflowY: "scroll",overflowX:'scroll'}}>
            <Table className='table-data border'>
                <thead className='tableHeaderBGColor' style={{textAlign:"center"}}>
                    <tr>
                    <th>Select</th>
                    <th>Type</th>
                    <th>Inv_No</th>
                    <th style={{whiteSpace:'nowrap'}}>Invoice_Date</th>
                    <th>Total</th>
                    <th>Balance</th>
                    <th>Due_Days</th>
                    <th>Status</th>
                    <th style={{whiteSpace:'nowrap'}}>Id</th>
                    <th style={{whiteSpace:'nowrap'}}>Sync_Hold</th>
                    <th style={{whiteSpace:'nowrap'}}>Unit_Uid</th>
                    <th style={{whiteSpace:'nowrap'}}>Selected</th>
                    <th style={{whiteSpace:'nowrap'}}>Unit_Name</th>
                    <th style={{whiteSpace:'nowrap'}}>DC_Inv_No</th>
                    <th style={{whiteSpace:'nowrap'}}>Scheduled</th>
                    <th style={{whiteSpace:'nowrap'}}>DC_Inv_Date</th>
                    <th style={{whiteSpace:'nowrap'}}>InvoiceFor</th>
                    <th style={{whiteSpace:'nowrap'}}>Order_No</th>
                    <th style={{whiteSpace:'nowrap'}}>Order_Date</th>
                    <th style={{whiteSpace:'nowrap'}}>Order_ScheduleNo</th>
                    <th style={{whiteSpace:'nowrap'}}>DC_No</th>
                    <th style={{whiteSpace:'nowrap'}}>DC_Date</th>
                    <th style={{whiteSpace:'nowrap'}}>DC_Fin_Year</th>
                    <th style={{whiteSpace:'nowrap'}}>Inv_No</th>
                    <th style={{whiteSpace:'nowrap'}}>Inv_Date</th>
                    <th style={{whiteSpace:'nowrap'}}>Inv_Fin_Year</th>
                    <th style={{whiteSpace:'nowrap'}}>Payment Date</th>
                    <th style={{whiteSpace:'nowrap'}}>Pmny_Recd</th>
                    <th style={{whiteSpace:'nowrap'}}>Payment Mode</th>
                    <th style={{whiteSpace:'nowrap'}}>Pymt_Amt_Recd</th>
                    <th style={{whiteSpace:'nowrap'}}>Balance</th>
                    <th style={{whiteSpace:'nowrap'}}>Payment_Receipt_Details</th>
                    <th style={{whiteSpace:'nowrap'}}>GRN No</th>
                    <th style={{whiteSpace:'nowrap'}}>Cust_Code</th>
                    <th style={{whiteSpace:'nowrap'}}>Customer</th>
                    <th style={{whiteSpace:'nowrap'}}>Cust_Name</th>
                    <th style={{whiteSpace:'nowrap'}}>Cust_Address</th>
                    <th style={{whiteSpace:'nowrap'}}>Cust_Place</th>
                    <th style={{whiteSpace:'nowrap'}}>Cust_State</th>
                    <th style={{whiteSpace:'nowrap'}}>Cust_StateId</th>
                    <th style={{whiteSpace:'nowrap'}}>PIN_Code</th>
                    <th style={{whiteSpace:'nowrap'}}>Del_Address</th>
                    <th style={{whiteSpace:'nowrap'}}>ECC_No</th>
                    <th style={{whiteSpace:'nowrap'}}>GST No</th>
                    <th style={{whiteSpace:'nowrap'}}>TIN No</th>
                    <th style={{whiteSpace:'nowrap'}}>KST_No</th>
                    <th style={{whiteSpace:'nowrap'}}>TaxAmount</th>
                    <th style={{whiteSpace:'nowrap'}}>CST_No</th>
                    <th style={{whiteSpace:'nowrap'}}>PO_No</th>
                    <th style={{whiteSpace:'nowrap'}}>PO_Date</th>
                    <th style={{whiteSpace:'nowrap'}}>Net_Total</th>
                    <th style={{whiteSpace:'nowrap'}}>Pkng_Chg</th>
                    <th style={{whiteSpace:'nowrap'}}>Tpt Changes</th>
                    <th style={{whiteSpace:'nowrap'}}>Discount</th>
                    <th style={{whiteSpace:'nowrap'}}>Pgm_Dft_Chg</th>
                    <th style={{whiteSpace:'nowrap'}}>MtrlChg</th>
                    <th style={{whiteSpace:'nowrap'}}>Assessable Value Temp</th>
                    <th style={{whiteSpace:'nowrap'}}>Assessable Value</th>
                    <th style={{whiteSpace:'nowrap'}}>Del_Chg</th>
                    <th style={{whiteSpace:'nowrap'}}>Inv Total</th>
                    <th style={{whiteSpace:'nowrap'}}>Round_off</th>
                    <th style={{whiteSpace:'nowrap'}}>Grand Total</th>
                    <th style={{whiteSpace:'nowrap'}}>Total_Wt</th>
                    <th style={{whiteSpace:'nowrap'}}>Scrap Wt</th>
                    <th style={{whiteSpace:'nowrap'}}>DC_Status</th>
                    <th style={{whiteSpace:'nowrap'}}>Cenvat Srl No</th>
                    <th style={{whiteSpace:'nowrap'}}>Despatch Time</th>
                    <th style={{whiteSpace:'nowrap'}}>TptMode</th>
                    <th style={{whiteSpace:'nowrap'}}>Veh No</th>
                    <th style={{whiteSpace:'nowrap'}}>Short Not No</th>
                    <th style={{whiteSpace:'nowrap'}}>Ex Not No</th>
                    <th style={{whiteSpace:'nowrap'}}>Insp By</th>
                    <th style={{whiteSpace:'nowrap'}}>Packed By</th>
                    <th style={{whiteSpace:'nowrap'}}>Com_inv_id</th>
                    <th style={{whiteSpace:'nowrap'}}>Remarks</th>
                    <th style={{whiteSpace:'nowrap'}}>Del_Responsibility</th>
                    <th style={{whiteSpace:'nowrap'}}>Payment Terms</th>
                    <th style={{whiteSpace:'nowrap'}}>PN_PkngLevel</th>
                    <th style={{whiteSpace:'nowrap'}}>Towards</th>
                    <th style={{whiteSpace:'nowrap'}}>Due Days</th>
                    <th style={{whiteSpace:'nowrap'}}>Due</th>
                    <th style={{whiteSpace:'nowrap'}}>Srl</th>
                    <th style={{whiteSpace:'nowrap'}}>Summary Invoice</th>
                    <th style={{whiteSpace:'nowrap'}}>Jw Value</th>
                    <th style={{whiteSpace:'nowrap'}}>Bill Type</th>
                    <th style={{whiteSpace:'nowrap'}}>Material Value</th>
                    <th style={{whiteSpace:'nowrap'}}>Updated</th>
                    <th style={{whiteSpace:'nowrap'}}>Tally_Uid</th>
                    <th style={{whiteSpace:'nowrap'}}>Voucher_Type</th>
                    <th style={{whiteSpace:'nowrap'}}>PreFix</th>
                    <th style={{whiteSpace:'nowrap'}}>Inv Type</th>
                    <th style={{whiteSpace:'nowrap'}}>Ledger Name</th>
                    <th style={{whiteSpace:'nowrap'}}>Tally Ref</th>
                    <th style={{whiteSpace:'nowrap'}}>Calculated Receipts</th>

                    
                    
                    
                    

                    </tr>
                </thead>


                {/* <tbody className='tablebody'>
                    <tr className="" >
                        <td>TaskNo</td>
                        <td>Machine</td>
                        <td>Operation</td>
                        <td>NCProgramNo</td>
                        <td>EstimatedTime</td>
                        <td>ActualTime</td>
                        <td>Qty</td>
                        <td>QtyAllotted</td>
                        <td>QtyCut</td>
                    </tr>
                </tbody> */}
            </Table>
     </div>
 </div>

 <div className="box col-md-6">
    <CustomerOutStandingTable02/>
 </div>

</div>
  )
}
