import React from 'react';
import TaxMaster from './TaxMaster';
import TaxMasterTable from './TaxMasterTable';
import TaxMasterForm from './TaxMasterForm';

export default function TaxMasterCall() {
  return (
    <div>
       <div>
     <TaxMaster/>
      
    

     <div className='row'>
      
       <div className='col-md-8 col-sm-12'>
       <TaxMasterTable/>
       </div>

    <div className="col-md-4 col-sm-12">
    <TaxMasterForm/>
        
    </div>
  </div>
    </div>
    </div>
  );
}
