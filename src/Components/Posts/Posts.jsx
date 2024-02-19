import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { db } from '../../Firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../store/postContext';

function Posts() {
  const [products, setProducts] = useState([]);
  const { setDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const Mycollection = collection(db, 'products');
    getDocs(Mycollection).then((querysnapShot) => {
      const allPost = querysnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setProducts(allPost);
    })
  }, [])
  console.log(products)

  return (
    <div className="postParentDiv ">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className=" row ms-5">

          {
            products.map((product) => {
              return (
                <div key={product.id} onClick={() => {
                  setDetails(product);
                  navigate('/view');
                }} className="card col-md-4 col-lg-4 m-3 p-2 ms-3">
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
        <div className="cards container">
          <div className="card row">
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
