import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/postContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/config';

function View() {
  const [userDetails, setUserDetails] = useState('')
  const { details } = useContext(PostContext)

  useEffect(() => {
    const { userId } = details;
    const Mycollection = collection(db, 'users');
    const q = query(Mycollection, where('id', '==', userId));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data());
      })
    })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <div className="viewParentDiv container pb-3">
        <div className="imageShowDiv">
          <img
            src={details.imageUrl}
            alt="image will be loaded."
          />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {details.price} </p>
            <span>{details.name}</span>
            <p>{details.category}</p>
            <span>{details.createdAt}</span>
          </div>
          {userDetails && <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>}
        </div>
      </div>
    </>
  );
}
const NewView = React.memo(View);
export default NewView;
