import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios';

const AuthForms = () => {
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleOverlayBtnClick = () => {
    setRightPanelActive(!rightPanelActive);
    setMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      if (type === 'signup') {
        const response = await axios.post(`${backendUrl}/admin/signup`, formData);
        setMessage('User successfully signed up');
        console.log(response.data);
      } else {
        const response = await axios.post(`${backendUrl}/admin/login`, formData);
        setLoggedIn(true);
        setMessage('Login successful');
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage('Error: ' + (error.response ? error.response.data.message : error.message));
    }
  };
  if (loggedIn) {
        return <Navigate to="/home" replace />;
      }

  return (
    <div className={`container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
      <span className="big-circle">
        <span className="inner-circle"></span>
      </span>
      <img src="https://i.imgur.com/wcGWHvx.png" className="square" alt="" />
      <div className="form-container sign-up-container">
        <form onSubmit={(e) => handleSubmit(e, 'signup')}>
          <h1>Create Account</h1>
          <span>SIGN UP</span>
          <div className="infield">
            <input
              type="text"
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <label></label>
          </div>
          <div className="infield">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label></label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={(e) => handleSubmit(e, 'login')}>
          <h1>SIGN IN</h1>
          <div className="infield">
            <input
              type="text"
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <label></label>
          </div>
          <div className="infield">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label></label>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Please login with your credentials</p>
            <button onClick={handleOverlayBtnClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello</h1>
            <p>Enter your details and start your journey with us</p>
            <button id="signUpBtn" onClick={handleOverlayBtnClick}>Sign Up</button>
          </div>
        </div>
        <button id="overlayBtn" onClick={handleOverlayBtnClick}></button>
      </div>
    </div>
  );
};

export default AuthForms;



// //without backend

// import { useState } from 'react';
// import { Navigate } from 'react-router-dom'; // Assuming you're using React Router

// const Login = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [error, setError] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username === 'user' && password === 'secured132') {
//       setLoggedIn(true);
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   if (loggedIn) {
//     return <Navigate to="/home" replace />;
//   }

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h3>Admin Login</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className="login-input"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             className="login-input"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit" className="login-button">Login</button>
//         </form>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;









//with backend
// import axios from 'axios';
// import { useState } from 'react';
// import { Navigate } from 'react-router-dom'; // Assuming you're using React Router

// const Login = () => {
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [error, setError] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false); // New state for loading

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             const response = await axios.post(`${backendUrl}/admin/login`, {
//                 username: username,
//                 password: password,
//             }, { timeout: 5000 }); // Setting a 5 seconds timeout for the request
            
//             if (response.status === 200) {
//                 setLoggedIn(true); // Set loggedIn to true upon successful login
//             } else {
//                 setError('Unexpected error occurred. Please try again later.');
//             }
//         } catch (err) {
//             if (err.code === 'ECONNABORTED') {
//                 setError('Login request timed out. Please check your internet connection and try again.');
//             } else if (err.response && err.response.status === 401) {
//                 setError('Invalid username or password');
//             } else {
//                 setError('Failed to connect to the server. Please try again later.');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // If logged in, navigate to /home
//     if (loggedIn) {
//         return <Navigate to="/home" replace />;
//     }

//     return (
//         <div className="login-container">
//             <div className="login-card">
//                 <h3><b>Admin Panel</b></h3>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         className="login-input"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         className="login-input"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button type="submit" className="login-button" disabled={loading}>
//                         {loading ? 'Logging in...' : 'Login'}
//                     </button>
//                     {error && <p className="error-message">{error}</p>}
//                 </form>
//             </div>

//             {/* Add spinner container */}
//             {loading && (
//                 <div className="spinner-container">
//                     <div className="spinner"></div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Login;





