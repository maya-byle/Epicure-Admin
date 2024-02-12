import React from 'react';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import './header.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { setModal } from '../../redux/tables/tableSlice.ts';
import useCollection from '../../hooks/useCollection.ts';

function Header() {
  const dispatch = useDispatch<AppDispatch>() 
  const collectionName: string|undefined = useCollection()?.name;
  
    const openModal = () => {
      dispatch(setModal({}));
    };
  
    return (
      <div className="header-container">
        <h1>{collectionName? collectionName : "Header"}</h1>
        <BsDatabaseFillAdd size={30} className='add-button' onClick={openModal} />
      </div>
    );
  };
  
  export default Header;