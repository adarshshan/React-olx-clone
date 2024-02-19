import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        navigate('/');
        alert('logined successfully')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="loginParentDiv shadow">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="Name"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
