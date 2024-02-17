import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/FirebaseContext';
import { auth } from '../../Firebase/config';
import { signOut } from 'firebase/auth';


function Header() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  const logOut=()=>{
    signOut(auth);
    navigate('/login')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {!user ? (<Link to='/login' style={{ textDecoration: 'none', color: 'black' }}><span>Login</span></Link>) :
            (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{user.email}</span>
                <span onClick={logOut} style={{ marginLeft: '8px', cursor: 'pointer' }}>Logout</span>
              </div>
            )}

          <hr />
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
