import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import CustomerOutStandingTable02 from './CustomerOutStandingTable02'
import axios from 'axios';
import { baseURL } from '../../../../../api/baseUrl';

export default function CustomerOutStanding({ selectedCustCode,searchQuery }) {

    const [dataBasedOnCust, setDataBasedOnCust] = useState([]);

    console.log(selectedCustCode, "cust cosssde");
    useEffect(() => {
        // basedOnCustomer();
        if (selectedCustCode) {
            axios.get(baseURL+'/customerOutstanding/getDataBasedOnCustomer',
                {
                    params: {
                        selectedCustCode: selectedCustCode
                    },
                }
            )
                .then((res) => {
                  //  console.log("cust code data", res.data.Result);
                    setDataBasedOnCust(res.data.Result)
                }).catch((err) => {
                    console.log("errin cust cosde", err);
                })

        }
        else {
            console.log("not fetch");
        }
    }, [selectedCustCode])


    const basedOnCustomer = () => {

    }

    const filteredInvoiceNumbers = dataBasedOnCust.filter((row) =>
    row['Inv_No'].includes(searchQuery)
  );
  

  const [selectedDCInvNo, setSelectedDCInvNo] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);


// Function to handle row selection
const handleRowSelect = (dcInvNo) => {
  setSelectedDCInvNo(dcInvNo);
  setSelectedRow(dcInvNo);
  
};
    return (
        <div className='row col-md-12'>
            <div className='mt-3 col-md-6'>
                <div style={{ height: "250px", overflowY: "scroll", overflowX: 'scroll' }}>
                    <Table className='table-data border'  striped>
                        <thead className='tableHeaderBGColor' style={{ textAlign: "center" }}>
                            <tr>
                               <th>Select</th>
                                <th>Type</th>
                                <th>Inv_No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Invoice_Date</th>
                                <th>Total</th>
                                <th>Balance</th>
                                <th>Due_Days</th>
                                <th>Status</th>
{/*                                
                                <th style={{ whiteSpace: 'nowrap' }}>Sync_HoId</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Unit_Uid</th>
                               
                                <th style={{ whiteSpace: 'nowrap' }}>Unit_Name</th>
                                <th style={{ whiteSpace: 'nowrap' }}>DC_Inv_No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Scheduled</th>
                                <th style={{ whiteSpace: 'nowrap' }}>DC_Inv_Date</th>
                                <th style={{ whiteSpace: 'nowrap' }}>InvoiceFor</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Order_No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Order_Date</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Order_ScheduleNo</th>
                                <th style={{ whiteSpace: 'nowrap' }}>DC_No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>DC_Date</th>
                                <th style={{ whiteSpace: 'nowrap' }}>DC_Fin_Year</th>
                               
                                
                                <th style={{ whiteSpace: 'nowrap' }}>Inv_Fin_Year</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Payment Date</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Pmny_Recd</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Payment Mode</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Pymt_Amt_Recd</th>
                                
                                <th style={{ whiteSpace: 'nowrap' }}>Payment_Receipt_Details</th>
                                <th style={{ whiteSpace: 'nowrap' }}>GRN No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Cust_Code</th>
                               
                                <th style={{ whiteSpace: 'nowrap' }}>Cust_Name</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Cust_Address</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Cust_Place</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Cust_State</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Cust_StateId</th>
                                <th style={{ whiteSpace: 'nowrap' }}>PIN_Code</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Del_Address</th>
                                <th style={{ whiteSpace: 'nowrap' }}>ECC_No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>GST No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>TIN No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>KST_No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>TaxAmount</th>
                                <th style={{ whiteSpace: 'nowrap' }}>CST_No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>PO_No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>PO_Date</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Net_Total</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Pkng_Chg</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Tpt Changes</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Discount</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Pgm_Dft_Chg</th>
                                <th style={{ whiteSpace: 'nowrap' }}>MtrlChg</th>
                                
                                <th style={{ whiteSpace: 'nowrap' }}>Assessable Value</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Del_Chg</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Inv Total</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Round_off</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Grand Total</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Total_Wt</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Scrap Wt</th>
                                <th style={{ whiteSpace: 'nowrap' }}>DC_Status</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Cenvat Srl No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Despatch Time</th>
                                <th style={{ whiteSpace: 'nowrap' }}>TptMode</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Veh No</th>
                             
                                <th style={{ whiteSpace: 'nowrap' }}>Ex Not No</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Insp By</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Packed By</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Com_inv_id</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Remarks</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Del_Responsibility</th>
                                <th style={{ whiteSpace: 'nowrap' }}>Payment Terms</th>
                                <th style={{ whiteSpace: 'nowrap' }}>PkngLevel</th>


                                

                                
                                <th style={{ whiteSpace: 'nowrap' }}>Summary Invoice</th>
                               
                                <th style={{ whiteSpace: 'nowrap' }}>Bill Type</th> */}
                                






                            </tr>
                        </thead>


                        <tbody className='tablebody'>
                            {/* {
                                dataBasedOnCust.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    <input type='checkbox' disabled/>
                                                </td>
                                                <td style={{ whiteSpace: 'nowrap' }}>{item.DC_InvType}</td>
                                                <td>{item.Inv_No}</td>
                                                <td>{item.Inv_Date}</td>
                                                <td></td>
                                                <td>{item.Balance}</td>
                                                <td>{item.duedays}</td>
                                                <td>{item.DCStatus}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            } */}

                            {filteredInvoiceNumbers.map((item, index) => (
                               
                                <tr onClick={() => handleRowSelect(item.DC_Inv_No)}
                                key={index}
                               
                                className={selectedRow === item.DC_Inv_No ? 'selcted-row-clr' : ''}
                               >
                              <td><input type='checkBox' disabled/></td>
                                <td style={{ whiteSpace: 'nowrap' }}>{item.DC_InvType}</td>
                                <td>{item.Inv_No}</td>
                                <td>{item.Formatted_Inv_Date}</td>
                                <td>{item.GrandTotal}</td>
                                <td>{item.Balance}</td>
                                <td>{item.duedays}</td>
                                <td>{item.DCStatus}</td>
                               
                                {/* <td>{item.Sync_HOId}</td>
                                <td>{item.Unit_Uid}</td>
                                
                               
                                <td>{item.UnitName}</td>
                                <td>{item.DC_Inv_No}</td>
                                <td>{item.ScheduleId}</td>
                                <td>{item.Formatted_DC_inv_Date}</td>
                     
                      <td>{item.InvoiceFor}</td>
                      <td>{item.OrderNo}</td>
                      <td>{item.Formatted_OrderDate}</td>
                      <td>{item.OrderScheduleNo}</td>
                      <td>{item.Dc_No}</td>
                      <td style={{whiteSpace:'nowrap'}}>{item.Formatted_DC_Date}</td>
                      <td>{item.DC_Fin_Year}</td>
                     
                      
                      <td>{item.Inv_Fin_Year}</td>
                      <td>{item.Formatted_PaymentDate}</td>
                    
                    <td><input type="checkbox" checked={item.PmnyRecd === 1} /></td>
                    <td>{item.PaymentMode}</td>
                    <td>{item.PymtAmtRecd}</td>
                  
                    <td>{item.PaymentReceiptDetails}</td>
                    <td>{item.GRNNo}</td>
                      <td>{item.Cust_Code}</td>
                      <td style={{whiteSpace:'nowrap'}}>{item.Cust_Name}</td>
                      <td style={{whiteSpace:'nowrap'}}>{item.Cust_Address}</td>
                      <td>{item.Cust_Place}</td>
                      <td style={{whiteSpace:'nowrap'}}>{item.Cust_State}</td>
                      <td>{item.Cust_StateId}</td>
                      <td>{item.PIN_Code}</td>
                      <td>{item.Del_Address}</td>
                      <td>{item.ECC_No}</td>
                      
                      <td>{item.GSTNo}</td>
                      <td>{item.TIN_No}</td>
                      <td>{item.KST_No}</td>
                      <td>{item.TaxAmount}</td>
                      <td>{item.CST_No}</td>
                      <td style={{whiteSpace:'nowrap'}}>{item.PO_No}</td>
                      <td>{item.Formatted_PO_Date}</td>
                      <td>{item.Net_Total}</td>
                      <td>{item.Pkng_chg}</td>
                      <td>{item.TptCharges}</td>
                      <td>{item.Discount}</td>
                      <td>{item.Pgm_Dft_Chg}</td>
                      <td>{item.MtrlChg}</td>
                      
                      <td>{item.AssessableValue}</td>
                      <td>{item.Del_Chg}</td>
                      <td>{item.InvTotal}</td>
                      <td>{item.Round_Off}</td>
                      <td>{item.GrandTotal}</td>
                      <td>{item.Total_Wt}</td>
                      <td>{item.ScarpWt}</td>
                      <td>{item.DCStatus}</td>
                      <td>{item.CenvatSrlNo}</td>
                      <td>{item.Formatted_DespatchTime}</td>
                      <td>{item.TptMode}</td>
                      <td>{item.VehNo}</td>
                  
                      <td>{item.ExNotNo}</td>

                      <td>{item.InspBy}</td>
                      <td>{item.PackedBy}</td>
                      <td>{item.Com_inv_id}</td>
                      <td style={{whiteSpace:'nowrap'}}>{item.Remarks}</td>
                      <td>{item.Del_responsibility}</td>
                      <td>{item.PaymentTerms}</td>
                      <td>{item.pkngLevel}</td> */}

                     


                      {/* <td><input type="checkbox" checked={item.SummaryInvoice === 1} /></td>
                      <td>{item.BillType}</td> */}
                      
        
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            <div className="box col-md-6">
                <CustomerOutStandingTable02
                 selectedCustCode={selectedCustCode} selectedDCInvNo={selectedDCInvNo}  />
           
            </div>

        </div>
    )
}
