import React, { useState } from "react";
import { Table } from "react-bootstrap";
import UnitDetailsForm from "./UnitDetailsForm";
import ThreadErrorModal from "./ThreadErrorModal";
import SaveChangesModal from "./SaveChangesModal";
import DeleteButtonModal from "./DeleteButtonModal";
import { useNavigate } from "react-router-dom";
// import UnitDetailsForm from "./UnitDetailsForm";
// import SharedLayout from "../../../../../Layout/SharedLayout";

export default function UnitDetails() {
  const[threadModal, setThreadModal]=useState(false);
  const[saveChangeModal, setSaveChangesModal]=useState(false);
  const[deleteModal, setDeleteModal]=useState(false);

  const navigate=useNavigate();
  const handleSubmit=()=>{
setThreadModal(true);
  }

  const saveChangeSubmit=()=>{
    setSaveChangesModal(true);
  }

  const deleteSubmit=()=>{
setDeleteModal(true);
  }
  return (
    <div>
      {
        <ThreadErrorModal  threadModal={threadModal} setThreadModal={setThreadModal}/>
      }
      {
        <SaveChangesModal 
        setSaveChangesModal={setSaveChangesModal} saveChangeModal={saveChangeModal}/>
      }
      {
        <DeleteButtonModal
        setDeleteModal={setDeleteModal} deleteModal={deleteModal}/>
      }
        <div className="col-md-12">
          <div className="row">
            <h4 className="title">Unit List</h4>
          </div>
        </div>

      <div className="row">
        {/* <div className="col-md-6 col-sm-12 ">
         
        </div> */}
        <div className="col-md-8 col-sm-12">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "120px" }} onClick={handleSubmit}
              >
                Add Unit
              </button>
            </div>
            <div className="col-md-3 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "120px" }} onClick={deleteSubmit}
              >
                Delete Unit
              </button>
            </div>
            <div className="col-md-3 col-sm-12">
              <button
                className="button-style  group-button"
               onClick={saveChangeSubmit}
              >
                Save Changes
              </button>
            </div>

            <div className="col-md-3 col-sm-12">
              <button
                className="button-style  group-button"
              onClick={e=>navigate("/home")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <hr  style={{
                 backgroundColor: 'black',
                             height:'3px'}}/> */}

      <div className="row">
        <div className="col-md-4 mt-4  col-sm-12">
          <div
            style={{
             
              height: "400px",
              overflowX: "scroll",
              overflowY: "scroll",
              
            }}
          >
            <Table
              striped
              className="table-data border"
              style={{ marginLeft: "5px", border: "1px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th style={{whiteSpace:"nowrap"}}>Unit Id</th>
                  <th style={{whiteSpace:"nowrap"}}>Unit Name</th>
                 
                </tr>
              </thead>
              <tbody className="tablebody"></tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <UnitDetailsForm/>
        </div>
      </div>
    </div>
  );
}
