import './modal.scss';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/states/stateSlice.ts';
import { BsX } from 'react-icons/bs';
import EditForm from '../../EditForm/EditForm.tsx';
import { Fade } from "react-awesome-reveal";

function Modal() {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
      <div className='modal-backdrop' onClick={handleClose}>
          <Fade cascade duration={300}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
              <div className='modal-btn-container'>
                <button className='modal-close-btn' >
                  <BsX size={30} color={'white'} onClick={handleClose}/>
                </button>
              </div>
              <EditForm/>
            </div>
          </Fade>
      </div>
    );
  };

export default Modal;

