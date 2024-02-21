import './filter.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store.ts';
import { filterData  } from '../../../redux/tables/tableSlice.ts';

function Filter() {
    const dispatch = useDispatch<AppDispatch>();
    const [filterInput, setFilterInput] = useState('');
    
    const handleFilterChange = (e) => {
        setFilterInput(e.target.value);
        dispatch(filterData(e.target.value))
    };

    return (
        <div className="filter-container">
            <a>Filter:</a>
            <input 
                type="text" 
                placeholder="By name..." 
                value={filterInput} 
                onChange={handleFilterChange} 
            />
        </div>
    );
};

export default Filter;
