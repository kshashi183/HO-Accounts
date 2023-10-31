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
        axios.get(baseURL+'/tallyExport/getInvoiceData',
            {
                params: {
                    date: selectedDate
                }
            }
        )
            .then((res) => {

                setInvoiceListData(res.data.Result)
            })
            .catch((err) => {
                console.log("err", err);
            })

        // if(exportTally){
        //     handleExport();
        // }
    }




    const invoiceTaxDetails = (dcNo) => {
        if (dcNo) {
            axios.get(baseURL+'/tallyExport/getInvoiceTaxDetails',
                {
                    params: {
                        DC_Inv_No: dcNo
                    }
                }
            )
                .then((res) => {

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



    // Function to convert data to XML

    const tableToXml = () => {
        const xmlData = {
            table: {
                _attributes: {
                    version: '1.0',
                },
                rows: invoiceListData.map((row) => ({
                    row: {
                        _attributes: { DC_InvType: row.DC_InvType },
                        Cust_Name: { _text: row.Cust_Name },


                    },
                })),

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
        a.download = 'Export_Tally.xml';
        a.click();
        window.URL.revokeObjectURL(url);
    };


    if (exportTally) {
        handleExport();
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
                                    taxInvoiceData.map((item, index) => {
                                        return (
                                            <tr>
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
