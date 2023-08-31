import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

export default function DeleteButtonModal({setDeleteModal, deleteModal}) {
    const handleClose=()=>{
setDeleteModal(false);
    }
  return (
    <div>
      <Modal show={deleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body> Do you wish to delete unitname ?
           
         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" 
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
