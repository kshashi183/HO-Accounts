import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TaxMasterForm() {
    const navigate = useNavigate();
    return (
        <div>

            <div className=' mb-2 row col-md-12  ' style={{paddingLeft:'0px'}}>

                <div className='col-md-3'>
                    <button className="button-style mt-2 group-button" type='button'
                        style={{ width: "70px" }} >
                        Add
                    </button>
                </div>

                <div className='col-md-3 '>
                    <button className="button-style mt-2 group-button"
                        style={{ width: "70px" }} type='submit'>
                        Save
                    </button>
                </div>

                <div className='col-md-3 '>
                    <button className="button-style mt-2 group-button" type='button'
                        style={{ width: "70px" }}
                    >
                        Delete
                    </button>

                </div>
                <div className='col-md-3 '>
                    <button className="button-style mt-2 group-button" type='button'
                        style={{ width: "70px" }}
                        onClick={e => navigate("/home")}
                    >
                        Close
                    </button>

                </div>

            </div>




            <form className="form mt-1"  style={{height:'350px', overflowY:"scroll"}} >
                <div className=" " style={{paddingRight:'12px',}} >


                    <div className="col-md-12 ">
                        <label className="form-label ">Tax Name</label>
                        <input className=" " value=''
                            disabled={false}
                            name='refName' />

                    </div>


                    <div className="col-md-12">
                        <label className="form-label">Print Name</label>
                        <input className=" " name='manufacturer'
                            value=''
                            disabled={false} />
                    </div>

                    <div className="col-md-12 ">
                        <label className="form-label">Tax %</label>
                        <input className=" " value=''
                            disabled={false} name='model' />
                    </div>


                    <div className="col-md-12 ">
                        <label className="form-label">Tax on</label>
                        <input className=" "
                            value=''
                        />
                    </div>

                    <div className="col-md-12 ">
                        <label className="form-label">Effective From</label>
                        <input className=" "
                            type='date'
                        />
                    </div>

                    <div className="col-md-12 ">
                        <label className="form-label">Effective To</label>
                        <input className=" "
                            type='date'
                        />
                    </div>

                    <div className="col-md-12 ">
                        <label className="form-label">LedgerName</label>
                        <input className=" "
                            value=''
                        />
                    </div>

                    <div className="col-md-12 ">
                        <label className="form-label">UnderGroup</label>
                        <input className=" "
                            value=''
                        />
                    </div>

                    <div className='row col-md-12'>
                        <div className='row col-md-6 ' style={{}}>

                            <input className="form-check-input mt-2 col-md-3 "
                                type="checkbox"
                                //   checked={false}
                                name='Working'
                                id="flexCheckDefault" />

                            <div className=' col-md-2' style={{}}>

                            <label className="form-label" style={{whiteSpace:'nowrap'}}>Services</label>
                            </div>
                        </div>

                        <div className='row col-md-6' style={{}}>

                            <input className="form-check-input mt-2 col-md-3"
                                type="checkbox"
                                // checked={false}
                                name='Working'
                                id="flexCheckDefault" />

                            <div className=' col-md-2' style={{}}>

                            <label className="form-label" style={{whiteSpace:'nowrap'}}>Sales</label>
                            </div>
                        </div>


                        <div className='row col-md-6' style={{}}>

                            <input className="form-check-input mt-2 col-md-3"
                                type="checkbox"
                                // checked={false}
                                name='Working'
                                id="flexCheckDefault" />

                            <div className=' col-md-5' style={{}}>

                            <label className="form-label" style={{whiteSpace:'nowrap'}}>Job Work</label>
                            </div>
                        </div>


                        <div className='row col-md-6' style={{}}>

                            <input className="form-check-input mt-2 col-md-3"
                                type="checkbox"
                                // checked={false}
                                name='Working'
                                id="flexCheckDefault" />

                            <div className=' col-md-5' >

                                <label className="form-label" style={{whiteSpace:'nowrap'}}>inter state</label>
                            </div>
                        </div>



                        <div className='row col-md-6' style={{}}>

                            <input className="form-check-input mt-2 col-md-3"
                                type="checkbox"
                                // checked={false}
                                name='Working'
                                id="flexCheckDefault" />

                            <div className=' col-md-6' style={{}}>

                            <label className="form-label" style={{whiteSpace:'nowrap'}}>Tally Updated</label>
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <button className="button-style  group-button" type='button'
                                style={{}} >
                                update
                            </button>
                        </div>


                        <div>



                        </div>


                    </div>
                </div>
            </form>
        </div>
    );
}
