import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TallyExportForm() {
  const navigate=useNavigate();
  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Head off Accounts Export</h4>
        </div>
      </div>
     
     <div className='row mb-3'>
                
  
    

 <div className="col-md-12 col-sm-12"  style={{marginLeft:'0px'}}  >
     <div className="ip-box  mt-2" >
       <div className='row' >


       <div className=" row col-md-6">
        
       <label className="form-label col-md-2" style={{whiteSpace:'nowrap'}}> Unit Name </label> 
       
            
             <div className='col-md-3'>
             <select className="ip-select">
                    <option value="option 1"> Jigani</option>
                    <option value="option 2">Name2</option>
                    <option value="option 3">Name3</option>
                 </select>
             </div>


             <label className="form-label col-md-3 " style={{whiteSpace:'nowrap'}}>  Report Date</label> 
     <input type='date' className='col-md-3 mb-3'/>
             </div>


<div className='row col-md-6 '>
         <button className="button-style  group-button col-md-3 " 
            >
            Load Data
         </button>

         <button className="button-style  group-button col-md-3" 
          // style={{ width: "150px" }}
           >
          Export To Tally
         </button>

         <button className="button-style  group-button col-md-3" 
          // style={{ width: "150px" }} 
          >
          Sync Report
         </button>
         <button className="button-style  group-button col-md-3" 
           style={{width:'80px'}} 
           onClick={e=>navigate("/home")}>
          Close
         </button>
         </div>

       </div>
   </div>
 </div>
</div>
<hr className="horizontal-line" />
    </div>
  );
}
