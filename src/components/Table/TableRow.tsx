import React from 'react';
import resources from '../../resources/resources.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { BsFillPencilFill, BsFillTrashFill, BsCopy, BsSave, BsX } from 'react-icons/bs';
import useCollection from '../../hooks/useCollection.tsx';
import * as constants from '../../resources/constants.ts';
import { setDocument } from '../../redux/tables/tableSlice.ts';
import useHandlers from '../../hooks/useHandlers.tsx';

function TableRow({ item }) {
    const dispatch = useDispatch<AppDispatch>();
    const currType = useCollection()?.type;
    const selectedDocument = useSelector((state: RootState) => state.collection.currDocument)
    const { changedItem, handleSave, handleDelete, handleChange, resetChanges } = useHandlers(item);
    const chefsList = useSelector((state: RootState) => state.collection.chefs);

    if (!currType) {
        return alert(constants.TABLE_CONSTANTS.ROUTE_ERROR);
    }

    return (
        <tr key={item._id}>
            {selectedDocument !== changedItem._id ? (
                <>
                    {Object.keys(currType).map((key) => (
                        <td key={key} className={key === 'status' ? `label ${item.status}` : ''}>
                            {key === 'image' ? (
                                <img
                                    id={`image_${changedItem._id}`}
                                    src={item[key]}
                                    alt="img"
                                 />
                            ) : (
                                item[key]
                            )}
                        </td>
                    ))}
                    <td>
                        <span className="actions">
                            <BsFillPencilFill onClick={() => dispatch(setDocument(item._id))} />
                            <BsFillTrashFill onClick={() => handleDelete(item)} />
                        </span>
                    </td>
                </>
            ) : (
                //changed Item Mode
                <>
                    {Object.keys(currType).map((key) => (
                        <td key={key} className='edit'>
                            {selectedDocument === changedItem._id ? (
                                key === 'image' ? (
                                    <img
                                        id={`image_${changedItem._id}`}
                                        src={changedItem[key]}
                                        alt="img"
                                    />
                                ) : key === 'status' ? (
                                    <select
                                        id={key}
                                        name={key}
                                        value={changedItem[key]}
                                        onChange={(e) => handleChange(e, key)}
                                    >
                                        <option value="active">{resources.ACTIVE}</option>
                                        <option value="deleted">{resources.DELETED}</option>
                                    </select>
                                ) : key === 'chef' ? (  //In restaurants table
                                    <select
                                        id={key}
                                        name={key}
                                        value={changedItem[key]}
                                        onChange={(e) => handleChange(e, key)}
                                    >
                                        {chefsList.map((chef) => 
                                            <option key={chef._id} value={chef.name}>
                                                {chef.name}
                                            </option>
                                        )}
                                    </select>
                                ) : key === 'rank' || key === "price" ? (
                                 <input
                                     type="number"
                                     value={changedItem[key]}
                                     min={1}
                                     max={key==='rank' ? 5 : undefined}
                                     onChange={(e) => handleChange(e, key)}
                                 />
                                ) : key === 'tags' ? (
                                    <select
                                        id={key}
                                        name={key}
                                        value={changedItem[key]}
                                        onChange={(e) => handleChange(e, key)}
                                    >
                                        <option value=""></option>
                                        <option value="Spicy">Spicy</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                    </select>
                                ) : key === 'restaurants' || key === '_id' ? <>
                                    {changedItem[key]}
                                </> : (
                                    <input
                                        className=""
                                        type="text"
                                        value={changedItem[key]}
                                        onChange={(e) => handleChange(e, key)}
                                    />
                                )
                            ) : (
                                changedItem[key]
                            )}
                        </td>
                    ))}
                    <td>
                        <span className="actions">
                            <BsSave onClick={() => handleSave(changedItem)} />
                            <BsX onClick={() => resetChanges()} />
                        </span>
                    </td>
                </>
            )}
        </tr>
    );
}

export default TableRow;
