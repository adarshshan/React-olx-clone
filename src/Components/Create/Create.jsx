import React, { useContext, useState } from 'react';
import './Create.css';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Header from '../Header/Header';
import { AuthContext } from '../../store/FirebaseContext';
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from '../../Firebase/config';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `/image/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      const date = new Date();
      await setDoc(doc(collection(db, "products")), {
        name,
        category,
        price,
        imageUrl,
        userId: user.uid,
        createdAt: date.toDateString()
      })
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <card>
        <div className="centerDiv shadow">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
              type="number"
              id="fname"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ''} />
          <form>
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </>
  );
};

export default Create;
