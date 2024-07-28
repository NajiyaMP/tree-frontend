import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

function Admin() {
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const [getBanner, setGetBanner] = useState([]);
  const [uid, setUid] = useState("");
  const [on, setOn] = useState(false);
  const [getBannerById, setGetBannerById] = useState({});
  const [imageGroups, setImageGroups] = useState([]);

  // Fetch banners from the backend on component mount
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/getbanner`);
        setGetBanner(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [backendUrl]);

//   const handleOn = async (id) => {
//     setOn(true);
//     setUid(id);

//     try {
//       const response = await axios.get(`${backendUrl}/admin/getbannerbyid/${id}`);
//       const data = response.data;
//       setGetBannerById(data);
//       setImageGroups(data.imageGroups || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateBanners = async () => {
//     const formData = new FormData();
//     imageGroups.flat().forEach(file => formData.append("image", file));

//     try {
//       await axios.put(`${backendUrl}/admin/putbanner/${uid}`, formData);
//       window.location.reload(); // Refresh after update
//     } catch (err) {
//       console.error('Error updating banner:', err);
//     }
//   };

  const handleDelete = async (id) => {
    const windowConfirmation = window.confirm("Are you sure to delete this item?");
    if (windowConfirmation) {
      try {
        await axios.delete(`${backendUrl}/admin/deletebanner/${id}`);
        window.location.reload(); // Refresh page after successful deletion
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
        <h4 style={{textAlign:'center',justifyContent:'center',padding:'20px',color:'red'}}>Welcome to Admin Dashboard</h4>
      <div className="container table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              {[...Array(6)].map((_, index) => (
                <th scope="col" key={index}>Uploaded Files {index + 1}</th>
              ))}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getBanner.map((items, index) => (
              <tr key={index}>
                {items.imageGroups.map((imageGroup, idx) => (
                  <td key={idx}>
                    <div className="image-container">
                      {imageGroup.map((image, imgIdx) => (
                        <img key={imgIdx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${imgIdx + 1}`} />
                      ))}
                    </div>
                  </td>
                ))}
                <td>
                  {/* <Tooltip title="Edit">
                    <FiEdit style={{ color: "black", cursor: "pointer" }} onClick={() => handleOn(items._id)} />
                  </Tooltip> */}
                  <Tooltip title="Delete">
                    <MdDelete style={{ color: "black", cursor: "pointer" }} onClick={() => handleDelete(items._id)} />
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {on && (
        <div>
          <h2>Edit Banner</h2>
          <input
            type="file"
            multiple
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files);
              const newImageGroups = [...imageGroups];
              newImageGroups[0] = selectedFiles; // Assuming updating the first group for simplicity
              setImageGroups(newImageGroups);
            }}
          />
          <button onClick={updateBanners}>Update</button>
        </div>
      )} */}
    </div>
  );
}

export default Admin;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Tooltip } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";

// function Admin() {
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//   const [getBanner, setGetBanner] = useState([]);
//   const [uid, setUid] = useState("");
//   const [on, setOn] = useState(false);
//   const [getBannerById, setGetBannerById] = useState([]);
//   const [image, setImage] = useState([]);

//   // Fetch banners from the backend on component mount
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/admin/getbanner`);
//         const data = response.data;
//         setGetBanner(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetch();
//   }, [backendUrl]);

//   const handleOn = async (id) => {
//     setOn(true);
//     setUid(id);

//     try {
//       const response = await axios.get(`${backendUrl}/admin/getbannerbyid/${id}`);
//       const data = response.data;
//       setGetBannerById({
//           image: data.image || [], // Initialize image array
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateDishes = async () => {
//     const formData = new FormData();
//     if (image) {
//       image.forEach(file => formData.append("image", file));
//     }

//     try {
//       await axios.put(`${backendUrl}/admin/putbanner/${uid}`, formData);
//       window.location.reload(); // Refresh after update
//     } catch (err) {
//       console.error('Error updating dish:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const windowConfirmation = window.confirm("Are you sure to Delete this item");
//     if (windowConfirmation) {
//       try {
//         await axios.delete(`${backendUrl}/admin/deletebanner/${id}`);
//         window.location.reload(); // Refresh page after successful deletion
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="container table-responsive">
//         <table className="table table-striped table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               {[...Array(6)].map((_, index) => (
//                 <th scope="col" key={index}>Uploaded Files {index + 1}</th>
//               ))}
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getBanner.map((items, index) => (
//               <tr key={index}>
//                 {items.imageGroups.map((imageGroup, idx) => (
//                   <td key={idx}>
//                     <div className="image-container">
//                       {imageGroup.map((image, imgIdx) => (
//                         <img key={imgIdx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${imgIdx + 1}`} />
//                       ))}
//                     </div>
//                   </td>
//                 ))}
//                 <td>
//                   <Tooltip title="Edit">
//                     <FiEdit style={{ color: "black", cursor: "pointer" }} onClick={() => handleOn(items._id)} />
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <MdDelete style={{ color: "black", cursor: "pointer" }} onClick={() => handleDelete(items._id)} />
//                   </Tooltip>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {on && (
//         <div>
//           <h2>Edit Banner</h2>
//           <input
//             type="file"
//             multiple
//             onChange={(e) => setImage(Array.from(e.target.files))}
//           />
//           <button onClick={updateDishes}>Update</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Admin;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Tooltip } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";

