



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
import { baseURL } from "../../../../api/baseUrl";

// import { Axios } from "axios";



const initial = {
  UnitID: '', UnitName: '', Unit_Address: '', Place: '', PIN: '', Country: '', State: '', Unit_contactDetails: '',
  Unit_GSTNo: '', Tally_account_Name: '', Cash_in_Hand: '', Mail_Id: '', UnitIntial: '', Current: 0
}

const initial_state = { State: '' }
export default function UnitDetails() {




  const coolDownDuration = 6000; // 2 seconds (adjust as needed)
  const [lastToastTimestamp, setLastToastTimestamp] = useState(0)
  let test = 0;

  const [threadModal, setThreadModal] = useState(false);
  const [saveChangeModal, setSaveChangesModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [getUnit, setGetUnit] = useState([]);

  const navigate = useNavigate();

  //  const [postState, setPostState] = useState(initial_state);
  useEffect(() => {
    async function fetchData() {
      console.log("werg");
      await UnitGetDta();
    }
    fetchData()
    getStateList();



  }, []);


  const [stateList, setStateList] = useState([]);
  const getStateList = () => {
    axios.get(baseURL + '/unitlist/getStates').
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


  const insertData = (e, test) => {
    let t = 0;
    const now = Date.now();


    if (now - lastToastTimestamp >= coolDownDuration) {
      t++;
      setLastToastTimestamp(now);

    }



    axios.post(baseURL + '/unitlist/postUnitDetails', postData)
      .then((res) => {
        if (res.data.status === 'fail') {
          // setThreadModal(true);
          if (t > 0) {

            setThreadModal(true);
          }
        }
        else if (res.data.status === 'query') {
          console.log("22");

          toast.error("Data is not posted")
        }
        else if (res.data.status === 'success') {

          if (t > 0) {
            console.log("qwertyuio");
            toast.success(" Jigani Unit added Successfully")

          }


          setTimeout(() => {

            window.location.reload();

          }, 1000);
          //2000 milliseconds = 5 seconds

        }

      }).catch((err) => {

        console.log('eroor in fromntend', err);
      })
  }


  const handleSubmit = async (e) => {

    const now = Date.now();


    if (now - lastToastTimestamp >= coolDownDuration) {
      test++;
      setLastToastTimestamp(now);

    }
    try {
      if (postData.UnitID === '' || postData.Name === '') {
        if (test > 0) {
          toast.error('Please add UnitId and UnitName');
        }

      }
      else if (postData.UnitIntial.length > 3) {
        console.log(postData.UnitIntial.length, 'pos');

        if (test > 0) {
          toast.error('Unit_Intial Length must be less than 3');
        }
      }

      else if (postData.PIN === '' && postData.Unit_GSTNo === '' && postData.Mail_Id == '') {

        console.log("jjjjj");
        insertData(e, test);
      }


      else {

        let flag = 0;
        const unitdata = {};

        if (postData.PIN !== '') {

          unitdata.PIN = postData.PIN;
        }
        if (postData.Unit_GSTNo !== '') {
          unitdata.Unit_GSTNo = postData.Unit_GSTNo;
        }
        if (postData.Mail_Id !== '') {
          unitdata.Mail_Id = postData.Mail_Id;
        }
        console.log("unitdata", unitdata);

        for (const key in unitdata) {

          if (key == 'PIN') {

            if (!validatePIN(unitdata[key])) {
              flag++;
              if (test > 0) {
                toast.error("Invalid PIN")
              }
              break;
            }
          }

          if (key == 'Unit_GSTNo') {

            if (!validateGstNumber(unitdata[key])) {
              flag++;
              if (test > 0) {
                toast.error("Invalid GST")
              }
              break;
            }
          }

          if (key == 'Mail_Id') {

            if (!validateGmail(unitdata[key])) {
              flag++;
              if (test > 0) {
                toast.error('Invalid Gmail')
              }

              break;
            }
          }


        }

        if (flag == 0) {
          insertData();

        }


      }


    } catch (err) {
      console.error('Error in frontend', err);
    }
  };




  const saveChangeSubmit = () => {

    // console.log("save else", postData);
    const now = Date.now();


    if (now - lastToastTimestamp >= coolDownDuration) {
      test++;
      setLastToastTimestamp(now);

    }

    if (test > 0) {
      setSaveChangesModal(true);
    }
  }


  const deleteSubmit = () => {
    const now = Date.now();


    if (now - lastToastTimestamp >= coolDownDuration) {
      test++;
      setLastToastTimestamp(now);

    }
    if (!selectRow.UnitID) {
      if (test > 0) {
        toast.error('Select Unit for Deletion');
      }
    }
    else {
      if (selectRow.UnitID && test>0) {
        setDeleteModal(true);
      }
    }
  }

  const UnitGetDta = async () => {
    try {
      const response = await axios.get(baseURL + '/unitlist/getUnitData');
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







  const pincodehandleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!state) {
      setPostData({
        ...postData,
        PIN: value,
      });
    }

    else {
      setSelectRow({ ...selectRow, PIN: value })
    }
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




  const validateGmail = (Mail_Id) => {


    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Mail_Id)

  }

  // PIN number validation function

  const validatePIN = (PIN) => {

    return /^[1-9][0-9]{5}$/.test(PIN);
  };


  const validateGstNumber = (Unit_GSTNo) => {
    if (Unit_GSTNo.length === 15) {
      const firstTwo = Unit_GSTNo.substring(0, 2);


      if (!isNaN(firstTwo)) {
        const middlePart = Unit_GSTNo.substring(2, 14);

        return /^[A-Za-z0-9]+$/.test(middlePart);

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


      <div className="row col-md-12">



        <div className=" col-md-10 row" style={{}}>

          <div className="col-md-2 col-sm-12 ">
            <button

              style={{ width: "120px" }}
              className={'button-style  group-button '}

              onClick={addNewUnit}
            >
              Add Unit
            </button>
          </div>
          <div className="col-md-2  col-sm-12">
            <button
              type="submit"
              style={{ width: "120px" }}
              //onClick={handleSubmit}
              onClick={(e) => handleSubmit(e)}
              disabled={selectRow.UnitID !== ''}


              className={selectRow.UnitID !== '' ? 'disabled-button' : 'button-style  group-button'}
            >
              Save Unit
            </button>
          </div>


          <div className="col-md-2 col-sm-12">
            <button
              className="button-style  group-button"
              style={{ width: "120px" }} onClick={deleteSubmit}
            >
              Delete Unit
            </button>
          </div>
          <div className="col-md-2  col-sm-12">
            <button
              className={selectRow.UnitID === '' ? 'disabled-button' : 'button-style  group-button'}
              disabled={selectRow.UnitID === ''}
              onClick={saveChangeSubmit}
              style={{ width: '120px' }}
            >
              Update Unit
            </button>
          </div>



        </div>


        <div className="col-md-2 col-sm-12">
          <button
            className="button-style  group-button"
            onClick={e => navigate("/HOAccounts")}
            style={{ width: "120px" }}
          >
            Close
          </button>
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
                      // onChange={unitFormChange} 
                      onChange={pincodehandleChange}
                    />

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
                  <input class=" form-control " type="email" placeholder=" " name='Mail_Id'


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
                  <input className="mt-3 col-md-3 ms-4  custom-checkbox" type="checkbox" name='Current'
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

