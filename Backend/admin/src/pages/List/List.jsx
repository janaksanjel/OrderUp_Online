import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function List({url}) {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      // console.log(res.data);

      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error("Error Showing List!");
      }
    } catch (error) {
      toast.error("Error Fetching List!");
    }
  };

  const removefood =async (foodId)=>{
    // console.log(foodId);

    const res =await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList()
  if(res.data.success){
    toast.success(res.data.message)
  }else{
    toast.error(res.data.message)
  }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
    {/* <div className="back-link-container">
  <Link to="/dashboard" className="back-link">Back</Link>
</div> */}

    <div className="list flex-col">
      
      <p>All food List</p>
      <div className="list-table">
        <div className="list-table-formate title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div className="list-table-formate" key={index}>
            <img src={`${url}/images/${item.image}`} alt="food" className="list-img" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs.{item.price}</p>

            <button   onClick={()=>removefood(item._id)} class="bin-button">
  <svg
    class="bin-top"
    viewBox="0 0 39 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
    <line
      x1="12"
      y1="1.5"
      x2="26.0357"
      y2="1.5"
      stroke="white"
      stroke-width="3"
    ></line>
  </svg>
  <svg
    class="bin-bottom"
    viewBox="0 0 33 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_8_19" fill="white">
      <path
        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
      ></path>
    </mask>
    <path
      d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
      fill="white"
      mask="url(#path-1-inside-1_8_19)"
    ></path>
    <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
    <path d="M21 6V29" stroke="white" stroke-width="4"></path>
  </svg>
</button>

          </div>
        ))}
      </div>
    </div>

    </>
  );
}

export default List;