// function Admin() {
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//   const [getBanner, setGetBanner] = useState([]);
//   const [uid, setUid] = useState("");
//   const [on, setOn] = useState(false);
//   const [getBannerById, setGetBannerById] = useState([]);
//   const [image, setImage] = useState([]);

//   // Fetch banners from the backend on component mount
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/admin/getbanner`);
//         const data = response.data;
//         setGetBanner(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetch();
//   }, [backendUrl]);

//   const handleOn = async (id) => {
//     setOn(true);
//     setUid(id);

//     try {
//       const response = await axios.get(`${backendUrl}/admin/getbannerbyid/${id}`);
//       const data = response.data;
//       setGetBannerById({
//           image: data.image || [], // Initialize image array
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateDishes = async () => {
//     const formData = new FormData();
//     if (image) {
//       image.forEach(file => formData.append("image", file));
//     }

//     try {
//       await axios.put(`${backendUrl}/admin/putbanner/${uid}`, formData);
//       window.location.reload(); // Refresh after update
//     } catch (err) {
//       console.error('Error updating dish:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const windowConfirmation = window.confirm("Are you sure to Delete this item");
//     if (windowConfirmation) {
//       try {
//         await axios.delete(`${backendUrl}/admin/deletebanner/${id}`);
//         window.location.reload(); // Refresh page after successful deletion
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="container table-responsive">
//         <table className="table table-striped table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               {[...Array(6)].map((_, index) => (
//                 <th scope="col" key={index}>Uploaded Files {index + 1}</th>
//               ))}
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getBanner.map((items, index) => (
//               <tr key={index}>
//                 {[...Array(6)].map((_, idx) => (
//                   <td key={idx}>
//                     <div className="image-container">
//                       {items.image[idx] && (
//                         <img className="avatar" src={`${backendUrl}/images/${items.image[idx]}`} alt={`Image ${idx + 1}`} />
//                       )}
//                     </div>
//                   </td>
//                 ))}
//                 <td>
//                   <Tooltip title="Edit">
//                     <FiEdit style={{ color: "black", cursor: "pointer" }} onClick={() => handleOn(items._id)} />
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <MdDelete style={{ color: "black", cursor: "pointer" }} onClick={() => handleDelete(items._id)} />
//                   </Tooltip>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {on && (
//         <div>
//           <h2>Edit Banner</h2>
//           <input
//             type="file"
//             multiple
//             onChange={(e) => setImage(Array.from(e.target.files))}
//           />
//           <button onClick={updateDishes}>Update</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Admin;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Tooltip } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";

// function Admin() {
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//   const [getBanner, setGetBanner] = useState([]);
//   const [uid, setUid] = useState("");
//   const [on, setOn] = useState(false);
//   const [getBannerById, setGetBannerById] = useState([]);
//   const [image, setImage] = useState([]);

//   // Fetch banners from the backend on component mount
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/admin/getbanner`);
//         const data = response.data;
//         setGetBanner(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetch();
//   }, [backendUrl]);

//   const handleOn = async (id) => {
//     setOn(true);
//     setUid(id);

