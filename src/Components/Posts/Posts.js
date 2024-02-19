import React, { useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { db, auth } from '../../Firebase/config';
import { collection, getDoc, getDocs, query } from 'firebase/firestore';

function Posts() {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const Mycollection = collection(db, 'products');
    const querysnapShot = await getDocs(Mycollection);
    if (querysnapShot) {
      const allPost = await querysnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setProducts(allPost);
    }

  }, [])
  console.log(products)

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {
            products.map((product) => {
              return (
                <div className="card">
                  <div className="favorite">
                    <Heart />
                  </div>
                  <div className="image">
                    <img src={product.imageUrl} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.name}</span>
                    <p className="name">{product.category}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              )
            })
          }


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
