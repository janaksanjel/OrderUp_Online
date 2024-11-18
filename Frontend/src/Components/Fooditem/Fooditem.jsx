import React, { useContext, useEffect, useState} from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContex } from '../../Context/StoreContex'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Fooditem({id,name,price,description,image}) {


  // let [itemcount,setitemcount] =useState(0)
  const {cartItem,addTocart,removeFromCart,url}= useContext(StoreContex)

  const [averageRating, setAverageRating] = useState(0); 

  const fetchRatings = async () => {
    if (id) {
      try {
        const response = await axios.get(`${url}/api/rating/rate/${id}`);
        const data = response.data;

        if (data.success) {
          setAverageRating(data.averageRating);

        } else {
          console.error('Failed to fetch ratings:', data.message);
        }
      } catch (error) {
        console.error('Error fetching ratings:', error.response?.data || error.message);
      }
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [id, url]);

  return (
    <div className='foof-item'>
        <div className='food-item-img-container'>

       
            <img className='food-item-image' src={url+"/images/"+image} alt=''/>
           
            {
              !cartItem[id]
              ?<img   className='add'onClick={()=>addTocart(id)} src={assets.plus} alt=''/>

              :<div className='food-item-counter'>
                <img className='add-minus' onClick={()=>removeFromCart(id)}   src={assets.minus} alt='' />
                <p>{cartItem[id]}</p>
                <img className='add-plus-green' onClick={()=>addTocart(id)}   src={assets.plusgreen} alt='' />
              </div>
            }

        </div>
        <Link to={`/food/${id}`}>

        <div className='food-item-info'>
           <div className='food-item-name-rating'>
            <p>{name}</p>
            <div id='ratings-container'>
          {/* <h2>{averageRating.toFixed(2)} / 5</h2> */}
          <div className='rating-stars'>
            {[5, 4, 3, 2, 1].map(star => (
              <span
                key={star}
                className={star <= averageRating ? 'glowing-star' : ''}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
           

           </div>
           <p className="food-item-description">
            {description}
           </p>
           <p className="food-item-price">Rs.{price}</p>
        </div>
        </Link>

      
    </div>
  )
}

export default Fooditem