//     try {
//       const response = await axios.get(`${backendUrl}/admin/getbannerbyid/${id}`);
//       const data = response.data;
//       setGetBannerById({
//           image: data.image || [], // Initialize image array
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateDishes = async () => {
//     const formData = new FormData();
//     if (image) {
//       image.forEach(file => formData.append("image", file));
//     }

//     try {
//       await axios.put(`${backendUrl}/admin/putbanner/${uid}`, formData);
//       window.location.reload(); // Refresh after update
//     } catch (err) {
//       console.error('Error updating dish:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const windowConfirmation = window.confirm("Are you sure to Delete this item");
//     if (windowConfirmation) {
//       try {
//         await axios.delete(`${backendUrl}/admin/deletebanner/${id}`);
//         window.location.reload(); // Refresh page after successful deletion
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="container table-responsive">
//         <table className="table table-striped table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th scope="col">Uploaded Files</th>
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getBanner.map((items, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="image-container">
//                     {items.image.map((image, idx) => (
//                       <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
//                     ))}
//                   </div>
//                 </td>
//                 <td>
//                   <Tooltip title="Edit">
//                     <FiEdit style={{ color: "black", cursor: "pointer" }} onClick={() => handleOn(items._id)} />
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <MdDelete style={{ color: "black", cursor: "pointer" }} onClick={() => handleDelete(items._id)} />
//                   </Tooltip>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {on && (
//         <div>
//           <h2>Edit Banner</h2>
//           <input
//             type="file"
//             multiple
//             onChange={(e) => setImage(Array.from(e.target.files))}
//           />
//           <button onClick={updateDishes}>Update</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Admin;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Tooltip } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";

// function Admin() {
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//   const [getBanner, setGetBanner] = useState([]);
//   const [uid, setUid] = useState("");
//   const [on, setOn] = useState(false);
//   const [getBannerById, setGetBannerById] = useState([]);
//   const [image, setImage] = useState([]);

//   // Fetch banners from the backend on component mount
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/admin/getbanner`);
//         const data = response.data;
//         setGetBanner(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetch();
//   }, [backendUrl]);

//   const handleOn = async (id) => {
//     setOn(true);
//     setUid(id);

//     try {
//       const response = await axios.get(`${backendUrl}/admin/getbannerbyid/${id}`);
//       const data = response.data;
//       setGetBannerById({
//           image: data.image || [], // Initialize image array
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const updateDishes = async () => {
//     const formData = new FormData();
//     if (image) {
//       image.forEach(file => formData.append("image", file));
//     }

//     try {
//       await axios.put(`${backendUrl}/admin/putbanner/${uid}`, formData);
//       window.location.reload(); // Refresh after update
//     } catch (err) {
//       console.error('Error updating dish:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const windowConfirmation = window.confirm("Are you sure to Delete this item");
//     if (windowConfirmation) {
//       try {
//         await axios.delete(`${backendUrl}/admin/deletebanner/${id}`);
//         window.location.reload(); // Refresh page after successful deletion
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="container table-responsive">
//         <table className="table table-striped table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th scope="col">Image</th>
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getBanner.map((items, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="image-container">
//                     {items.image.map((image, idx) => (
//                       <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
//                     ))}
//                   </div>
//                 </td>
//                 <td>
//                   <div className="image-container">
//                     {items.image.map((image, idx) => (
//                       <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
//                     ))}
//                   </div>
//                 </td>
//                 <td>
//                   <div className="image-container">
//                     {items.image.map((image, idx) => (
//                       <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
//                     ))}
//                   </div>
//                 </td>
//                 <td>
//                   <div className="image-container">
//                     {items.image.map((image, idx) => (
//                       <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
//                     ))}
//                   </div>
//                 </td>
//                 <td>
//                   <div className="image-container">
//                     {items.image.map((image, idx) => (
//                       <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
//                     ))}
//                   </div>
//                 </td>
//                 <td>
//                   <div className="image-container">
//                     {items.image.map((image, idx) => (
//                       <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
//                     ))}
//                   </div>
//                 </td>
//                 <td>
//                   <Tooltip title="Edit">
//                     <FiEdit style={{ color: "black", cursor: "pointer" }} onClick={() => handleOn(items._id)} />
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <MdDelete style={{ color: "black", cursor: "pointer" }} onClick={() => handleDelete(items._id)} />
//                   </Tooltip>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Admin;

