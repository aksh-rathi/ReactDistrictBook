import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({onLogin}) => {

  const userEmail = process.env.REACT_APP_USER_EMAIL;
  const userPassword = process.env.REACT_APP_USER_PASSWORD;

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
    if (email === userEmail && password === userPassword) {
      // Set the isLoggedIn variable in localStorage to indicate successful login
      localStorage.setItem("isLoggedIn", "true");
      navigate("/mainview");
    } else {
      // Handle invalid login credentials (optional)
      // For example, display an error message or show a toast notification
      alert("Invalid login credentials");
    }
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
