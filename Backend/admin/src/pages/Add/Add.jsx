import React, {  useState } from 'react'
import './Add.css'
import { assest } from '../../assets/assest'
import axios, { Axios } from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


function Add({url}) {

    
    const [image,setimage]=useState (false);

  
    const [data,setdata] =useState({
        name: '',
        price: '',
        description: '',
        category: 'Salad',
        image: ''


    })

    const onChangHandler =(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setdata(data=>({...data,[name]:value}))
    }

    const onsubmitHandler =async (event)=>{
        event.preventDefault();
        const formdata =new FormData();
        formdata.append('name',data.name);
        formdata.append('price',Number(data.price));
        formdata.append('description',data.description);
        formdata.append('category',data.category);
        formdata.append('image',image);


        const response =await  axios.post(`${url}/api/food/add`,formdata)
       if(response.data.success){
        setdata({
            name: '',
            price: '',
            description: '',
            category: 'Salad',
            image: ''
    
    
        })
        setimage(false)
        toast.success(response.data.message)

       }
       else{
        toast.error(response.data.message)

       }
        

    }


    
  return (
    <>


{/* <div className="back-link-container">
  <Link to="/dashboard" className="back-link">Back</Link>
</div> */}
  

    <div className='add'>
       
        <form className='flex-col' onSubmit={onsubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):assest.uploadimage} alt=''/>
                </label>
                <input onChange={(e)=>setimage(e.target.files[0])} type='file' id='image' name='image' hidden required/>


            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangHandler} value={data.name} type='text' name='name' placeholder='Product Name' required/>

            </div>

            <div className="add-product-descrption flex-col">
                <p>Description</p>
                <textarea onChange={onChangHandler} value={data.description} name='description' rows='6' placeholder='Description' required/>

            </div>
            <div className="add-category-price">
            
            <div className="add-category flex-col">
                <p>Category</p>
                <select onChange={onChangHandler} value={data.category} name='category' required>
                    <option value='Salad'>Salad</option>
                    <option value='Rolls'>Rolls</option>
                    <option value='Pure Veg'>Pure Veg</option>
                    <option value='Pasta'>Pasta</option>
                    <option value='Noodles'>Noodles</option>
                    <option value='Deserts'>Deserts</option>
                    <option value='Cake'>Cake</option>
                    <option value='Sandwich'>Sandwich</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p> Product Price</p>
                <input onChange={onChangHandler} value={data.price} type='number' name='price' placeholder='Rs.80' required/>
            </div>
            </div>
            <button type='submit' className='add-button'>Add</button>
        </form>
      
    </div>
    </>
  )
}

export default Add
