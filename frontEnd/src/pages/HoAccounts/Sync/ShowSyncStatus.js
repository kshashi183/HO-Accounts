import React, { useRef, useState } from "react";
import ThreeTabs from "./ThreeTabs";
import { useNavigate } from "react-router-dom";

export default function ShowSyncStatus() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [getVersion, setGetVersion] = useState('');

  const handleButtonClick = (e) => {
    fileInputRef.current.click();
    console.log("Xml File", fileInputRef);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    alert(file);
    console.log('file:',file);
    if(file.name.charAt(0).toUpperCase() === 'H'){
      setGetVersion('HO');
    }else{
      setGetVersion('Unit');
    }
    const reader = new FileReader();
  };

  console.log('the version:',getVersion);

  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">HO Unit Sync Review</h4>
        </div>
      </div>
      <div className="col-md-12">
        <label className="form-label">Magod Laser Machining Pvt Ltd</label>
      </div>
      <div className="row mb-3">
        <div className="col-md-12 col-sm-12" style={{ marginLeft: "0px" }}>
          <div className="ip-box  mt-2">
            <div className="row">
              <div className=" row col-md-12">
                <label
                  className="form-label col-md-3"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Syncronise Account Details{" "}
                </label>

                <div className="col-md-2">
                  <select className="ip-select">
                    <option value="option 1"> Jigani</option>
                    <option value="option 2">Name2</option>
                    <option value="option 3">Name3</option>
                  </select>
                </div>

                <button
                  className="button-style  group-button  "
                  style={{ width: "120px" }}
                  onClick={handleButtonClick}
                >
                  Load Data
                </button>
                <input
                  type="file"
                  accept=".xml"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />

                <button
                  className="button-style  group-button "
                  style={{ width: "150px" }}
                >
                  Export Report
                </button>

                <button
                  className="button-style  group-button "
                  style={{ width: "150px" }}
                >
                  Reset Invoice
                </button>

                <button
                  className="button-style  group-button "
                  style={{ width: "80px" }}
                  onClick={(e) => navigate("/home")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="horizontal-line" />
      <ThreeTabs />
    </div>
  );
}
