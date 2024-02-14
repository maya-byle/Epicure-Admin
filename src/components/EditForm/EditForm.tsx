import './editForm.scss';
import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router';
import useCollection from '../../hooks/useCollection.tsx';
import { Image } from 'cloudinary-react';
import UploadWidget from './uploadWidget';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import * as thunks from '../../redux/tables/tableThunks.ts';
import resources from '../../resources/resources.ts';

function EditForm() {
    const location = useLocation(); 
    const currLocation = location.pathname;
    const documentType = useCollection()?.type
    const newFormFields = {};
    for (const key in documentType) {
      if(key !== "_id" && key !=="status")
        newFormFields[documentType[key]] = "";    
    }
    const dispatch = useDispatch<AppDispatch>()
    
    const [formData, setFormData] = useState(newFormFields);
    const [image, setImage] = useState();
    const isFormValid = Object.values(formData).every(value => value !== '');

    const handleInputChange = useCallback((key, value) => {
      setFormData({ ...formData, [key]: value });
    },[formData])

    const handleOnUpload = (error, result, widget) => {
      if ( error ) {
        widget.close({
          quiet: true
        });
        return;
      }
      setImage(result?.info?.secure_url);
      setFormData((prevData) => ({ ...prevData, ['image']: result?.info?.secure_url }));
    }

    const handleSubmit = async() => {
      dispatch(thunks.addData({ route: currLocation, item: formData }));
    }

    console.log(newFormFields)

    return (
        <div className='editForm_container'>
            <h2>Create Document</h2>
            <form onSubmit={handleSubmit}>
              {Object.keys(newFormFields).map((key) => (
                <div className='form_row' key={key}>
                    <label htmlFor={key}>{key}</label>
                    {key === 'image' ? (
                      <>
                      <Image
                        cloudName = 'dhavutxxt'
                        uploadPreset = 'epicure-admin'
                        onChange={(info) => setImage(info.target.files[0])}
                      />
                      <UploadWidget onUpload={handleOnUpload}>
                        {({ open }) => {
                          function handleOnClick(e) {
                            e.preventDefault();
                            open();
                          }
                          return (
                            !image ? <button className='upload-btn' onClick={handleOnClick}>
                              {resources.UPLOAD}
                            </button> :
                            <button >{image}</button>
                          )
                        }}
                      </UploadWidget>             
                      </>
                    ) : (
                        <input
                            type="text"
                            id={key}
                            name={key}
                            placeholder={key}
                            value={formData[key]}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                        />
                    )}
                </div>
            ))}
            <button className={`submit-btn ${!isFormValid ? 'disabled' : ''}`} type="submit" disabled={!isFormValid}>
              {resources.SUBMIT}
            </button>
        </form>
        </div>
    );
}

export default EditForm;
