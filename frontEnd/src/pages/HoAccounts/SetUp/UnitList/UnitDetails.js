import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
// import UnitDetailsForm from "./UnitDetailsForm";
import { useNavigate } from 'react-router-dom';
import ThreadErrorModal from "./ThreadErrorModal";
import SaveChangesModal from "./SaveChangesModal";
import DeleteButtonModal from "./DeleteButtonModal";
import axios from "axios";
import { toast } from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

// import { Axios } from "axios";



const initial = {
  UnitID: '', UnitName: '', Unit_Address: '', Place: '', PIN: '', Country: '', State: '', Unit_contactDetails: '',
  Unit_GSTNo: '', Tally_account_Name: '', Cash_in_Hand: '', Mail_Id: '', UnitIntial: '', Current: 0
}

const initial_state = { State: '' }
export default function UnitDetails() {


  const [threadModal, setThreadModal] = useState(false);
  const [saveChangeModal, setSaveChangesModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [getUnit, setGetUnit] = useState([]);

  const navigate = useNavigate();

  //  const [postState, setPostState] = useState(initial_state);



  const [stateList, setStateList] = useState([]);
  const getStateList = () => {
    axios.get('http://localhost:3001/unitlist/getStates').
      then((res) => {
        // console.log(res.data.Result);
        setStateList(res.data.Result)
      })
  }

  // const [postData, setPostData]=useState({
  //   UnitID: '', UnitName: '', Unit_Address: '', Place: '', PIN: '', State: '', Country: '', Unit_contactDetails: '',
  //     Unit_GSTNo: '', Tally_account_Name: '', Cash_in_Hand: '', Mail_Id: '', UnitIntial: ''
  // })
  const [postData, setPostData] = useState(initial)

  const insertData = () => {
    axios.post('http://localhost:3001/unitlist/postUnitDetails', postData)
      .then((res) => {
        if (res.data.status === 'fail') {
          setThreadModal(true);

        }
        else if (res.data.status === 'query') {
          console.log("22");

          toast.warn("Data is not posted")
        }
        else if (res.data.status === 'success') {


          toast.success(" Posted Successfully")

          setTimeout(() => {

            window.location.reload();

          }, 1000); // 2000 milliseconds = 5 seconds

        }

      }).catch((err) => {

        console.log('eroor in fromntend', err);
      })
  }


  

const handleSubmit = async () => {
  try {
    if (postData.UnitID === '' || postData.Name === '') {
      toast.warn('Please add UnitId and UnitName');
    } 
    else if (postData.UnitIntial.length > 3) {
      console.log(postData.UnitIntial.length, 'pos');
      toast.warn('Unit_Intial Length must be less than 3');
    }
    else if (postData.PIN === '' && postData.Unit_GSTNo === '') {
      // Either PIN or GSTNo is empty, so insert data successfully
      const response = await axios.post('http://localhost:3001/unitlist/postUnitDetails', postData);
      if (response.data.status === 'success') {
        toast.success('Posted Successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (response.data.status === 'fail') {
        setThreadModal(true);
      } else {
       
        toast.warn('Data is not posted');
      }
    } 

    
    else if (postData.PIN !== '' && postData.Unit_GSTNo !== '') {
      if (validateGstNumber(postData.Unit_GSTNo) && validatePIN(postData.PIN)) {
        // Both PIN and GSTNo have data and pass validation
        insertData(); // You should implement this function to insert the data
      } else {
        if (!validatePIN(postData.PIN)) {
          toast.warn('Invalid PIN');
        } else if (!validateGstNumber(postData.Unit_GSTNo)) {
          toast.warn('Invalid GST No');
        }
      }
    } 




    


    else {
      // Validation for PIN and GST number
      if (postData.PIN !== '' && !validatePIN(postData.PIN)) {
        toast.warn('Invalid PIN code');
      }
      if (postData.Unit_GSTNo !== '' && !validateGstNumber(postData.Unit_GSTNo)) {
        toast.warn('Invalid GST number');
      }
      
    }
  } catch (err) {
    console.error('Error in frontend', err);
  }
};


  



  const saveChangeSubmit = () => {


    // console.log("save else", postData);
    setSaveChangesModal(true);

  }


  const deleteSubmit = () => {
    if (!selectRow.UnitID) {
      toast('Empty data canot be Deleted');

    }
    else {
      setDeleteModal(true);
    }
  }

  const UnitGetDta = () => {
    axios.get('http://localhost:3001/unitlist/getUnitData')
      .then((res) => {
        // console.log("unitdata",res.data);
        if (res.data.Status === 'Success') {
          //   console.log("dataaaa", res.data.Result);
          setGetUnit(res.data.Result)
        }
      })
      .catch(err => console.log(err))
  }
  //GET DATA
  useEffect(() => {
    UnitGetDta();
    getStateList();

  }, [])


  const formRef = useRef(null);
  const [selectRow, setSelectRow] = useState(initial);



  const [state, setState] = useState(false);
  const selectedRowFun = (item, index) => {

    let list = { ...item, index: index }

    setSelectRow(initial)
    setSelectRow(list);
    // setSelectRow({ ...initial, ...list, State: postState.State });
    setPostData(initial)
    setState(true);

  }

  console.log("selectrow", selectRow);



  const unitFormChange = (e) => {

    const { name, value, type, checked } = e.target;
    if (!state) {
      if (type === 'checkbox') {
        console.log("111");

        setPostData({ ...postData, [name]: checked ? 1 : 0 })

      }

      else {

        setPostData({ ...postData, [name]: value })

      }
      if (name === 'State') {

        setPostData({ ...postData, State: value });
      }
    }



    else {

      if (type === 'checkbox') {

        setSelectRow({ ...selectRow, [name]: checked ? 1 : 0 })
      }

      else {
        setSelectRow({ ...selectRow, [name]: value })
      }

    }
    // if (name === 'State') {
    //   setSelectRow({ ...selectRow, State: value });
    // }

  }


  const [errors, setErrors] = useState({});



  // PIN number validation function
  const validatePIN = (PIN) => {

    return /^[1-9][0-9]{5}$/.test(PIN);
  };

  //GST number validation function
  const validateGstNumber = (Unit_GSTNo) => {

    return /^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1})$/.test(Unit_GSTNo);
  };


  return (
    <div>
      {
        <ThreadErrorModal threadModal={threadModal} setThreadModal={setThreadModal}
        />
      }
      {

        <SaveChangesModal
          setSaveChangesModal={setSaveChangesModal} saveChangeModal={saveChangeModal}
          selectRow={selectRow} setSelectRow={setSelectRow}
        />
      }
      {
        <DeleteButtonModal
          setDeleteModal={setDeleteModal} deleteModal={deleteModal} selectRow={selectRow} />
      }


      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Unit List</h4>
        </div>
      </div>


      <div className="row">

        <div className="col-md-8 col-sm-12">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <button
                // className="button-style  group-button"
                style={{ width: "100px" }} onClick={handleSubmit}
                disabled={selectRow.UnitID !== ''}
                className={selectRow.UnitID !== '' ? 'disabled-button' : 'button-style  group-button'}
              >
                Save Unit
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
                className={selectRow.UnitID === '' ? 'disabled-button' : 'button-style  group-button'}
                disabled={selectRow.UnitID === ''}
                onClick={saveChangeSubmit}
              >
                Update Unit
              </button>
            </div>

            <div className="col-md-3 col-sm-12">
              <button
                className="button-style  group-button"
                onClick={e => navigate("/HOAccounts")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>



      <hr style={{ backgroundColor: "black", height: "3px", }}
      />

      <div className="row">
        <div className="col-md-4 mt-2 col-sm-12">
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
                  <th style={{ whiteSpace: "nowrap" }}>Unit Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Name</th>


                </tr>
              </thead>
              <tbody className="tablebody">

                {
                  getUnit.map((item, key) => {
                    return (
                      <>
                        <tr onClick={() => selectedRowFun(item, key)}

                          className={key === selectRow?.index ? 'selcted-row-clr' : ''}
                        >

                          <td>{item.UnitID} </td>
                          <td>{item.UnitName} </td>
                        </tr>

                      </>
                    )
                  })
                }
                {/* {

                  // showUnitId &&
                  <tr onClick={unitSubmit}>
                    <td>UnitID</td>
                    <td>UnitName</td></tr>

                } */}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">




          <form ref={formRef}>

            <div className='row col-md-12 ip-box form-bg mt-2' style={{ overflowY: 'scroll', height: '400px' }}>
              <div className='col-md-6' >
                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>Unit Id</label>
                  <input class="form-control " type="text" name='UnitID' id='UnitID' required

                    // defaultValue={selectRow?.UnitID}
                    value={selectRow?.UnitID || postData.UnitID}
                    disabled={selectRow.UnitID !== ''}
                    onChange={unitFormChange} />
                </div>

                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Unit Name</label>
                  <input class="form-control  " type="text" placeholder=" " name='UnitName' id='UnitName'
                    onChange={unitFormChange}

                    // defaultValue={selectRow?.UnitName}
                    value={selectRow?.UnitName || postData.UnitName}
                  />
                </div>

                <div className=" col-md-12">

                  <label className="form-label">Unit Address</label>

                  <textarea className="form-control sticky-top" rows='2' id="" name='Unit_Address'
                    style={{ height: '143px', resize: 'none' }}

                    onChange={unitFormChange}
                    // defaultValue={selectRow.Unit_Address }
                    value={selectRow.Unit_Address || postData.Unit_Address}

                  >

                  </textarea>

                </div>



                <div className=' d-flex col-md-12 ' style={{ gap: '30px' }}>
                  <div className='col-md-6'>
                    <label className='form-label'>Place</label>
                    <input class="form-control" type="text" placeholder=" " name='Place'

                      //  defaultValue={selectRow.Place}
                      value={selectRow.Place || postData.Place}
                      onChange={unitFormChange} />
                  </div>
                  <div className='col-md-5'>
                    <label className='form-label'>PIN</label>
                    <input class=" form-control " type="text" placeholder=" " name='PIN'

                      // defaultValue={selectRow.PIN}
                      value={selectRow.PIN || postData.PIN}
                      onChange={unitFormChange} />
                    {/* {errors.PIN && <span style={{ color: 'red' }}>{errors.PIN}</span>} */}
                  </div>

                </div>


                <div className="col-md-12">
                  <label className="form-label"> State</label>
                  <select style={{ height: '38px', borderRadius: '5px' }}
                    className="ip-select mt-1"
                    value={state ? selectRow.State : postData.State} // Set the selected value based on state or selectRow
                    onChange={unitFormChange} // Use your existing change handler
                    name="State" // Make sure the name matches the field in postData and selectRow
                  >
                    {stateList.map((i) => (
                      <option key={i.State} value={i.State}   >
                        {i.State}
                      </option>
                    ))}
                  </select>
                </div>




                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Country</label>
                  <input class="form-control  " type="text" placeholder=" " name='Country'

                    // defaultValue={selectRow.Country}
                    value={selectRow.Country || postData.Country}
                    onChange={unitFormChange} />
                </div>

                <div className=" col-md-12">

                  <label className="form-label">Contact details</label>

                  <textarea className="form-control sticky-top" rows='2' id="" name='Unit_contactDetails'
                    // defaultValue={selectRow.Unit_contactDetails}
                    value={selectRow.Unit_contactDetails || postData.Unit_contactDetails}
                    onChange={unitFormChange}
                    style={{ height: '143px', resize: 'none' }}

                  ></textarea>

                </div>
              </div>



              <div className='col-md-6'>
                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>GST No</label>
                  <input class="form-control " type="text" placeholder=" " name='Unit_GSTNo'

                    // defaultValue={selectRow.Unit_GSTNo}
                    value={selectRow.Unit_GSTNo || postData.Unit_GSTNo}

                    onChange={unitFormChange} />
                  {/* {errors.gstNumber && <span style={{ color: 'red' }}>{errors.gstNumber}</span>} */}
                </div>

                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>Tally Account Name</label>
                  <input class=" form-control " type="text" placeholder=" " name='Tally_account_Name'

                    // defaultValue={selectRow.Tally_account_Name}
                    value={selectRow.Tally_account_Name || postData.Tally_account_Name}
                    onChange={unitFormChange} />
                </div>


                {/* <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Cash in Hand</label>
                  <input class=" form-control " type="text" placeholder=" " name='Cash_in_Hand'

                 
                    value={selectRow.Cash_in_Hand || postData.Cash_in_Hand}
                    onChange={unitFormChange} />
                </div> */}
                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Mail Id</label>
                  <input class=" form-control " type="text" placeholder=" " name='Mail_Id'

                    // defaultValue={selectRow.Mail_Id}
                    value={selectRow.Mail_Id || postData.Mail_Id}
                    onChange={unitFormChange} />
                </div>
                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Unit Initials</label>
                  <input class="form-control  " type="text" placeholder=" " name='UnitIntial'

                    // defaultValue={selectRow.UnitIntial}
                    value={selectRow.UnitIntial || postData.UnitIntial}
                    onChange={unitFormChange} />
                </div>



                <div className=' row col-md-12 mt-1'>
                  <label className="form-label col-md-2">Current</label>
                  <input className="mt-3 col-md-3  custom-checkbox" type="checkbox" name='Current'
                    onChange={unitFormChange} id="flexCheckDefault"
                    checked={selectRow.Current === 1 ? true : false || postData.Current === 1 ? true : false}

                  />
                </div>
              </div>


            </div>


          </form>
        </div>
      </div>
    </div>
  );
}

