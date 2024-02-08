import './table.scss';
import React, { useEffect } from 'react';
import { BsFillPencilFill, BsFillTrashFill, BsCopy } from 'react-icons/bs';
import { useLocation } from 'react-router-dom'; 
import * as constants from '../../resources/constants.ts';
import * as thunks from '../../redux/thunks.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';

function Table() {
    const dispatch =  useDispatch<AppDispatch>()
    const location = useLocation(); 
    const currLocation = location.pathname;
    const currType = constants.LINKS_RESOURCES.find(link => link.herf === currLocation)?.type;
    const data = useSelector((state:RootState) => state.chef.currentChefsData);
    const isLoading = useSelector((state:RootState) => state.chef.status);
    
    console.log(data)
    useEffect(()=>{
        dispatch(thunks.fetchData(currLocation));
      },[dispatch])

    if (!currType) {
        return <div>{constants.TABLE_CONSTANTS.ROUTE_ERROR}</div>;
    }

    const handleEdit = async (item: typeof currType) => {  //TODO: use try/catch
        dispatch(thunks.updateData({route: `${currLocation}/${item._id}`, item}));
    };

    const handleCopy = async (item:  typeof currType) => { //TODO: use try/catch
        console.log('Copying item:', item);
        const { _id, ...itemWithoutId } = item;
        dispatch(thunks.addData({ route: currLocation, item: itemWithoutId }));
    };

    const handleDelete = async (item:  typeof currType) => { //TODO: use try/catch
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(thunks.deleteData({route: `${currLocation}/${item._id}`, item}));
        }
    };

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
