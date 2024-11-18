import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./FoodDisplay.css";
import { StoreContex } from "../../Context/StoreContex";
import Fooditem from "../Fooditem/Fooditem";

function FoodDisplay({ category }) {
  const { food_list, url } = useContext(StoreContex);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [recentItems, setRecentItems] = useState([]);

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Fetch recent items from user's purchase history
  useEffect(() => {
    const fetchUserTopItems = async () => {
      if (!token) {
        console.warn("No token provided");
        return;
      }

      try {
        const res = await axios.post(
          `${url}/api/order/userorder`,
          {},
          { headers: { token } }
        );

        // Check if response data is structured as expected
        if (res.data.success && Array.isArray(res.data.data)) {
          const orders = res.data.data;
          const recentOrders = orders.reverse().slice(0, 1);
          setRecentItems(recentOrders);
        } else {
          console.error("API response is not in expected format:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch user top items", error);
      }
    };

    fetchUserTopItems();
  }, [url, token]);

  // Sorting and filtering logic for regular food items
  useEffect(() => {
    let sortedList = [...food_list];

    // Filter by category if necessary
    if (category !== "All") {
      sortedList = sortedList.filter((item) => item.category === category);
    }

    // Filter by search term
    const filteredList = sortedList.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredFoodList(filteredList);
  }, [food_list, searchTerm, category]);

  // Combine the recentItems and filteredFoodList
  const combinedItems = [
    ...recentItems.flatMap((order) =>
      order.items.slice(0, 2).map((item) => ({
        ...item,
        date: order.date,
      }))
    ),
    ...filteredFoodList,
  ];

  // Apply sorting to the combined list based on sortOption
  const sortedCombinedItems = combinedItems.sort((a, b) => {
    if (sortOption === "lowToHigh") return a.price - b.price;
    if (sortOption === "highToLow") return b.price - a.price;
    if (sortOption === "recentList") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="food-display">
      <h1>Top Dishes For You!</h1>

      {/* Sort and Search Section */}
      <div className="sort-dropdown">
        <label htmlFor="sort-select">Sort By:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="recentList">Recent Items</option>
        </select>
      </div>

      <div className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="Search Food..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Combined Recent Purchases and Food Items List */}
      <div className="food-display-list" id="RecentPurchasesAndRegularItems">
        {sortedCombinedItems.length > 0 ? (
          sortedCombinedItems.map((item, index) => (
            <Fooditem
              key={`item-${item._id}-${index}`} // Use combined key to ensure uniqueness
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
}

export default FoodDisplay;
