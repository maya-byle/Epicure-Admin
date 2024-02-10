// import { Cloudinary } from "@cloudinary/url-gen";
// import cloudinary from 'cloudinary';

// cloudinary.config({
//     cloud_name: 'your_cloud_name',
//     api_key: 'your_api_key',
//     api_secret: 'your_api_secret',
// });

// function handleSave(image) {
//     if (image) {
//         const formData = new FormData();
//         formData.append('file', image);

//         cloudinary.uploader.upload(formData, (result) => {
//             // Handle the Cloudinary response here (result.url contains the image URL).
//             console.log('Image uploaded to Cloudinary:', result.url);
//         });
//     }
// }


import { useEffect, useRef } from 'react';

let cloudinary;

const UploadWidget = ({ children, onUpload }) => {
  const widget = useRef();

  useEffect(() => {
    // Store the Cloudinary window instance to a ref when the page renders TODO: maybe save in slice
    if ( !cloudinary ) {
      cloudinary = window.cloudinary;
    }
    // To help improve load time of the widget on first instance, use requestIdleCallback
    // to trigger widget creation. If requestIdleCallback isn't supported, fall back to
    // setTimeout: https://caniuse.com/requestidlecallback
    function onIdle() {
      if ( !widget.current ) {
        widget.current = createWidget();
      }
    }
    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    }
    // eslint-disable-next-line
  }, []);


  function createWidget() {
    const cloudName = 'dhavutxxt'; //process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    const uploadPreset = 'epicure-admin';//process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.warn(`Kindly ensure you have the cloudName and UploadPreset 
      setup in your .env file at the root of your project.`)
    }
    const options = {
      cloudName, // Ex: mycloudname
      uploadPreset, // Ex: myuploadpreset
    }

    return cloudinary?.createUploadWidget(options,
      function (error, result) {
        // The callback is a bit more chatty than failed or success so
        // only trigger when one of those are the case. You can additionally
        // create a separate handler such as onEvent and trigger it on
        // ever occurrence
        if ((error || result.event === 'success') && typeof onUpload === 'function' ) {
          onUpload(error, result, widget);
        }
      }
    );
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    if ( !widget.current ) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return (
    <>
      {children({ cloudinary, widget, open })}
    </>
  )
}

export default UploadWidget;