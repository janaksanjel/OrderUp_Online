import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContex } from '../../Context/StoreContex';
import './ProductDetail.css';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(null); // For storing selected rating
  const [averageRating, setAverageRating] = useState(0); // For average rating
  const { food_list, url, addTocart } = useContext(StoreContex);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const productFromList = food_list.find(item => item._id === id);
            if (productFromList) {
                setProduct(productFromList);
            } else {
                const response = await axios.get(`${url}/api/food/list/${id}`);
                if (response.data.success) {
                    setProduct(response.data.data);
                } else {
                    setError('Product not found.');
                }
            }
        } catch (error) {
            console.error('Error fetching product details:', error.response?.data || error.message);
            setError('Unable to fetch product details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    fetchProduct();
}, [id, food_list, url]);

  const fetchRatings = async () => {
    if (product) {
      try {
        const response = await axios.get(`${url}/api/rating/rate/${product._id}`);
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
  }, [product, url]);

  const handleAddToCart = () => {
    if (product) {
      addTocart(product._id);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addTocart(product._id);
      navigate('/cart');
    }
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleRatingSubmit = async () => {
    if (rating && product) {
      try {
        const token = localStorage.getItem('token');
  
        if (!token) {
          toast.error('Please log in to continue to Rating');
          return;
        }
  
        const response = await axios.post(
          `${url}/api/rating/rate`,
          {
            productId: product._id,
            rating
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
  
        if (response.status === 200 || response.status === 201) {
          toast.success('Rating submitted successfully!');
          setRating(null);
          await fetchRatings();
        } else {
          console.warn('Unexpected response:', response.data);
          alert('Failed to submit rating. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting rating:', error.response?.data || error.message);
        toast.error('You have already rated this item.');
      }
    } else {
      toast.error('Please select a rating before submitting.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className='product-detail'>
      <div className='product-image'>
        <img src={`${url}/images/${product.image}`} alt={product.name} />
      </div>
      <div className='product-info'>
        <h1>{product.name}</h1>
        <p className='description'>{product.description}</p>
        <p className='price'>Rs.{product.price}</p>
        {/* Ratings Container */}
        <h2>{averageRating.toFixed(2)} / 5</h2>
        
        <div id='ratings-container'>
         
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
        <div className='product-detail-buttons'>
          <button className='add-to-cart' onClick={handleAddToCart}>Add Cart</button>
          <button className='buy-now' onClick={handleBuyNow}>Buy Now</button>
          <div className="rating">
            <div className='rating-stars'>
              {[5, 4, 3, 2, 1].map(star => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star${star}`}
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={handleRatingChange}
                    aria-label={`Rate ${star} stars`}
                  />
                  <label
                    htmlFor={`star${star}`}
                    className={star <= rating ? 'glowing-star' : ''}
                  ></label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <button className='submit-ratings' onClick={handleRatingSubmit}>Rate Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
