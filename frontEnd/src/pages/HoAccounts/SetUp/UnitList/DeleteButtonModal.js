import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../../../../api/baseUrl';

export default function DeleteButtonModal({ setDeleteModal, deleteModal, selectRow }) {
  // console.log("deklt", selectRow);
  const handleClose = () => {
    setDeleteModal(false);
  }

  const [deleteUnit, setDeleteUnit] = useState('');
 // console.log("sel del", selectRow);
  const deleteUnitData = (UnitID) => {
    console.log(UnitID,"uuuuuuu");
    axios.delete(baseURL+'/unitlist/deleteUnit/' + UnitID)
      .then((res) => {
        console.log(res);
        if (res.data.Status === 'Success') {
          setDeleteModal(false);
        //  alert("deleted successful")
          toast.warn("Unit Deleted Successfully");
          setTimeout(() => {

            window.location.reload();
      
          }, 1000);
         // window.location.reload();
        } else {
          alert("error");
        }

      })
      .catch(err => (console.log("select unit")));

  }

  return (
    <div>
      <Modal show={deleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body> Do you wish to delete {selectRow.UnitName} ?

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={e => deleteUnitData(selectRow.UnitID)}
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
