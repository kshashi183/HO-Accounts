import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

export default function SaveChangesModal({setSaveChangesModal,saveChangeModal}) {

    const handleClose=()=>{
        setSaveChangesModal(false);
    }
  return (
    <div>
      <Modal show={saveChangeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body> Do you wish to save the setting ?
           
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
