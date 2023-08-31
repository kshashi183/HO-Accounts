import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
export default function ThreadErrorModal({threadModal, setThreadModal}) {
    const handleClose=()=>{
        setThreadModal(false);
    }

  return (
    <div>
      <Modal show={threadModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body> Threading Error: Column 'UnitName' is constrainedto be unique. 
            value 'UnitName' is already present.

         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" 
        >
           Ok
          </Button>
          {/* <Button variant="secondary" onClick={handleClose}>
            No
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
