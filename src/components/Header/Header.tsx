import React, { useState } from 'react';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import './header.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { setModal } from '../../redux/states/stateSlice.ts';

function Header() {
  const dispatch = useDispatch<AppDispatch>()  
  
    const openModal = () => {
      dispatch(setModal({}));
    };
  
    return (
      <div className="header-container">
        <h1>Dashboard</h1>
        <BsDatabaseFillAdd size={30} className='add-button' onClick={openModal} />
      </div>
    );
  };
  
  export default Header;