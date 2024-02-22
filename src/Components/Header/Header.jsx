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

  const logOut = () => {
    signOut(auth);
    navigate('/login')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to='/'><OlxLogo /></Link>
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#fff" />
          </div>
        </div>
        <div className="language">
          <div className="dropdown">
            <button className="btn btn-white dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              ENGLISH <Arrow />
            </button>
            <ul className="dropdown-menu shadow" style={{cursor:'pointer'}} aria-labelledby="dropdownMenuButton1">
              <li className="dropdown-item">Profile</li>
              {user && <li onClick={logOut} className="dropdown-item" href="#">Logout</li>}
            </ul>
          </div>
        </div>
        <div className="loginPage">
          {!user ? (<Link to='/login' style={{ color: 'black' }}><span>Login</span></Link>) :
            (<span>{user.email}</span>)}

          <hr />
        </div>

        <div onClick={() => navigate('/create')} className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
