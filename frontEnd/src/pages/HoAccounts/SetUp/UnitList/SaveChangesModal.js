import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../../../../api/baseUrl';


export default function SaveChangesModal(
  { setSaveChangesModal, saveChangeModal, selectRow, setSelectRow }) {

  const nav = useNavigate();
  const handleClose = () => {
    setSaveChangesModal(false);
  }


  const insertData = () => {
    Axios.put(baseURL+'/unitlist/updateData/' + selectRow.UnitID, selectRow)
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
          toast.success(" Jigani Unit Updated Successfully");

          setTimeout(() => {

            window.location.reload();

          }, 1000);

          setSaveChangesModal(false);

        }

      }).catch((err) => {
        console.log('eroor in frontend', err);
      })
  }

  const unitlistSubmit = () => {
    if (selectRow.UnitName === '') {
      toast.warn("Add UnitName")
    }
    else if (selectRow.UnitIntial.length > 3) {
      console.log(selectRow.UnitIntial.length, 'pos');
      toast.warn('Unit_Intial Length must be less than 3');
    }

    else if (selectRow.PIN === '' && selectRow.Unit_GSTNo === '') {

      insertData();
    }

    else if (selectRow.PIN !== '' && selectRow.Unit_GSTNo !== '') {
      if (validateGstNumber(selectRow.Unit_GSTNo) && validatePIN(selectRow.PIN)) {

        insertData();
      } else {
        if (!validatePIN(selectRow.PIN)) {
          toast.warn('Invalid PIN');
        } else if (!validateGstNumber(selectRow.Unit_GSTNo)) {
          toast.warn('Invalid GST No');
        }
      }
    }


    else if (selectRow.PIN === '' && selectRow.Unit_GSTNo !== '') {
      if (validateGstNumber(selectRow.Unit_GSTNo)) {
        insertData();
      }
      else {
        toast.warn('Invalid GST No');
      }
    }

    else if (selectRow.Unit_GSTNo === '' && selectRow.PIN !== '') {
      if (validatePIN(selectRow.PIN)) {
        insertData();
      }
      else {
        toast.warn('Invalid PIN');
      }
    }
    else {
      // Validation for PIN and GST number
      if (selectRow.PIN !== '' && !validatePIN(selectRow.PIN)) {
        toast.warn('Invalid PIN code');
      }
      if (selectRow.Unit_GSTNo !== '' && !validateGstNumber(selectRow.Unit_GSTNo)) {
        toast.warn('Invalid GST NO');
      }

    }
  }

  const [errors, setErrors] = useState({});

  const validatePIN = (PIN) => {

    return /^[1-9][0-9]{5}$/.test(PIN);
  };

  //GST number validation function
  // const validateGstNumber = (Unit_GSTNo) => {


  //   return /^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1})$/.test(Unit_GSTNo);

  // };

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
