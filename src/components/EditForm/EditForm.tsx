import './editForm.scss';
import React, { useCallback, useState } from 'react';
import { LINKS_RESOURCES } from '../../resources/constants.ts';
import axios from 'axios';
import useCollection from '../../hooks/useCollection.ts';

function EditForm() {
    const documentType = useCollection()?.type;
    const newFormFields = {};
    for (const key in documentType) {
        newFormFields[documentType[key]] = "";
    }
    const cloudName = 'dhavutxxt';
    const uploadPreset = 'epicure-admin';
    
    const [formData, setFormData] = useState(newFormFields);
    const [image, setImage] = useState();
    const [error, setError] = useState();
    const [cloudinaryImage, setCloudinaryImage] = useState();
    const isFormValid = Object.values(formData).every(value => value !== '');

    const handleInputChange = useCallback((key, value) => {
      setFormData({ ...formData, [key]: value });
    }, [formData])

    const handleImg = (e) => {
      if(e.target.files[0]) {
        setImage(e.target.files[0])
      }
    }

    const handleUpload = async(file) => {
      const formData = new FormData();
      formData.append("file", file)
      formData.append("upload_preset", `${uploadPreset}`);
      let data = "";
      try {
        data = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      } catch(e) {
        console.log(e)
        alert(e)
      }
      return data;
    }

    const handleSubmit = async() => {
      const cloudinaryRes = await handleUpload(image);
      setCloudinaryImage(cloudinaryRes["secure_url"])
    }

    return (
        <div className='editForm_container'>
          <h2>Create Document</h2>
          <form onSubmit={handleSubmit}>
              {Object.keys(newFormFields).map((key) => (
                <div className='form_row' key={key}>
                    <label htmlFor={key}>{key}</label>
                      <input
                          type={key === 'image' ? 'file': "text"}
                          accept={key === 'image' ? "image/*" : ''}
                          id={key}
                          name={key}
                          placeholder={key}
                          value={formData[key]}
                          onChange={key === 'image' ?handleImg : (e) =>handleInputChange(key, e.target.value)}
                      />
                </div>
            ))}
            {/* disabled={!isFormValid} ${!isFormValid ? 'disabled' : ''}*/}
            <button className={`submit-btn`} type="submit">
              Submit
            </button>        
          </form>
        </div>
    );
}

export default EditForm;
