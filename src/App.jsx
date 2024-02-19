import React, { useContext, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './store/FirebaseContext';
import { db, auth } from './Firebase/config'

import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import { onAuthStateChanged } from 'firebase/auth';
import CreatePage from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Post from './store/postContext';

function App() {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      // console.log(user)
    })
  })
  return (
    <div>
      <Post>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='create' element={<CreatePage />} />
          <Route path='view' element={<ViewPost />} />
        </Routes>
      </Post>
    </div>
  );
}

export default App;
