import './table.scss';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import * as constants from '../../resources/constants.ts';
import * as thunks from '../../redux/tables/tableThunks.ts';
import { SpinningCircles } from 'react-loading-icons'
import useCollection from '../../hooks/useCollection.ts';
import TableRow from './TableRow.tsx';

function Table() {
    const dispatch = useDispatch<AppDispatch>()
    const currLocation = useLocation().pathname;
    const currType = useCollection()?.type;
    const data = useSelector((state: RootState) => state.collection.collectionData);
    const loadingStatus = useSelector((state: RootState) => state.collection.status);
    
    useEffect(()=>{
        dispatch(thunks.fetchData(currLocation));
    },[dispatch])


    if (!currType || loadingStatus === constants.STATUS_CODE.REJECTED) {
        return alert(constants.TABLE_CONSTANTS.ROUTE_ERROR);
    }

    if (loadingStatus === constants.STATUS_CODE.LOADING) {
        return <SpinningCircles className='loading-icon'/>;
    }

    return (
        <div className='table-container'>
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
                        <TableRow key={item._id} item={item}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;