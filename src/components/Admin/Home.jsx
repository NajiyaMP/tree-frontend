// import React, { useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [image, setImage] = useState([]);
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

//   const handleImage = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setImage(selectedFiles); // Store multiple files
//   };

//   const postDishes = async () => {
//     const formData = new FormData();
//     for (let i = 0; i < image.length; i++) {
//       formData.append('image', image[i]);
//     }

//     try {
//       await axios.post(`${backendUrl}/admin/postbanner`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       window.location.reload(); // Refresh page after successful post
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="upload-page">
//       <h1 className="title">Documents Uploading</h1>
//       <h2 className="subtitle"><b>Please upload the answer sheet</b></h2>
//       <div className="upload-container">
//         <div className="row">
//           {[...Array(6)].map((_, index) => (
//             <div key={index} className="col-md-4 col-sm-6 mb-3">
//               <div className="file-upload-container">
//                 <input
//                   type="file"
//                   multiple
//                   className="file-upload"
//                   id={`fileUpload${index}`}
//                   onChange={handleImage}
//                 />
//                 <label htmlFor={`fileUpload${index}`} className="file-upload-label">
//                   <span style={{color:'grey',fontSize:'1rem'}}>Upload</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     fill="currentColor"
//                     className="bi bi-upload"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
//                     <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
//                   </svg>
//                 </label>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="file-count" style={{ marginTop: '20px', fontSize: '1rem' }}>
//           <strong>Files chosen:</strong> {image.length}
//         </div>
//         <button type="submit" className="btn btn-submit mt-4" onClick={postDishes} style={{ color: 'white', padding: "10px", width: '204px' }}>
//           <b>Submit</b>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [imageGroups, setImageGroups] = useState([]);
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

  const handleImage = (e, index) => {
    const selectedFiles = Array.from(e.target.files);
    const newImageGroups = [...imageGroups];
    newImageGroups[index] = selectedFiles;
    setImageGroups(newImageGroups);
  };

  const postBanners = async () => {
    const formData = new FormData();
    imageGroups.flat().forEach(file => formData.append('image', file));

    try {
      await axios.post(`${backendUrl}/admin/postbanner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.reload(); // Refresh page after successful post
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="upload-page">
      <h1 className="title">Documents Uploading</h1>
      <h2 className="subtitle"><b>Please upload the answer sheet</b></h2>
      <div className="upload-container">
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-3">
              <div className="file-upload-container">
                <input
                  type="file"
                  multiple
                  className="file-upload"
                  id={`fileUpload${index}`}
                  onChange={(e) => handleImage(e, index)}
                />
                <label htmlFor={`fileUpload${index}`} className="file-upload-label">
                  <span style={{color:'grey',fontSize:'1rem'}}>Upload</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-upload"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                  </svg>
                </label>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-submit mt-4" onClick={postBanners} style={{color:'white',padding:"10px",width:'204px'}}><b>Submit</b></button>
        <div>
            <Link to={'/dashboard'}>
                <button className="btn btn-submit mt-4"  style={{color:'white',padding:"10px",width:'204px'}}><b>GO TO DASHBOARD</b></button>

            </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [imageGroups, setImageGroups] = useState([]);
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

//   const handleImage = (e, index) => {
//     const selectedFiles = Array.from(e.target.files);
//     const newImageGroups = [...imageGroups];
//     newImageGroups[index] = selectedFiles;
//     setImageGroups(newImageGroups);
//   };

//   const postDishes = async () => {
//     const formData = new FormData();
//     imageGroups.flat().forEach(file => formData.append('image', file));

//     try {
//       await axios.post(`${backendUrl}/admin/postbanner`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       window.location.reload(); // Refresh page after successful post
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="upload-page">
//       <h1 className="title">Documents Uploading</h1>
//       <h2 className="subtitle"><b>Please upload the answer sheet</b></h2>
//       <div className="upload-container">
//         <div className="row">
//           {[...Array(6)].map((_, index) => (
//             <div key={index} className="col-md-4 col-sm-6 mb-3">
//               <div className="file-upload-container">
//                 <input
//                   type="file"
//                   multiple
//                   className="file-upload"
//                   id={`fileUpload${index}`}
//                   onChange={(e) => handleImage(e, index)}
//                 />
//                 <label htmlFor={`fileUpload${index}`} className="file-upload-label">
//                   <span style={{color:'grey',fontSize:'1rem'}}>Upload</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     fill="currentColor"
//                     className="bi bi-upload"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
//                     <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
//                   </svg>
//                 </label>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button className="btn btn-submit mt-4" onClick={postDishes} style={{color:'white',padding:"10px",width:'204px'}}><b>Submit</b></button>
//       </div>
//     </div>
//   );
// };

// export default Home;

// // Home.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [image, setImage] = useState([]);
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

//   const handleImage = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setImage(selectedFiles); // Store multiple files
//   };

//   const postDishes = async () => {
//     const formData = new FormData();
//     for (let i = 0; i < image.length; i++) {
//       formData.append('image', image[i]);
//     }

//     try {
//       await axios.post(`${backendUrl}/admin/postbanner`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       window.location.reload(); // Refresh page after successful post
//     } catch (err) {
//       console.log(err);
//     }
//   };


//   return (
//     <div className="upload-page">
//       <h1 className="title">Documents Uploading</h1>
//       <h2 className="subtitle"><b>Please upload the answer sheet</b></h2>
//       <div className="upload-container">
//         <div className="row">
//           {[...Array(6)].map((_, index) => (
//             <div key={index} className="col-md-4 col-sm-6 mb-3">
//                  <div className="file-upload-container">
//                 <input
//                     type="file"
//                     multiple
//                     className="file-upload"
//                     id={`fileUpload${index}`}
//                     onChange={handleImage}
//                 />
//                 <label htmlFor={`fileUpload${index}`} className="file-upload-label">
//                 <span style={{color:'grey',fontSize:'1rem'}}>Upload</span>

//                     <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     fill="currentColor"
//                     className="bi bi-upload"
//                     viewBox="0 0 16 16"
//                     >
//                     <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
//                     <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
//                     </svg>
//                 </label>
//                 </div>
//               {/* <div className="input-group" style={{ borderColor: 'blue' }}>
//                 <input
//                   type="file"
//                   multiple
//                   className="form-control"
//                   id={`fileUpload${index}`}
//                   onChange={handleImage}
//                   style={{ borderColor: 'blue' }}
//                 />
//                 <button className="btn btn-outline-secondary" type="button" style={{ borderColor: 'blue' }}>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
//                     <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
//                     <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
//                   </svg>
//                 </button>
//               </div> */}
//             </div>
//           ))}
//         </div>
//         <button className="btn btn-submit mt-4" onClick={postDishes} style={{color:'white',padding:"10px",width:'204px'}}><b>Submit</b></button>
//       </div>
//     </div>
//   );
// };

// export default Home;




// // src/UploadPage.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//     const [files, setFiles] = useState({});
//     const [image, setImage] = useState([]);

//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;


//     const handleImage = (e) => {
//         const selectedFiles = Array.from(e.target.files);
//         setImage(selectedFiles); // Store multiple files
//       };
//     const postDishes = async () => {
//         const formData = new FormData();
       
    
//         // Append each file to formData
//         for (let i = 0; i < image.length; i++) {
//           formData.append("image", image[i]);
//         }
    
//         try {
//             await axios.post(`${backendUrl}/admin/postbanner`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             window.location.reload(); // Refresh page after successful post
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div className="upload-page">
//             <h1 className="title">Documents Uploading</h1>
//             <p className="subtitle"><b>Please upload the answer sheet</b></p>
//             <div className="upload-container">

//                 <div className="row">
//                     {[...Array(6)].map((_, index) => (
//                         <div key={index} className="col-md-4 col-sm-6 mb-3">
//                             <div className="input-group" style={{ borderColor: 'blue' }}>
//                                 <input
//                                     type="file"
//                                     multiple
//                                     className="form-control"
//                                     id={`fileUpload${index}`}
//                                     onChange={handleImage}
//                                     style={{ borderColor: 'blue' }}
//                                 />
//                                 <button className="btn btn-outline-secondary" type="button" style={{ borderColor: 'blue' }}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
//                                         <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
//                                         <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <button className="btn btn-submit mt-4" onClick={postDishes}>Submit</button>

//             </div>
//         </div>
//     );
// };

// export default Home;
// // src/UploadPage.js
// import React from 'react';

// const Home = () => {

//     const handleSubmit = async () => {
//         const formData = new FormData();
//         Object.keys(productData).forEach(key => {
//             if (key === 'images') {
//                 Array.from(productData.images).forEach(file => {
//                     formData.append('images', file);
//                 });
//             } else {
//                 formData.append(key, productData[key]);
//             }
//         });

//         try {
//             await axios.post(`${backendUrl}/admin/postbanner`, formData);
//             fetchProducts(); // Refresh products list
//             handleClose();
//         } catch (err) {
//             console.error('Error posting product:', err);
//         }
//     };
//   return (
//     <div className="upload-page">
//       <h1 className="title">Documents Uploading</h1>
//       <p className="subtitle"><b>Please upload the answer sheet</b></p>
//       <div className="upload-container">
//         <div className="row">
//           {[...Array(6)].map((_, index) => (
//             <div key={index} className="col-md-4 col-sm-6 mb-3">
//              <div className="input-group" style={{ borderColor: 'blue' }}>
//                 <input 
//                     type="file" 
//                     multiple 
//                     className="form-control" 
//                     id={`fileUpload${index}`} 
//                     placeholder="Upload"
//                     style={{ borderColor: 'blue' }}
//                 />
//                 <button className="btn btn-outline-secondary" type="button" style={{ borderColor: 'blue' }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
//                     <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
//                     <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
//                     </svg>
//                 </button>
//                 </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button className="btn btn-submit mt-4" onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default Home;