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


          toast.success(" Jigani Unit added Successfully")

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
          toast.success('Jigani Unit added Successfully');
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



      else if (postData.PIN === '' && postData.Unit_GSTNo !== '') {
        if (validateGstNumber(postData.Unit_GSTNo)) {
          insertData();
        }
        else {
          toast.warn('Invalid GST No');
        }
      }

      else if (postData.Unit_GSTNo === '' && postData.PIN !== '') {
        if (validatePIN(postData.PIN)) {
          insertData();
        }
        else {
          toast.warn('Invalid PIN');
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

  const UnitGetDta = async () => {
    try {
      const response = await axios.get('http://localhost:3001/unitlist/getUnitData');
      if (response.data.Status === 'Success') {
       // console.log("dataaaa", response.data.Result);
        setGetUnit(response.data.Result);
      }
    } catch (err) {
      console.error(err);
    }
  };




  // useEffect(() => {
  //   UnitGetDta();
  //   getStateList();

  // }, [])
  useEffect(() => {
    async function fetchData() {
     
      await UnitGetDta();
    }
    fetchData()
    getStateList();
  }, []);


  const formRef = useRef(null);

  useEffect(() => {
    if (getUnit.length > 0) {
      setSelectRow(getUnit[0]);
    } else {
      setSelectRow(initial);
    }
  }, [getUnit]);


  const [selectRow, setSelectRow] = useState(initial);



  const [state, setState] = useState(true);
  const selectedRowFun = (item, index) => {

    let list = { ...item, index: index }

    // setSelectRow(initial)
    setSelectRow(list);
    // setSelectRow({ ...initial, ...list, State: postState.State });    //setPostData(initial)
    setState(true);

  }



 

  const unitFormChange = (e) => {

    const { name, value, type, checked } = e.target;
    if (!state) {
      if (type === 'checkbox') {


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






  // PIN number validation function
  const validatePIN = (PIN) => {

    return /^[1-9][0-9]{5}$/.test(PIN);
  };

  //GST number validation function
  // const validateGstNumber = (Unit_GSTNo) => {

   
  //  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(Unit_GSTNo)
   
  // };
  const validateGstNumber = (Unit_GSTNo) => {
    if (Unit_GSTNo.length === 15) {
      const firstTwo = Unit_GSTNo.substring(0, 2);
     

      if (!isNaN(firstTwo) ) {
        const middlePart = Unit_GSTNo.substring(2, 14);
       
        return  /^[A-Za-z0-9]+$/.test(middlePart);
          
      }
    }
    // else{
    //   toast.warn("Invalid GST NO")
    // }
    
  };


  const addNewUnit = () => {
    setSelectRow(initial);
    setPostData(initial)
    setState(false);
  }

  console.log("posttt", postData);
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
          <h4 className="title">Unit Details</h4>
        </div>
      </div>


      <div className="row">

        <div className="col-md-11 col-sm-12">
          <div className="row" style={{ gap: '50px' }}>

            <div className="col-md-1 col-sm-12 ">
              <button
                // className="button-style  group-button"
                style={{ width: "120px" }}
                className={'button-style  group-button '}
                // disabled={selectRow.UnitID === ''}
                onClick={addNewUnit}
              >
                Add Unit
              </button>
            </div>
            <div className="col-md-1 col-sm-12">
              <button
                // className="button-style  group-button"
                style={{ width: "120px" }} onClick={handleSubmit}
                disabled={selectRow.UnitID !== ''}


                className={selectRow.UnitID !== '' ? 'disabled-button' : 'button-style  group-button'}
              >
                Save Unit
              </button>
            </div>


            <div className="col-md-1 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "120px" }} onClick={deleteSubmit}
              >
                Delete Unit
              </button>
            </div>
            <div className="col-md-1 col-sm-12">
              <button
                className={selectRow.UnitID === '' ? 'disabled-button' : 'button-style  group-button'}
                disabled={selectRow.UnitID === ''}
                onClick={saveChangeSubmit}
                style={{ width: '120px' }}
              >
                Update Unit
              </button>
            </div>


            <div className="col-md-2 col-sm-12">
              <button
                className="button-style  group-button"
                onClick={e => navigate("/UnitAccounts")}
                style={{ width: "120px", marginLeft: '405px' }}
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
                <tr style={{ whiteSpace: "nowrap" }}>
                  <th >Unit Id</th>
                  <th >Unit Name</th>
                  <th>Unit_Address</th>
                  <th>Place</th>
                  <th>State</th>
                  <th>Country</th>


                </tr>
              </thead>
              <tbody className="tablebody">

                {
                  getUnit.map((item, key) => {
                    return (
                      <>
                        <tr onClick={() => selectedRowFun(item, key)}
                          style={{ whiteSpace: "nowrap" }}
                          className={key === selectRow?.index ? 'selcted-row-clr' : ''}
                        >

                          <td>{item.UnitID} </td>
                          <td>{item.UnitName} </td>
                          <td>{item.Unit_Address}</td>
                          <td>{item.Place}</td>
                          <td>{item.State}</td>
                          <td>{item.Country}</td>
                        </tr>

                      </>
                    )
                  })
                }
                
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">




          <form ref={formRef}>

            <div className='row col-md-12 ip-box form-bg mt-2' style={{ overflowY: 'scroll', height: '400px' }}>
              <div className='col-md-6' >
                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>Unit Id<span style={{ color: 'red' }}>*</span></label>
                  <input class="form-control " type="text" name='UnitID' id='UnitID' required


                    value={selectRow?.UnitID || postData.UnitID}
                    disabled={selectRow.UnitID !== ''}
                    onChange={unitFormChange} />
                </div>

                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Unit Name<span style={{ color: 'red' }}>*</span></label>
                  <input class="form-control  " type="text" placeholder=" " name='UnitName' id='UnitName'
                    onChange={unitFormChange}


                    value={selectRow?.UnitName || postData.UnitName}
                  />
                </div>

                <div className=" col-md-12">

                  <label className="form-label ms-3">Unit Address</label>

                  <textarea className="form-control sticky-top" rows='2' id="" name='Unit_Address'
                    style={{ height: '143px', resize: 'none' }}

                    onChange={unitFormChange}

                    value={selectRow.Unit_Address || postData.Unit_Address}

                  >

                  </textarea>

                </div>



                <div className=' d-flex col-md-12 ' style={{ gap: '30px' }}>
                  <div className='col-md-6'>
                    <label className='form-label'>Place</label>
                    <input class="form-control" type="text" placeholder=" " name='Place'


                      value={selectRow.Place || postData.Place}
                      onChange={unitFormChange} />
                  </div>
                  <div className='col-md-5'>
                    <label className='form-label'>PIN</label>
                    <input class=" form-control " type="text" placeholder=" " name='PIN'

                      maxLength={6}
                      value={selectRow.PIN || postData.PIN}
                      onChange={unitFormChange} />

                  </div>

                </div>


                <div className="col-md-12">
                  <label className="form-label ms-3"> State</label>
                  <select style={{ height: '38px', borderRadius: '5px' }}
                    className="ip-select mt-1"
                    value={state ? selectRow.State : postData.State}
                    onChange={unitFormChange}
                    name="State"
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


                    value={selectRow.Country || postData.Country}
                    onChange={unitFormChange} />
                </div>

                <div className=" col-md-12">

                  <label className="form-label ms-3">Contact details</label>

                  <textarea className="form-control sticky-top" rows='2' id="" name='Unit_contactDetails'

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
                    maxLength={15}

                    value={selectRow.Unit_GSTNo || postData.Unit_GSTNo}

                    onChange={unitFormChange} />

                </div>

                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>Tally Account Name</label>
                  <input class=" form-control " type="text" placeholder=" " name='Tally_account_Name'


                    value={selectRow.Tally_account_Name || postData.Tally_account_Name}
                    onChange={unitFormChange} />
                </div>



                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Mail Id</label>
                  <input class=" form-control " type="text" placeholder=" " name='Mail_Id'


                    value={selectRow.Mail_Id || postData.Mail_Id}
                    onChange={unitFormChange} />
                </div>
                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Unit Initials</label>
                  <input class="form-control  " type="text" placeholder=" " name='UnitIntial'


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

