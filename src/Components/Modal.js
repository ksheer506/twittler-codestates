import React from 'react';
import './Modal.css';

const Modal = ({ children }) => {

  return (
    <div className='modal_set'>
      <div className='modal_background' />
      <div className='modal'>
        {children}
      </div>
    </div>

  )
}


export default Modal;