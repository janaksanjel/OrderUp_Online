import AppDownload from '../../Components/APPDownload/AppDownload'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import Header from '../../Components/Header/Header'
import './Home.css'
import React, { useState } from 'react'

function Home() {

  let [category,setcategory]=useState("All")
  return (
    <>
    <Header/>
    <ExploreMenu  category={category}  setcategory={setcategory}/>
    <FoodDisplay category={category}/>
    <AppDownload/>
    
    </>
  )
}

export default Home
