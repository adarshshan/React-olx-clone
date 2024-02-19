import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";


import Logo from '../../olx-logo.png';
import './Signup.css';
import { db } from '../../Firebase/config';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      let userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Signed up 
      const user = userCredential.user; alert(user);
      let updated = await addDoc(collection(db, "users"), {
        id: userCredential.user.uid,
        username: username,
        password: password,
        email: email,
        phone: phone
      })
      if (updated) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            defaultValue="Doe"
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
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login' style={{}}>Login</Link>
      </div>
    </div>
  );
}
