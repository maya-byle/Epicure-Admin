import './table.scss';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import * as constants from '../../resources/constants.ts';
import * as thunks from '../../redux/tables/tableThunks.ts';
import { SpinningCircles } from 'react-loading-icons'
import useCollection from '../../hooks/useCollection.tsx';
import TableRow from './TableRow.tsx';
import Modal from '../UI/Modal/Modal.tsx';
import CreateForm from '../EditForm/CreateForm.tsx';
import Filter from '../UI/Filter/Filter.tsx';

function Table() {
    const dispatch = useDispatch<AppDispatch>()
    const currLocation = useLocation().pathname;
    const currType = useCollection()?.type;
    const data = useSelector((state: RootState) => state.collection.filterdData);
    const loadingStatus = useSelector((state: RootState) => state.collection.status);
    const isCreateDocument = useSelector((state: RootState) => state.collection.isCreateDocument);
    const isOpenImg = useSelector((state: RootState) => state.collection.isImgOpen);

    useEffect(()=>{
        dispatch(thunks.fetchData(currLocation));
        if(currLocation === '/restaurants')
            dispatch(thunks.getChefsList(currLocation+'/chefslist'));
    },[dispatch])

    if (!currType || loadingStatus === constants.STATUS_CODE.REJECTED) {
        return ;
    }

    if (loadingStatus === constants.STATUS_CODE.LOADING) {
        return <SpinningCircles className='loading-icon'/>;
    }

    return (
        <div className='table-container'>
            <Filter/>
            <table className='table'>
                <thead>
                    <tr>
                        {Object.keys(currType).map((key) => (
                            <th key={key}>{currType[key]}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <TableRow key={item._id} item={item} />
                    ))}
                </tbody>
            </table>
            {isCreateDocument && <Modal><CreateForm/></Modal>}
            {isOpenImg && 
                <Modal>
                    <img src={isOpenImg} alt='chef' style={{height:'50vh', width:'30vw', objectFit:'cover'}}/>
                </Modal>
            }
        </div>
    );
};

export default Table;