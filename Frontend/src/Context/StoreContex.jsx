import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const StoreContex = createContext(null);

const StoreContexProvider = (props) => {
  const [cartItem, setCartItem] = useState({});

  const url ="http://localhost:4000";

  const [token,settoken] =useState("")

  const[food_list,setfoodlist] =useState([])

  const addTocart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
      toast.success("Item added to your cart")
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      toast.success("Item added to your cart")
    }
    if(token)
      { await axios.post(
      `${url}/api/cart/add`,
      {itemId },
      { headers: { token } }
  );}
    
 



  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    toast.success("Item removed from your cart.")

    if(token){
      axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
    }
  };

  useEffect(() => {
    // console.log(cartItem);
  }, [cartItem]);


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const fatchfoodlist =async()=>{
    const response = await axios.get(url+"/api/food/list")
    setfoodlist(response.data.data)
  }


  const LoadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      console.log('API Response:', response.data); // Add this line
      if (response.data.success) {
        setCartItem(response.data.cartData); // Ensure this matches the data structure
      } else {
        console.error('Failed to load cart data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  
  useEffect(()=>{
   

    async function loadData(){
      await fatchfoodlist()

      if(localStorage.getItem("token")){
        settoken(localStorage.getItem("token"))
        await LoadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  },[])



  const contexValue = {
    food_list,
    cartItem,
    setCartItem,
    addTocart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    settoken
  };

  return (
    <StoreContex.Provider value={contexValue}>
      {props.children}
    </StoreContex.Provider>
  );
};

export default StoreContexProvider;
