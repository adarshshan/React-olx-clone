import React, { Suspense, lazy, useContext, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './store/FirebaseContext';
import { auth } from './Firebase/config'
import { onAuthStateChanged } from 'firebase/auth';
import Post from './store/postContext';
import ProtectorRoute from './Components/ProtectorRoute';

//components
// import Home from './Pages/Home';
// import SignupPage from './Pages/Signup';
// import LoginPage from './Pages/Login';
// import CreatePage from './Pages/Create';
// import ViewPost from './Pages/ViewPost';
//Lazy-loading
const Home = lazy(() => import('./Pages/Home'))
const SignupPage = lazy(() => import('./Pages/Signup'))
const LoginPage = lazy(() => import('./Pages/Login'))
const CreatePage = lazy(() => import('./Pages/Create'))
const ViewPost = lazy(() => import('./Pages/ViewPost'))





function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    })
  })
  return (
    <div>
      <Post>
        <Routes>
          <Route path='/' element={<Suspense fallback={<span class="loader"></span>}><Home /></Suspense>} />
          <Route path='signup' element={<Suspense fallback={<span class="loader"></span>}><SignupPage /></Suspense>} />
          <Route path='login' element={<Suspense fallback={<span class="loader"></span>}><LoginPage /></Suspense>} />
          <Route path='create' element={<ProtectorRoute><Suspense fallback={<span class="loader"></span>}><CreatePage /></Suspense></ProtectorRoute>} />
          <Route path='view' element={<Suspense fallback={<span class="loader"></span>}><ViewPost /></Suspense>} />
        </Routes>
      </Post>
    </div>
  );
}

export default App;
