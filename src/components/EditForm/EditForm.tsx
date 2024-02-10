import React, { useState } from 'react';
import './editForm.scss';
import { Image } from 'cloudinary-react';
import UploadWidget from './uploadWidget';

function EditForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState();
    const [url, updateUrl] = useState();
    const [error, updateError] = useState();

    function handleSave() {
        // Upload image to Cloudinary here, using the 'image' state.
        console.log("Saved");
    }

    function handleOnUpload(error, result, widget) {
      if ( error ) {
        updateError(error);
        widget.close({
          quiet: true
        });
        return;
      }
      updateUrl(result?.info?.secure_url);
    }

    return (
        <div className='editForm_container'>
            <h2>Create Document</h2>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <label htmlFor='image'>Image</label>
                <Image
                    cloudName="your_cloud_name"
                    uploadPreset="your_upload_preset"
                    onChange={(info) => setImage(info.target.files[0])}
                />
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button onClick={handleOnClick}>
                Upload an Image
              </button>
            )
          }}
        </UploadWidget>             
          <button type="button" onClick={handleSave} className={'edit-btn'}> 
                    Save
                </button>
            </form>
        </div>
    );
}

export default EditForm;
