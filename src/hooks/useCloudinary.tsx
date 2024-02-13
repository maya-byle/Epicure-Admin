// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store.ts';

// function useCloudinary(item, currType) {
//     const currDocument = useSelector((state: RootState) => state.collection.currDocument);
//     const [changedItem, setItem] = useState({ ...item });

//     const handleCloudinaryUpload = () => {
//         const cloudinaryWidget = window.cloudinary.createUploadWidget(
//             {
//                 cloudName: 'dhavutxxt',
//                 uploadPreset: 'epicure-admin'
//             },
//             (error, result) => {
//                 if (!error && result && result.event === 'success') {
//                     const newImageUrl = result.info.secure_url;
//                     setItem({ ...changedItem, image: newImageUrl });
//                 }
//             }
//         );

//         const imageClickHandler = () => cloudinaryWidget.open();
//         document.getElementById(`image_${changedItem._id}`)?.addEventListener('click', imageClickHandler);

//         return () => {
//             document.getElementById(`image_${changedItem._id}`)?.removeEventListener('click', imageClickHandler);
//         };
//     };

//     if (currDocument === changedItem._id) {
//         handleCloudinaryUpload();
//     }

//     return {
//         changedItem,
//     };
// }

// export default useCloudinary;
