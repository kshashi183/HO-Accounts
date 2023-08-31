import React from 'react';
import CreateNewForm from './CreateNewForm';
import FormAndTable from './FormAndTable';

export default function CreateNewCallFile() {
  return (
    <div>

<div className='col-md-12'>
    <div className='row'>
        <h4 className='title'>Head Office Payment Receipt Register </h4>
    </div>
</div>

<div>
    
    <label className="form-label">Create New Payment Receipt</label>
    <div className='form horizantal-line'></div>
</div>
      <div className='row '>
        <div className='col-md-6'>
            <CreateNewForm/>
        </div>

        <div className='col-md-6'>
            <FormAndTable/>
        </div>
      </div>
    </div>
  );
}
