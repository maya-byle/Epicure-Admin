import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import resources from '../../resources/resources.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { BsFillPencilFill, BsFillTrashFill, BsCopy, BsSave, BsX } from 'react-icons/bs';
import useCollection from '../../hooks/useCollection.ts';
import * as thunks from '../../redux/tables/tableThunks.ts';
import * as constants from '../../resources/constants.ts';
import { setDocument } from '../../redux/tables/tableSlice.ts';

function TableRow({ item }) {
    const dispatch = useDispatch<AppDispatch>();
    const currLocation = useLocation().pathname;
    const currType = useCollection()?.type;
    const [changedItem, setItem] = useState({ ...item });
    const currDocument = useSelector((state: RootState) => state.collection.currDocument)
    
    useEffect(() => {
        if (currDocument === changedItem._id) {
            const cloudinaryWidget = window.cloudinary.createUploadWidget(
                {
                    cloudName: 'dhavutxxt',
                    uploadPreset: 'epicure-admin'
                },
                (error, result) => {
                    if (!error && result && result.event === 'success') {
                        const newImageUrl = result.info.secure_url;
                        setItem({ ...changedItem, image: newImageUrl });
                    }
                }
            );

            document.getElementById(`image_${changedItem._id}`)?.addEventListener('click', () => {
                cloudinaryWidget.open();
            });

            return () => {
                document.getElementById(`image_${changedItem._id}`)?.removeEventListener('click', () => {
                    cloudinaryWidget.open();
                });
            };
        }
    }, [currDocument, changedItem]);

    if (!currType) {
        return alert(constants.TABLE_CONSTANTS.ROUTE_ERROR);
    }

    const handleCopy = async (toCopy: typeof currType) => {
        const { _id, ...itemWithoutId } = toCopy;
        dispatch(thunks.addData({ route: currLocation, item: itemWithoutId }));
    };

    const handleSave = async (toSave: typeof currType) => {
        const { _id, ...itemWithoutId } = toSave;
        dispatch(thunks.updateData({ route: `${currLocation}/${toSave._id}`, item: itemWithoutId }));
        dispatch(setDocument(undefined));
    };

    const handleDelete = async (toDelete: typeof currType) => {
        if (window.confirm(resources.DELETE_CONFIRMATION)) {
            dispatch(thunks.deleteData({ route: `${currLocation}/${toDelete._id}`, item: toDelete }));
        }
    };

    const handleChange = (e, key) => {
        setItem({ ...changedItem, [key]: e.target.value });
    };

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
                            <BsX onClick={() => {setItem({...item})
                                dispatch(setDocument(undefined));
                            }} />
                        </span>
                    </td>
                </>
            )}
        </tr>
    );
}

export default TableRow;
