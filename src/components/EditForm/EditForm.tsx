import React, { useCallback, useMemo, useState } from 'react';
import './editForm.scss';
import { Image } from 'cloudinary-react';
import UploadWidget from './uploadWidget';
import { useLocation } from 'react-router';
import { LINKS_RESOURCES } from '../../resources/constants.ts';

function EditForm() {
    const location = useLocation(); 
    const currLocation = location.pathname;
    const documentType: any = useMemo(()=>LINKS_RESOURCES.find((link) => link.herf === currLocation)?.type,[])
    const newFormFields = {};
    for (const key in documentType) {
        newFormFields[documentType[key]] = "";
    }
    
    const [formData, setFormData] = useState(newFormFields);
    const [image, setImage] = useState();
    const [error, updateError] = useState();

    function handleSave() {
        console.log("Saved");
    }

    const handleInputChange = useCallback((key, value) => {
      if(value[0])
        value = value[0]
      setFormData({ ...formData, [key]: value });
  },[formData])

    function handleOnUpload(error, result, widget) {
      if ( error ) {
        updateError(error);
        widget.close({
          quiet: true
        });
        return;
      }
      setImage(result?.info?.secure_url);
    }

    return (
        <div className='editForm_container'>
            <h2>Create Document</h2>
            <form onSubmit={handleSave}>
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
                            !image && <button onClick={handleOnClick}>
                              Upload an Image
                            </button>
                          )
                        }}
                      </UploadWidget>             
                      </>
                    ) : (
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                        />
                    )}
                </div>
            ))}
            <button className="submit-btn" type="submit">Submit</button>
        </form>
        </div>
    );
}

export default EditForm;
