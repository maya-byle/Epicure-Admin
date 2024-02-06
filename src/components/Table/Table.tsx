import React, { useEffect, useState } from 'react';
import { BsFillPencilFill, BsFillTrashFill, BsCopy } from 'react-icons/bs';
import { HttpClientService } from '../../HttpServerClient.ts';
import './table.scss';

interface Chef {
    _id: string;
    name: string;
    description: string;
    image: string;
    // restaurants: string[];
    status: string;
}

function Table() {
    const [data, setData] = useState<Chef[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response: any = await HttpClientService.get('/chefs');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []); // TODO: change it to redux

    const keys = Object.keys(data ? data[0] : []);

    return (
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((chef) => (
                        <tr key={chef._id}>
                            <td>{chef._id}</td>
                            <td>{chef.name}</td>
                            <td>{chef.description}</td>
                            <td>{chef.image}</td>
                            <td> 
                                <span className={`label label-${chef.status}`}>{chef.status}</span>
                            </td>
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
