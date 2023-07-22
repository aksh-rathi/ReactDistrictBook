// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Login.css'; // Create a CSS file for styling

// const Login = () => {
//     return (
//       <div className="login-container">
//         <h1>Login</h1>
//         <form className="login-form">
//           <input type="text" placeholder="Username" />
//           <input type="password" placeholder="Password" />
//           <button type="submit">Login</button>
//         </form>
//         <p className="register-link">
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     );
//   };

// export default Login;
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = () => {
    // Regular expression for email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // // Perform API call for login credential validation
    // // Replace with your actual API endpoint and logic
    // if (email && password) {
    //   // API call to validate login credentials
    //   // Example using fetch API
    //   fetch('https://example.com/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ email, password }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         // Login successful, perform desired action (e.g., redirect)
    //         console.log('Login successful');
    //       } else {
    //         // Login failed, handle error accordingly
    //         console.log('Login failed');
    //       }
    //     })
    //     .catch((error) => {
    //       // Handle error from API call
    //       console.log('Error:', error);
    //     });
    // }
    navigate('/mainview');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
          className={emailError ? 'error' : ''}
        />
        {emailError && <span className="error-message">{emailError}</span>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
