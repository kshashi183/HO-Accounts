import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap'
import axios from 'axios';
import xmljs from 'xml-js';
import { useGlobalContext } from '../../../Context/Context';
import { baseURL } from '../../../../../api/baseUrl';


export default function InvoiceList({ selectedDate, setFlag, flag, exportTally, setExportTally }) {
    const [invoiceListData, setInvoiceListData] = useState([]);
    const [taxInvoiceData, setTaxInvoiceData] = useState([]);


    useEffect(() => {
        setExportTally(false);
        if (selectedDate) {
            invoiceListSubmit();
        }
    }, [selectedDate, exportTally])



    const invoiceListSubmit = () => {
        axios.get(baseURL + '/tallyExport/getInvoiceData',
            {
                params: {
                    date: selectedDate
                }
            }
        )
            .then((res) => {

                setInvoiceListData(res.data.Result)
               // console.log("inv ", res.data.Result);
            })
            .catch((err) => {
                console.log("err", err);
            })

        
    }




    const invoiceTaxDetails = (dcNo) => {
        if (dcNo) {
            axios.get(baseURL + '/tallyExport/getInvoiceTaxDetails',
                {
                    params: {
                        DC_Inv_No: dcNo
                    }
                }
            )
                .then((res) => {
                  //  console.log("inv 2", res.data.Result);
                    setTaxInvoiceData(res.data.Result)
                })
                .catch((err) => {
                    console.log("err", err);
                })

        }
    }

    const [selectRow, setSelectRow] = useState('');
    const selectedRowFun = (item, index) => {
        let list = { ...item, index: index }
        setSelectRow(list);

        invoiceTaxDetails(item.DC_Inv_No)
    }


    const convertDateFormat = (dateString) => {
        if (dateString) {
            const parts = dateString.split('-');
            if (parts.length === 3) {
                const [yy, dd, mm] = parts;

                return `${dd}/${mm}/${yy}`;
            }
        }

        return dateString;
    };


    useEffect(() => {
        if (invoiceListData.length > 0 && flag) {
          selectedRowFun(invoiceListData[0],0)
        } 
        
      }, [invoiceListData, flag]);





   

    
    // const tableToXml = () => {
    //     const xmlData = {
    //         ENVELOPE: {
    //             HEADER: {
    //                 TALLYREQUEST: { _text: 'Import Data' }
    //             },
    //             Body: {
    //                 ImportData: {
    //                     REQUESTDESC: {
    //                         REPORTNAME: { _text: 'Vouchers' },
    //                         STATICVARIABLES: {
    //                             SVCURRENTCOMPANY: { _text: 'MLMPL_Jigani_2023_24' }
    //                         }
    //                     },
    //                     TALLYMESSAGE: {
    //                         _attributes: { 'xmlns:UDF': 'TallyUDF' },
    //                         VOUCHER: invoiceListData.map((voucher) => {

    //                             const creditPeriod = Math.round(
    //                                 Math.abs(new Date(voucher.PaymentDate) - new Date(voucher.Inv_Date)) / (1000 * 60 * 60 * 24)
    //                             );
    //                             const baseVoucher = {
    //                                 _attributes: {
    //                                     REMOTEID: voucher.DC_Inv_No,
    //                                     VCHTYPE: voucher.DC_InvType,
    //                                     ACTION: 'Create'
    //                                 },
    //                                 DATE: voucher.Inv_Date,
    //                                 GUID: voucher.DC_Inv_No,
    //                                 NARRATION: `Our WO No: ${voucher.OrderNo} Packing Note No: ${voucher.DC_no}/ ${voucher.DC_Fin_Year}`,
    //                                 VOUCHERTYPENAME: voucher.DC_InvType,
    //                                 VOUCHERNUMBER: `${voucher.Prefix} /${voucher.Inv_No} / ${voucher.Inv_Fin_Year}`,
    //                                 REFERENCE: voucher.PO_No,
    //                                 PARTYLEDGERNAME: voucher.Cust_Name,
    //                                 CSTFORMISSUETYPE: "",
    //                                 CSTFORMRECVTYPE: '',
    //                                 FBTPAYMENTTYPE: 'Default',
    //                                 VCHGSTCLASS: '',
    //                                 DIFFACTUALQTY: 'No',
    //                                 AUDITED: 'No',
    //                                 FORJOBCOSTING: 'No',
    //                                 ISOPTIONAL: 'No',
    //                                 EFFECTIVEDATE: voucher.Inv_Date,
    //                                 USEFORINTEREST: 'No',
    //                                 USEFORGAINLOSS: 'No',
    //                                 USEFORGODOWNTRANSFER: 'No',
    //                                 USEFORCOMPOUND: 'No',
    //                                 ALTERID: '2',
    //                                 EXCISEOPENING: "No",
    //                                 ISCANCELLED: 'No',
    //                                 HASCASHFLOW: 'No',
    //                                 ISPOSTDATED: 'No',
    //                                 USETRACKINGNUMBER: 'No',
    //                                 ISINVOICE: 'No',
    //                                 MFGJOURNAL: 'No',
    //                                 HASDISCOUNTS: 'No',
    //                                 ASPAYSLIP: 'No',
    //                                 ISDELETED: 'No',
    //                                 ASORIGINAL: 'No',
    //                             };
    
    //                             if (Array.isArray(voucher.LedgerName)) {
    //                                 baseVoucher.ALLLEDGERENTRIES_LIST = voucher.LedgerName.map((ledgerName) => ({
    //                                     LEDGERNAME: ledgerName,
    //                                     GSTCLASS: '',
    //                                     ISDEEMEDPOSITIVE: 'Yes',
    //                                     LEDGERFROMITEM: 'No',
    //                                     REMOVEZEROENTRIES: 'No',
    //                                     ISPARTYLEDGER: 'Yes',
    //                                     AMOUNT: 'Amount 1',
    //                                     BILLALLOCATIONS_LIST: {
    //                                         NAME: 'RefName',
    //                                         BILLCREDITPERIOD: creditPeriod.toString(),
    //                                         BILLTYPE: 'New Ref',
    //                                         AMOUNT: 'a',
    //                                     },
    //                                 }));
    //                             } else {
    //                                 baseVoucher.ALLLEDGERENTRIES_LIST = [
    //                                     {
    //                                         LEDGERNAME: voucher.LedgerName,
    //                                         GSTCLASS: '',
    //                                         ISDEEMEDPOSITIVE: 'Yes',
    //                                         LEDGERFROMITEM: 'No',
    //                                         REMOVEZEROENTRIES: 'No',
    //                                         ISPARTYLEDGER: 'Yes',
    //                                         AMOUNT: 'Amount 1',
                                          
    //                                         BILLALLOCATIONS_LIST: taxInvoiceData
    //                                         .filter((item) => item.Dc_inv_No === voucher.DC_Inv_No)
    //                                         .map((item) => {
    //                                             return {
    //                                                 NAME:item.RefName ,
    //                                             BILLCREDITPERIOD: creditPeriod.toString(),
    //                                           //  .CreditPeriod = DateDiff(DateInterval.Day, inv.Inv_Date, inv.PaymentDate)
    //                                          //   DateDiff(DateInterval.Day, .item("inv_date"), .item("PaymentDate")))
    //                                             BILLTYPE: 'New Ref',
    //                                             AMOUNT: item.Amount,
    //                                             };
    //                                         }),
    //                                     },
    //                                 ];
    //                             }
    
    //                             return baseVoucher;
    //                         }),
    //                     },
    //                 },
    //             },
    //         },
    //     };
    
    //     const xml = xmljs.js2xml(xmlData, { compact: true, spaces: 2 });
    //     return xml;
    // };
    
    const tableToXml = () => {
        const xmlData = {
            ENVELOPE: {
                HEADER: {
                    TALLYREQUEST: { _text: 'Import Data' }
                },
                Body: {
                    ImportData: {
                        REQUESTDESC: {
                            REPORTNAME: { _text: 'Vouchers' },
                            STATICVARIABLES: {
                                SVCURRENTCOMPANY: { _text: 'MLMPL_Jigani_2023_24' }
                            }
                        },
                        TALLYMESSAGE: {
                            _attributes: { 'xmlns:UDF': 'TallyUDF' },
                            VOUCHER: invoiceListData.map((voucher) => {
                                const creditPeriod = Math.round(
                                    Math.abs(new Date(voucher.PaymentDate) - new Date(voucher.Inv_Date)) / (1000 * 60 * 60 * 24)
                                );
    
                                // Check condition for voucher.Del_chg > 0
                                const includeDelChg = voucher.Del_chg > 0;
                                const allLedgerEntriesDelChg = includeDelChg ? [{
                                    LEDGERNAME: 'Your LedgerName For DelChg',
                                    GSTCLASS: '',
                                    ISDEEMEDPOSITIVE: 'Yes',
                                    LEDGERFROMITEM: 'No',
                                    REMOVEZEROENTRIES: 'No',
                                    ISPARTYLEDGER: 'Yes',
                                    AMOUNT: voucher.Del_chg ,
                                    BILLALLOCATIONS_LIST: {
                                        NAME: 'RefNameFor DelChg',
                                        BILLCREDITPERIOD: creditPeriod.toString(),
                                        BILLTYPE: 'New Ref',
                                        AMOUNT: 'a',
                                    },
                                }] : undefined;
    
                                // Check condition for voucher.Round_off !== 0
                                const includeRoundOff = voucher.Round_Off !== 0;
                                const allLedgerEntriesRoundOff = includeRoundOff ? [{
                                    LEDGERNAME: 'Your LedgerName For RoundOff',
                                    GSTCLASS: '',
                                    ISDEEMEDPOSITIVE: 'Yes',
                                    LEDGERFROMITEM: 'No',
                                    REMOVEZEROENTRIES: 'No',
                                    ISPARTYLEDGER: 'Yes',
                                    AMOUNT: voucher.Round_Off,
                                    BILLALLOCATIONS_LIST: {
                                        NAME: 'Ref NameFor RoundOff',
                                        BILLCREDITPERIOD: creditPeriod.toString(),
                                        BILLTYPE: 'New Ref',
                                        AMOUNT: "a",
                                    },
                                }] : undefined;
    
                                const baseVoucher = {
                                    _attributes: {
                                        REMOTEID: voucher.DC_Inv_No,
                                        VCHTYPE: voucher.DC_InvType,
                                        ACTION: 'Create'
                                    },
                                    DATE: voucher.Inv_Date,
                                    GUID: voucher.DC_Inv_No,
                                    NARRATION: `Our WO No: ${voucher.OrderNo} Packing Note No: ${voucher.DC_no}/ ${voucher.DC_Fin_Year}`,
                                    VOUCHERTYPENAME: voucher.DC_InvType,
                                    VOUCHERNUMBER: `${voucher.Prefix} /${voucher.Inv_No} / ${voucher.Inv_Fin_Year}`,
                                    REFERENCE: voucher.PO_No,
                                    PARTYLEDGERNAME: voucher.Cust_Name,
                                    CSTFORMISSUETYPE: "",
                                    CSTFORMRECVTYPE: '',
                                    FBTPAYMENTTYPE: 'Default',
                                    VCHGSTCLASS: '',
                                    DIFFACTUALQTY: 'No',
                                    AUDITED: 'No',
                                    FORJOBCOSTING: 'No',
                                    ISOPTIONAL: 'No',
                                    EFFECTIVEDATE: voucher.Inv_Date,
                                    USEFORINTEREST: 'No',
                                    USEFORGAINLOSS: 'No',
                                    USEFORGODOWNTRANSFER: 'No',
                                    USEFORCOMPOUND: 'No',
                                    ALTERID: '2',
                                    EXCISEOPENING: "No",
                                    ISCANCELLED: 'No',
                                    HASCASHFLOW: 'No',
                                    ISPOSTDATED: 'No',
                                    USETRACKINGNUMBER: 'No',
                                    ISINVOICE: 'No',
                                    MFGJOURNAL: 'No',
                                    HASDISCOUNTS: 'No',
                                    ASPAYSLIP: 'No',
                                    ISDELETED: 'No',
                                    ASORIGINAL: 'No',
    
                                    // Include ALLLEDGERENTRIES_LIST based on conditions
                                    ...(includeDelChg && { ALLLEDGERENTRIES_LIST: allLedgerEntriesDelChg }),
                                    ...(includeRoundOff && { ALLLEDGERENTRIES_LIST: allLedgerEntriesRoundOff }),
                                };
    
                                return baseVoucher;
                            }),
                        },
                    },
                },
            },
        };
    
        const xml = xmljs.js2xml(xmlData, { compact: true, spaces: 2 });
        return xml;
    };
    
    









    const handleExport = () => {
        const xml = tableToXml();
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Jigani_Inv_Vouchers.xml';
        a.click();
        window.URL.revokeObjectURL(url);

       // exportInvoices(xml);
    };




    const exportInvoices=async (xml)=>{
        //  console.log("xml payment vreceipt",xml);
        const tallyUrl = 'http://localhost:9000'; 
  
  
        try {
          const response = await fetch(`${tallyUrl}/import`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/xml',
              },
              body: xml,
          });
  
          if (response.ok) {
              console.log('XML data successfully sent to Tally.');
              // Handle success
          } else {
              console.error('Failed to send XML data to Tally.');
              // Handle failure
          }
      } catch (error) {
          console.error('Error sending XML data to Tally:', error);
          // Handle error
      }
  };

    if (exportTally) {
        handleExport();
    }

    const [taxTable, setTaxTable]=useState()
    const tableRowSelect=(item, index)=>{
        let list = { ...item, index: index }
        setTaxTable(list)

    }

    return (
        <>
            <div className='row col-md-12'>
                <div className='col-md-6' style={{ height: '700px', overflowX: 'scroll', overflowY: 'scroll' }}>

                    <Table striped className="table-data border">
                        <thead className="tableHeaderBGColor">
                            <tr style={{ whiteSpace: 'nowrap' }}>

                                <th>Tally</th>
                                <th >Bill Type</th>
                                <th >Inv Type</th>
                                <th >Inv No</th>
                                <th>Customer</th>
                                <th >Grand Total</th>
                                <th >PO No</th>
                                <th >Tally Ref</th>
                                <th >Cust_Code</th>
                                <th >Updated</th>

                            </tr>

                        </thead>

                        <tbody className='tablebody'>
                            {flag &&
                                invoiceListData.map((item, key) => {
                                    return (
                                        <tr
                                            onClick={() => selectedRowFun(item, key)}
                                            className={key === selectRow?.index ? 'selcted-row-clr' : ''}
                                            style={{ whiteSpace: 'nowrap', backgroundColor: '#FF7F50' }}>

                                            <td>{<input type='checkBox' disabled />}</td>
                                            <td>{item.BillType}</td>
                                            <td>{item.DC_InvType}</td>
                                            <td>{item.Inv_No}</td>
                                            <td>{item.Cust_Name}</td>
                                            <td>{item.GrandTotal}</td>
                                            <td>{item.PO_No}</td>
                                            <td>{item.TallyRef}</td>
                                            <td>{item.Cust_Code}</td>
                                            <td>{<input type='checkBox' disabled />}</td>
                                        </tr>
                                    )

                                })
                            }

                        </tbody>
                    </Table>

                </div>


                <div className='col-md-6'>
                    <Form className="form mt-2" style={{ overflowY: "scroll", height: '400px' }} >
                        <div className=" ">
                            <div className="row ">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5' style={{ whiteSpace: 'nowrap' }}>Invoice No</label>
                                        <input class="" type="text" value={selectRow.Inv_No} style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>PN No</label>
                                        <input class="" type="text" value={selectRow.DC_No} disabled style={{ fontSize: "13px", }} />
                                    </div>
                                </div>

                            </div>



                            <div className="row mt-1">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>Type</label>
                                        <input class="" type="text" value={selectRow.DC_InvType} disabled style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>PN Date</label>
                                        <input class="" type="text"
                                            value={convertDateFormat(selectRow.Inv_Date)}
                                            disabled style={{ fontSize: "13px" }} />
                                    </div>
                                </div>

                            </div>



                            <div className="row mt-1 ">
                                <div className="row col-md-12">
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-2'>PO No</label>
                                        <input class=" " type="text" value={selectRow.PO_No} disabled style={{ fontSize: "13px", }} />
                                    </div>


                                </div>

                            </div>

                            <div className="row mt-1 ">
                                <div className="row col-md-12">
                                    <div className=" col-md-12">
                                        <label className='form-label col-md-2'>Customer</label>
                                        <input class=" " type="text" value={selectRow.Cust_Name} disabled style={{ fontSize: "13px" }} />
                                    </div>


                                </div>

                            </div>


                            <div className="row mt-1">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>Place</label>

                                        <input class="" type="text" value={selectRow.Cust_place} disabled style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>NetTotal</label>
                                        <input class="" type="text" value={selectRow.Net_Total} disabled style={{ fontSize: "13px" }} />
                                    </div>
                                </div>

                            </div>



                            <div className="row mt-1">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>State</label>
                                        <input class="" type="text" value={selectRow.Cust_state} disabled style={{ fontSize: "13px" }} />
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>Net Value</label>
                                        <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                    </div>
                                </div>

                            </div>



                            <div className="row mt-1">
                                <div className="row col-md-12">
                                    <div className=" col-md-6">
                                        <label className='form-label col-md-5'>Pin Code</label>
                                        <div>
                                            <input class="" type="text" value={selectRow.PIN_Code} disabled style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className=" col-md-6">
                                        <label className='form-label col-md-10'>Assessamble Value</label>

                                        <div>
                                            <input class="" type="text" value={selectRow.AssessableValue} disabled style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row col-md-12 mt-2">

                                <div className=" col-md-6">

                                    <label className="form-label ms-2"> Address</label>

                                    <textarea className="form-control sticky-top" value={selectRow.Cust_address} disabled style={{ height: '240px', resize: 'none' }}></textarea>

                                </div>
                                <div className='col-md-6'>
                                    <div className="">
                                        <label className='form-label col-md-10'>Deliver Charges</label>
                                        <div>
                                            <input class="" type="text" placeholder="" style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className="">
                                        <label className='form-label col-md-10'>Taxes</label>
                                        <div>
                                            <input class="x" type="text" value={selectRow.TaxAmount} disabled style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className=" mt-1">
                                        <label className='form-label col-md-5' style={{ whiteSpace: 'nowrap' }}>Invoice total</label>
                                        <div>
                                            <input class="" type="text" value={selectRow.InvTotal} disabled style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className=" mt-1">
                                        <label className='form-label col-md-5'>Round Off</label>
                                        <div>
                                            <input class="" type="text" value={selectRow.Round_Off} disabled style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>

                                    <div className=" mt-1">
                                        <label className='form-label col-md-5'>Grand Total</label>
                                        <div>
                                            <input class="" type="text" value={selectRow.GrandTotal} disabled style={{ fontSize: "13px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Form>


                    <div className='col-md-12 mt-1' style={{ height: '300px', overflowX: 'scroll', overflowY: 'scroll' }}>

                        <Table striped className="table-data border">
                            <thead className="tableHeaderBGColor">
                                <tr style={{ whiteSpace: 'nowrap' }}>


                                    <th >Tax Name</th>
                                    <th >Taxable Amount</th>
                                    <th >Tax %</th>

                                    <th >Tax Amount</th>
                                    <th >Inv Taxid</th>
                                    <th>Sync_Hold</th>
                                    <th >Unit_Uid</th>
                                    <th >Updated</th>
                                    <th >UnitName</th>
                                    <th >dc_invTaxid</th>
                                    <th>Dc_Inv_No</th>
                                    <th >Dc TaxId</th>
                                    <th >TaxID</th>
                                    {/* <th style={{ whiteSpace: 'nowrap' }}>Tax_Name</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>TaxOn</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>TaxableAmount</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>TaxPercent</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>ToWords</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv Type</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Acct Head</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Inv Id</th> */}


                                </tr>

                            </thead>

                            <tbody className='tablebody'>
                                {
                                    taxInvoiceData.map((item, key) => {
                                        return (
                                            <tr
                                            onClick={() => tableRowSelect(item, key)}

                                            className={key === taxTable?.index ? 'selcted-row-clr' : ''}
                                            >
                                                <td>{item.Tax_Name}</td>
                                                <td>{item.TaxableAmount}</td>
                                                <td>{item.TaxPercent}</td>
                                                <td>{item.TaxAmt}</td>
                                                <td>{item.InvTaxId}</td>
                                                <td></td>
                                                <td>{item.Unit_UId}</td>
                                                <td>{<input type='checkBox' />}</td>
                                                <td>{item.UnitName}</td>
                                                <td>{item.dc_invTaxId}</td>
                                                <td>{item.Dc_inv_No}</td>
                                                <td>{item.DcTaxID}</td>
                                                <td>{item.InvId}</td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>

                    </div>
                </div>

            </div>
        </>
    );
}
