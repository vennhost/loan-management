import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import Loan from './LoanForm';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('body')
 
function CreateLoan(){
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }
 
    return (
      <div>
        <button onClick={openModal}>Create Loan</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Loan Application</h2>
          <button onClick={closeModal}>close</button>
          <div>Complete the Form</div>
          <Loan />
        </Modal>
      </div>
    );
}

export default CreateLoan;