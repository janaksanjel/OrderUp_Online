import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContex } from '../../Context/StoreContex';
import axios from 'axios';

function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const navigate = useNavigate();
  const { url } = useContext(StoreContex);

  const verifypayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      if (response.data.success) {
        navigate('/myorders');
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifypayment();
  }, []);

  return (
    <div className='verify'>
      <div className="spinner">
        {/* You can add a spinner or loading indicator here if needed */}
      </div>
    </div>
  );
}

export default Verify;
