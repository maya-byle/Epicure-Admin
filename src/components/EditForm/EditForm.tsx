import './editForm.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

function EditForm() {
    const dispatch = useDispatch();
    const selectedDocument = useSelector((state: RootState) => state.states.currentModal);

    function handleSave() {
        console.log("Saved")
    };

    if(!selectedDocument) {
        return ;
    }

    return ( 
        <div className='editForm_container'>
            <h2>Edit / Create {selectedDocument.name}</h2>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <button type="button" onClick={handleSave} className={'edit-btn'} >
                    Save
                </button>
            </form>
        </div>
    );
}

export default EditForm;




/*
  e='modal-close-btn' onClick={handleClose}>
              <img src={xModreturn (
    <div className='modal-backdrop' onClick={handleClose}>
      <Fade cascade duration={300}>
        <div className='modal-container' onClick={(e) => e.stopPropagation()}>
          <div className='modal-btn-container'>
            <button classNamal} alt='Close' />
            </button>
          </div>
          {selectedCard && <Card {...selectedCard} className='modal' />}
        </div>
      </Fade>
    </div>
  );
};

export default Modal;
*/