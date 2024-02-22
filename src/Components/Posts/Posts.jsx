import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';

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

  useLayoutEffect(() => {
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
                }} className="card p-4 mb-3"
                  style={{ width: '22rem', height: '20rem' }}>
                  <img src={product.imageUrl} style={{ height: '150px' }} className="card-img-top" alt="..." />
                  <div className='d-flex justify-content-between mt-3'>
                    <p className='fs-5'>{product.name}</p>
                    <Heart />
                  </div>
                  <p>{product.category}</p>
                  <p className="card-text fs-4">RS. {product.price}</p>
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
