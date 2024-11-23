import React, { useRef } from 'react'
import '../css/Modal.css'
import { CgClose } from 'react-icons/cg';


const Modal = ({isOpen,closeModal,children}) => {
  const backgroundRef=useRef(null);
  if(!isOpen) return null;
  const onClickBackground=(event)=>{
    if (event.target === backgroundRef.current) closeModal();
  }
  return (
    <div className='modal' ref={backgroundRef} onClick={onClickBackground}>
        <div className="content">
            <CgClose onClick={closeModal} style={{cursor:"pointer"}}/>
            {children}
        </div>
    </div>
  )
}

export default Modal