import React, { useEffect, useState } from 'react';
import { BsFillPencilFill, BsFillTrashFill, BsCopy } from 'react-icons/bs';
import { HttpClientService } from '../../services/HttpServerClient.ts';
import { useLocation } from 'react-router-dom'; 
import './table.scss';
import * as resources from '../../resources/resources.ts';
import * as constants from '../../resources/constants.ts';

function Table() {
    const location = useLocation(); 
    const currLocation = location.pathname;
    const currType = resources.LINKS_RESOURCES.find(link => link.herf === currLocation)?.type;
    const [data, setData] = useState<any[]>(); //TODO: fix type

    useEffect(() => {
        async function fetchData() {
            try {
                const response: any = await HttpClientService.get(currLocation);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [currLocation]); // TODO: change it to redux

    if (!currType) {
        return <div>{constants.TABLE_RESOURCES.TYPE_ERROR}</div>;
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
                                <td key={key}>{item[key]}</td>
                            ))}
                            <td>
                                <span className='actions'>
                                    <BsFillPencilFill/>
                                    <BsCopy/>
                                    <BsFillTrashFill/>
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
