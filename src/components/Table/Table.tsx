import './table.scss';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import resources from '../../resources/resources.ts';
import * as constants from '../../resources/constants.ts';
import * as thunks from '../../redux/thunks.ts';
import { BsFillPencilFill, BsFillTrashFill, BsCopy } from 'react-icons/bs';
import { SpinningCircles } from 'react-loading-icons'

function Table() {
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation(); 
    const currLocation = location.pathname;
    const currType = constants.LINKS_RESOURCES.find(link => link.herf === currLocation)?.type;
    
    const data = useSelector((state: RootState) => state.collection.collectionData);
    const loadingStatus = useSelector((state: RootState) => state.collection.status);
    
    console.log(data)
    useEffect(()=>{
        dispatch(thunks.fetchData(currLocation));
    },[dispatch])

    if (!currType || loadingStatus === constants.STATUS_CODE.REJECTED) {
        return alert(constants.TABLE_CONSTANTS.ROUTE_ERROR);
    }

    const handleEdit = async (item: typeof currType) => {  //TODO: use try/catch
        dispatch(thunks.updateData({route: `${currLocation}/${item._id}`, item}));
    };

    const handleCopy = async (item:  typeof currType) => { //TODO: use try/catch
        const { _id, ...itemWithoutId } = item;
        dispatch(thunks.addData({ route: currLocation, item: itemWithoutId }));
    };

    const handleDelete = async (item:  typeof currType) => { //TODO: use try/catch
        if (window.confirm(resources.DELETE_CONFIRMATION)) {
            dispatch(thunks.deleteData({route: `${currLocation}/${item._id}`, item}));
        }
    };


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
                    {data && data.map((item) => (
                        <tr key={item._id}>
                            {Object.keys(currType).map((key) => (
                                <td key={key} className={key === 'status' ? `label ${item.status}` : ''}>{item[key]}</td>
                                ))}
                            <td>
                                <span className='actions'>
                                    <BsFillPencilFill onClick={() => handleEdit(item)}/>
                                    <BsCopy onClick={() => handleCopy(item)}/>
                                    <BsFillTrashFill onClick={() => handleDelete(item)}/>
                                </span>    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
