import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TallyExportTabs from './TallyExportTabs';
import { useGlobalContext } from '../../Context/Context';

export default function TallyExportForm() {
  const [selectedDate, setSelectedDate] = useState('2018-01-02');
  //const {setTallyDate}=useGlobalContext();
  const [flag, setFlag] = useState(false)
  const [exportTally, setExportTally] = useState(false);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
    // setTallyDate(e.target.value);
  }

  useEffect(() => {

  }, [])
  
  const onLoadDataClick = () => {
    setFlag(true);
  }

  const tallyExportSubmit = () => {
    setExportTally(true);
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Head off Accounts Export</h4>
        </div>
      </div>

      <div className='row mb-3'>




        <div className="col-md-12 "   >
          <div className="ip-box  mt-2" >
            <div className='row' >


              <div className=" row col-md-6">

                <label className="form-label col-md-2" style={{ whiteSpace: 'nowrap' }}> Unit Name </label>


                <div className='col-md-3 mt-2 ms-3' >
                  <select className="ip-select">
                    <option value="option 1"> Jigani</option>
                    <option value="option 2">Name2</option>
                    <option value="option 3">Name3</option>
                  </select>
                </div>


                <label className="form-label col-md-3 " style={{ whiteSpace: 'nowrap' }}>  Report Date</label>
                <input type='date' className='col-md-3 mb-3' value={selectedDate} onChange={handleChange} />


               
              </div>

              <button className="button-style  group-button col-md-2 "
                  onClick={onLoadDataClick} style={{ width: "140px" }} >
                  Load Data
                </button>

                <button className="button-style  group-button col-md-2"
                  style={{ width: "140px" }}
                  onClick={tallyExportSubmit}
                >
                  Export To Tally
                </button>
                <button className="button-style  group-button col-md-2"
                  style={{ width: '130px' }}
                  onClick={e => navigate("/HOAccounts")}>
                  Close
                </button>

              

            </div>
          </div>
        </div>
      </div>
      <hr className="horizontal-line" />
      <TallyExportTabs selectedDate={selectedDate} flag={flag} setFlag={setFlag} 
      exportTally={exportTally} setExportTally={setExportTally}/>
    </div>
  );
}
