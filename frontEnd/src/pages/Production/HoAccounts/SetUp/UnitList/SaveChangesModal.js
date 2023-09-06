import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';


export default function SaveChangesModal(
  { setSaveChangesModal, saveChangeModal, selectRow, setSelectRow }) {

  const nav = useNavigate();
  const handleClose = () => {
    setSaveChangesModal(false);
  }

  const unitlistSubmit = (e) => {

    console.log("u", selectRow);
    if(selectRow.UnitIntial.length>3){
     
      toast.warn("Unit_Intial Length must be less than 3 Chracters")
    }

    else if (!validatePIN(selectRow.PIN)) {
      
      toast.warn("Invalid PIN code")
      // console.log("err in PIN", validatePIN(selectRow.PIN));
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   PIN: 'Invalid PIN code',
      // }));
    }

    else if (!validateGstNumber(selectRow.Unit_GSTNo)) {
      
      toast.warn("Invalid GST number")
      // console.log("err in gst no", validateGstNumber(selectRow.Unit_GSTNo));
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   gstNumber: 'Invalid GST number',
      // }));
    }

else{
    Axios.put('http://localhost:3001/unitlist/updateData/' + selectRow.UnitID, selectRow)
      .then((res) => {
        if (res.data.status === 'fail') {
          alert('Unit_Name must be Unique');

        }
        else if (res.data.status === 'query') {
          alert('data does not exist');
        }
        else if (res.data.status === 'success') {
          console.log('res in frontend', res.data);
          // alert("data updated")
          toast.success(" Updated Successfully");
          // 3000 milliseconds = 3 seconds
          setTimeout(() => {

            window.location.reload();
      
          }, 1000); 
          // 2000 milliseconds = 5 seconds
         // window.location.reload();
          setSaveChangesModal(false);

        }

      }).catch((err) => {
        console.log('eroor in fromntend', err);
      })

    }

  }

  const [errors, setErrors] = useState({});

  const validatePIN = (PIN) => {

    return /^[1-9][0-9]{5}$/.test(PIN);
  };

  //GST number validation function
  const validateGstNumber = (Unit_GSTNo) => {

    return /^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1})$/.test(Unit_GSTNo);
  };

  return (
    <div>

      <Modal show={saveChangeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Do you wish to save the setting ?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={unitlistSubmit}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
