import React from 'react'
import { Form } from 'react-bootstrap'

export default function UnitDetailsForm() {
    return (
        <div>
            <div className='row col-md-12 mt-3'>


            </div>
            <div className='row col-md-12 ' style={{overflowY:'scroll', height:'400px'}}>
                <div className='col-md-6'>
                    <div className=' col-md-12 '>
                        <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>Unit Id</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-12 '>
                        <label className='form-label col-md-6  '>Unit Name</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                    <div className=" col-md-12">

                        <label className="form-label">Unit Address</label>

                        <textarea className="form-control sticky-top" rows='2' id="" style={{ height: '143px', resize: 'none' }}></textarea>

                    </div>

                    <div className=' d-flex col-md-12 '>
                        <div className='col-md-6'>
                        <label className='form-label col-md-6  '>Place</label>
                        <input class=" col-md-11 " type="text" placeholder=" " />
                        </div>
                        <div className='col-md-6'>
                        <label className='form-label col-md-6  '>Pincode</label>
                        <input class="  " type="text" placeholder=" " />
                        </div>
                        
                    </div>

                    <div className=' col-md-12 '>
                        <label className='form-label col-md-6  '>State</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-12 '>
                        <label className='form-label col-md-6  '>Country</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                    <div className=" col-md-12">

                        <label className="form-label">Contact details</label>

                        <textarea className="form-control sticky-top" rows='2' id="" style={{ height: '143px', resize: 'none' }}></textarea>

                    </div>
                </div>



                <div className='col-md-6'>
                    <div className=' col-md-12 '>
                        <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>GST No</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-12 '>
                        <label className='form-label col-md-6  '>Tally Account Name</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>
                    

                    <div className=' col-md-12 '>
                        <label className='form-label col-md-6  '>Cash in Hand</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-12 '>
                        <label className='form-label col-md-6  '>Mail Id</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-12 '>
                        <label className='form-label col-md-6  '>Unit Initials</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                   

                   <div className=' d-flex col-md-12 mt-1'>
                   <label className="form-label col-md-3 ">Current</label>
                   <input className="form-check-input mt-2" type="checkbox" />
                   </div>
                </div>


            </div>
        </div >

    )
}
