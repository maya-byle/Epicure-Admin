import React from 'react';
import { useLocation } from 'react-router-dom';
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
    const currDocument = useSelector((state: RootState) => state.collection.currDocument)

    const { changedItem, handleCopy, handleSave, handleDelete, handleChange, resetChanges } = useHandlers(item, currType);

    if (!currType) {
        return alert(constants.TABLE_CONSTANTS.ROUTE_ERROR);
    }

    return (
        <tr key={item._id}>
            {currDocument !== changedItem._id ? (
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
                            <BsCopy onClick={() => handleCopy(item)} />
                            <BsFillTrashFill onClick={() => handleDelete(item)} />
                        </span>
                    </td>
                </>
            ) : (
                //changed Item Mode
                <>
                    {Object.keys(currType).map((key) => (
                        <td key={key} className={key === 'status' ? `label ${changedItem.status}` : ''}>
                            {currDocument === changedItem._id ? (
                                key === 'image' ? (
                                    <img
                                        id={`image_${changedItem._id}`}
                                        src={changedItem[key]}
                                        alt="img"
                                        style={{ cursor: 'pointer' }}
                                    />
                                ) : key === 'status' ? (
                                    <select
                                        id="status"
                                        name="status"
                                        value={changedItem[key]}
                                        onChange={(e) => handleChange(e, key)}
                                    >
                                        <option value="active">{resources.ACTIVE}</option>
                                        <option value="deleted">{resources.DELETED}</option>
                                    </select>
                                ) : (
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
                            <BsX onClick={() => resetChanges} />
                        </span>
                    </td>
                </>
            )}
        </tr>
    );
}

export default TableRow;
