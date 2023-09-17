import React from "react";
import Export from "./export/Export";
import Import from "./import/Import";
import { useNavigate } from "react-router-dom";

export default function Sync() {
  const navigate=useNavigate()
  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Sync Accounts</h4>
        </div>
      </div>
      <div className="col-md-12">
        <div className="row col-md-12">
          <div  className=" row col-md-8 mt-1" >
        
            <label className="form-label col-md-4 mt-2" style={{whiteSpace:'nowrap'}}>Syncronise Account Details</label>
            <select className="ip-select col-md-2 mb-2" style={{}}>
                    <option value="option 1"> Jigani</option>
                    <option value="option 2">Name2</option>
                    <option value="option 3">Name3</option>
                 </select>

                 
          </div>

         
          <div className='col-md-3'>
                    <button className="button-style mt-2 group-button" type='button'
                        
                        onClick={e=>navigate("/home")}
                    >
                        Close
                    </button>

                </div>
        </div>
      </div>
      <hr
        style={{
          backgroundColor: "black",
          height: "3px",
        }}
      />
      <div className="row">
        <div className="col-md-5 col-sm-12" >
          <Export />
        </div>
        <div className="col-md-7 col-sm-12" >
          <Import />
        </div>
      </div>
    </div>
  );
}
