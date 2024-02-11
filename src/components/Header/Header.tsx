import React from 'react';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import './header.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { setModal } from '../../redux/tables/tableSlice.ts';
import { LINKS_RESOURCES } from '../../resources/constants.ts'
import { useLocation } from 'react-router';

function Header() {
  const location = useLocation(); 
  const currLocation = location.pathname;
  const dispatch = useDispatch<AppDispatch>() 
  const link: any = LINKS_RESOURCES.filter((link) => link.herf === currLocation)[0]
  
    const openModal = () => {
      dispatch(setModal({}));
    };
  
    return (
      <div className="header-container">
        <h1>{link? link.name : "Header"}</h1>
        <BsDatabaseFillAdd size={30} className='add-button' onClick={openModal} />
      </div>
    );
  };
  
  export default Header;