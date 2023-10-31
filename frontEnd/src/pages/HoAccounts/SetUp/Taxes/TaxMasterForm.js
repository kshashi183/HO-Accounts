import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate, } from 'react-router-dom';
import TaxDeleteModal from "./TaxDeleteModal";
//import { ToastContainer, toast } from 'react-toastify';

import { toast } from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import { format, parse } from 'date-fns';
import { baseURL } from '../../../../api/baseUrl';





const initial = {
    TaxID: '', TaxName: '', Tax_Percent: '', TaxOn: '', EffectiveFrom: '', EffectiveTO: '', AcctHead: '',
    TallyAcctCreated: 0, UnderGroup: '', Service: 0, Sales: 0, JobWork: 0, IGST: 0
}


export default function TaxMasterForm() {
    const navigate = useNavigate();

    const [taxData, setTaxData] = useState([]);
    const [deleteID, setDeleteID] = useState(false);
    const [taxPostData, setTaxPostData] = useState(initial);


    useEffect(() => {

        axios.get(baseURL+'/taxMaster/getTaxData')
            .then((res) => {
                // console.log("unitdata",res.data);
                if (res.data.Status === 'Success') {
                    // console.log("dataaaa", res.data.Result);
                    // console.log("result", res.data.Result);
                    setTaxData(res.data.Result)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const [state, setState] = useState(false);
    const [selectRow, setSelectRow] = useState(initial);
    const selectedRowFun = (item, index) => {
        let list = { ...item, index: index }
        //  setSelectRow(initial)


        setSelectRow(list);
        setState(true);

    }


    const handleOnChange = (e) => {

        const { name, value, type, checked } = e.target;

        if (!state) {

            if (type === 'checkbox') {
                console.log("111");

                setTaxPostData({ ...taxPostData, [name]: checked ? 1 : 0 })
            }
            else {
                setTaxPostData({ ...taxPostData, [name]: value })
            }
        }
        else {

            if (type === 'checkbox') {

                setSelectRow({ ...selectRow, [name]: checked ? 1 : 0 })
            } else {
                console.log("222");

                setSelectRow({ ...selectRow, [name]: value })
            }
        }
    }

    const updateTaxData = () => {
        if (selectRow.Tax_Percent === '') {
            toast("Tax_Percent can not be empty")
        }
        else
            if (selectRow.EffectiveFrom === '' || selectRow.EffectiveTO === '') {
                toast("Date can not be empty")
            }

            else {
                axios.put(baseURL+'/taxMaster/taxDataUpdate/' + selectRow.TaxID, selectRow)
                    .then((res) => {
                        console.log("hiiiiiiiiiii");
                        console.log("update tax", res.data.status);
                        
                        toast.success("Updated successfully!");
                      
                        setTimeout(() => {

                            window.location.reload();

                        }, 1000);
                    })
                    .catch(err => console.log("err", err))
            }

    }


    const deleteTaxId = () => {
        if (selectRow.TaxID !== '') {
            setDeleteID(true);
        }

    }




    const postTaxSubmit = () => {
        console.log("POST", taxPostData);

        if (taxPostData.Tax_Percent === '') {
            toast("Tax_Percent can not be empty")
        }
        else
            if (taxPostData.EffectiveFrom === '' || taxPostData.EffectiveTO === '') {
                toast("Date can not be empty")
            }

            else {
                axios.post(baseURL+'/taxMaster/postTaxMaster', taxPostData)
                    .then((res) => {
                        if (res.data.status === 'fail') {

                            
                        }
                        else if (res.data.status === 'query') {
                            console.log("22");

                            toast.warn("You must add TaxPercent and Date fields")
                        }
                        else if (res.data.status === 'success') {
                            
                            toast.success("Posted Successfully");
                    
                            setTimeout(() => {

                                window.location.reload();

                            }, 1000);
                            
                        }

                    }).catch((err) => {

                        console.log('eroor in fromntend', err);
                    })

            }
    }



    return (

        <div>
            {
                <TaxDeleteModal deleteID={deleteID} setDeleteID={setDeleteID} selectRow={selectRow} />
            }
            <div className='row'>
                <div className='col-md-8 col-sm-12'>
                    <div className='row mt-1'>
                        <div>
                            <div style={{ height: "430px", overflowY: 'scroll', overflowX: 'scroll' }}>
                                <Table striped className="table-data border">
                                    <thead className="tableHeaderBGColor">
                                        <tr>
                                            <th>Id</th>
                                            <th>TaxName</th>
                                            <th>PrintName</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>Tax %</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>Tax on</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>Effective From</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>Effective To</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>Acct Head</th>
                                            <th>Service</th>
                                            <th>Sales</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>Job Work</th>
                                            <th>IGST</th>
                                            <th>Tally</th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {
                                            taxData.map((item, key) => {

                                                const formattedEffectiveFrom = new Date(item.EffectiveFrom).toLocaleDateString('en-CA');
                                                const formattedEffectiveTO = new Date(item.EffectiveTO).toLocaleDateString('en-CA');

                                                item.EffectiveFrom = formattedEffectiveFrom;
                                                item.EffectiveTO = formattedEffectiveTO;
                                                return (
                                                    <>
                                                        <tr onClick={() => selectedRowFun(item, key)}

                                                            className={key === selectRow?.index ? 'selcted-row-clr' : ''}
                                                        >

                                                            <td>{item.TaxID} </td>
                                                            <td>{item.TaxName} </td>
                                                            <td>{item.TaxPrintName} </td>
                                                            <td>{item.Tax_Percent} </td>
                                                            <td>{item.TaxOn}</td>
                                                            {/* <td>{item.EffectiveFrom}</td>
                                                            <td>{item.EffectiveTO}</td> */}
                                                            <td>{item.FormattedEffectiveFrom}</td>
                                                            <td>{item.FormattedEffectiveTO}</td>

                                                            <td style={{ whiteSpace: 'nowrap' }}>{item.AcctHead}</td>

                                                            <td><input type="checkbox" checked={item.Service === 1} /></td>
                                                            <td><input type="checkbox" checked={item.Sales === 1} /></td>
                                                            <td><input type="checkbox" checked={item.JobWork === 1} /></td>
                                                            <td><input type="checkbox" checked={item.IGST === 1} /></td>
                                                            <td><input type="checkbox" checked={item.TallyAcctCreated === 1} /></td>


                                                        </tr>

                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className=' mb-2 row col-md-12  ' style={{ paddingLeft: '0px' }}>

                        <div className='col-md-3'>
                            <button type='button'
                                style={{ width: "70px" }} onClick={postTaxSubmit}
                                disabled={selectRow.TaxName !== ''}
                                className={selectRow.TaxName !== '' ? 'disabled-button' : 'button-style  group-button'}

                            >
                                Add
                            </button>
                        </div>

                        <div className='col-md-3 '>
                            <button
                                style={{ width: "70px" }} type='submit'
                                onClick={updateTaxData}

                                className={selectRow.TaxName === '' ? 'disabled-button' : 'button-style  group-button'}
                                disabled={selectRow.TaxName === ''}
                            >
                                Update
                            </button>
                        </div>

                        <div className='col-md-3 '>
                            <button className="button-style mt-2 group-button" type='button'
                                style={{ width: "70px" }} onClick={deleteTaxId}
                            >
                                Delete
                            </button>

                        </div>
                        <div className='col-md-3 '>
                            <button className="button-style mt-2 group-button" type='button'
                                style={{ width: "70px" }}
                                onClick={e => navigate("/HOAccounts")}
                            >
                                Close
                            </button>

                        </div>

                    </div>




                    <form className="form mt-1" style={{ height: '350px', overflowY: "scroll" }} >
                        <div className=" " style={{ paddingRight: '12px', }} >


                            <div className="col-md-12 ">
                                <label className="form-label ">Tax Name</label>
                                <input className=" "
                                    value={selectRow.TaxName || taxPostData.TaxName}

                                    disabled={false} onChange={handleOnChange}
                                    name='TaxName' />

                            </div>


                            <div className="col-md-12">
                                <label className="form-label">Print Name</label>
                                <input className=" " name='TaxPrintName'
                                    value={selectRow.TaxPrintName || taxPostData.TaxPrintName} onChange={handleOnChange}
                                    disabled={false} />
                            </div>

                            <div className="col-md-12 ">
                                <label className="form-label">Tax %</label>
                                <input className=" " value={selectRow.Tax_Percent || taxPostData.Tax_Percent}
                                    onChange={handleOnChange}
                                    disabled={false} name='Tax_Percent' />
                            </div>


                            <div className="col-md-12 ">
                                <label className="form-label">Tax on</label>
                                <input className=" " name='TaxOn'
                                    value={selectRow.TaxOn || taxPostData.TaxOn} onChange={handleOnChange}
                                />
                            </div>

                            <div className="col-md-12 ">
                                <label className="form-label">Effective From</label>
                                <input name='EffectiveFrom'
                                    type='date'
                                    value={selectRow.EffectiveFrom || taxPostData.EffectiveFrom}
                         
                                    onChange={handleOnChange}
                                />

                            </div>


                            <div className="col-md-12">
                                <label className="form-label">Effective To</label>
                                <input
                                    className=""
                                    value={(selectRow.EffectiveTO || taxPostData.EffectiveTO)}
                                    onChange={handleOnChange}
                                    name='EffectiveTO'
                                    type='date'

                                />
                            </div>


                            <div className="col-md-12 ">
                                <label className="form-label">LedgerName</label>
                                <input className=" " name='AcctHead'
                                    value={selectRow.AcctHead || taxPostData.AcctHead} onChange={handleOnChange}
                                />
                            </div>

                            <div className="col-md-12 ">
                                <label className="form-label">UnderGroup</label>
                                <input className=" " name='UnderGroup'
                                    value={selectRow.UnderGroup || taxPostData.UnderGroup} onChange={handleOnChange}
                                />
                            </div>

                            <div className='row col-md-12'>
                                <div className='row col-md-6 ' >

                                    <input className="mt-3 col-md-3  custom-checkbox "
                                        type="checkbox"
                                        checked={selectRow.Service === 1 ? true : false || taxPostData.Service === 1 ? true : false}
                                        name='Service'
                                        id="flexCheckDefault" onChange={handleOnChange} />

                                    <div className=' col-md-2' >

                                        <label className="form-label" style={{ whiteSpace: 'nowrap' }}>Service</label>
                                    </div>
                                </div>

                                <div className='row col-md-6' >

                                    <input className="mt-3 col-md-3  custom-checkbox"
                                        type="checkbox"
                                        checked={selectRow.Sales === 1 ? true : false || taxPostData.Sales === 1 ? true : false}
                                        name='Sales'
                                        id="flexCheckDefault" onChange={handleOnChange} />

                                    <div className=' col-md-2' >

                                        <label className="form-label" style={{ whiteSpace: 'nowrap' }}>Sales</label>
                                    </div>
                                </div>


                                <div className='row col-md-6' >

                                    <input className="mt-3 col-md-3  custom-checkbox"
                                        type="checkbox"
                                        checked={selectRow.JobWork === 1 ? true : false || taxPostData.JobWork === 1 ? true : false}
                                        name='JobWork' onChange={handleOnChange}
                                        id="flexCheckDefault" />

                                    <div className=' col-md-5' >

                                        <label className="form-label" style={{ whiteSpace: 'nowrap' }}>Job Work</label>
                                    </div>
                                </div>


                                <div className='row col-md-6'>

                                    <input className="mt-3 col-md-3  custom-checkbox"
                                        type="checkbox"
                                        checked={selectRow.IGST === 1 ? true : false || taxPostData.IGST === 1 ? true : false}
                                        name='IGST' onChange={handleOnChange}
                                        id="flexCheckDefault" />

                                    <div className=' col-md-5' >

                                        <label className="form-label" style={{ whiteSpace: 'nowrap' }}>Inter State</label>
                                    </div>
                                </div>



                                <div className='row col-md-12' >

                                    <input className="mt-3 col-md-1 ms-1  custom-checkbox"
                                        type="checkbox"
                                        checked={selectRow.TallyAcctCreated === 1 ? true : false || taxPostData.TallyAcctCreated === 1 ? true : false}
                                        name='TallyAcctCreated' onChange={handleOnChange}
                                        id="flexCheckDefault" />

                                    <div className=' col-md-6' >

                                        <label className="form-label" style={{ whiteSpace: 'nowrap' }}>Tally Updated</label>
                                    </div>


                                    <button type='button'
                                        className={selectRow.TaxName === '' ? 'disabled-button' : 'button-style  group-button'}
                                        disabled={selectRow.TaxName === ''}
                                        style={{ width: '100px', }} onClick={updateTaxData}>
                                        Update
                                    </button>
                                </div>

                                <div>

                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
