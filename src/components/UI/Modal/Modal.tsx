import './modal.scss';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCreateDocument, setOpenImg } from '../../../redux/tables/tableSlice.ts';
import { BsX } from 'react-icons/bs';
import { Fade } from "react-awesome-reveal";

function Modal(props) {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setCreateDocument(undefined));
        dispatch(setOpenImg(undefined));
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
              {props.children}
            </div>
          </Fade>
      </div>
    );
}

export default Modal;
