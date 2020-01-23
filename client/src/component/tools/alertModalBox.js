import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {Link} from 'react-router-dom';


function AlertModalBox(props) {



    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered        
      >        
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>Alert</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{textAlign:'center',padding:10}}>You must be signed in to use the Set It and Leave It tool.</h5>
          <div style={{paddingTop:20,textAlign:'center'}}>
            <Link className='btn btn-primary' style={{backgroundColor:'#7030a0',fontWeight:700}} to={'/front/register'}>SIGN IN</Link><br/>
            <br/><p>No thanks. <Link>Go back</Link></p>
          </div>          
        </Modal.Body>
   
      </Modal>
    );
  }

  export default AlertModalBox;