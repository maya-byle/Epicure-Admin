import react, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import * as thunks from '../redux/tables/tableThunks.ts';
import { setDocument } from '../redux/tables/tableSlice.ts';
import { ICollection } from '../types/collectionType.ts';
import { AppDispatch, RootState } from '../redux/store.ts';

function useHandlers(item: ICollection) {
    const dispatch = useDispatch<AppDispatch>();
    const currLocation = useLocation().pathname;
    const currDocument = useSelector((state: RootState) => state.collection.currDocument);
    const [changedItem, setItem] = useState({ ...item });

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

            const imageClickHandler = () => cloudinaryWidget.open();
            document.getElementById(`image_${changedItem._id}`)?.addEventListener('click', imageClickHandler);

            return () => {
                document.getElementById(`image_${changedItem._id}`)?.removeEventListener('click', imageClickHandler);
            };
        }
    }, [currDocument, changedItem]);

    const handleSave = async (toSave) => {
        const { _id, ...itemWithoutId } = toSave;
        await dispatch(thunks.updateData({ route: `${currLocation}/${toSave._id}`, item: itemWithoutId }));
        dispatch(setDocument(undefined));
        resetTable();
    };

    const handleDelete = async (toDelete) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(thunks.deleteData({ route: `${currLocation}/${toDelete._id}`, item: toDelete }));
            dispatch(setDocument(undefined));
            resetTable();
        }
    };

    const handleChange = (e, key) => {
        setItem({ ...changedItem, [key]: e.target.value });
    };

    const resetChanges = () => {
        setItem({ ...item });
        dispatch(setDocument(undefined));
    };
    
    const resetTable = async() => {
        await dispatch(thunks.fetchData(currLocation));
    }

    return {
        changedItem,
        handleSave,
        handleDelete,
        handleChange,
        resetChanges
    };
};

export default useHandlers;