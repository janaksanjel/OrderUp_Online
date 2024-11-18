import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css';
import axios from 'axios';

// Register components from chart.js
Chart.register(...registerables);

function Dashboard() {
  // Initialize state
  const [foodList, setFoodList] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [todaysSales, setTodaysSales] = useState(0);
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sales Over Time',
        data: [],
        borderColor: '#00aaff',
        backgroundColor: 'rgba(0, 170, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  });

  // Helper function to get the start of today
  const getStartOfToday = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set hours to the start of the day
    return now;
  };

  // Helper function to get the start of a given month
  const getStartOfMonth = (year, month) => {
    return new Date(year, month, 1);
  };

  // Fetch food list
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/food/list');
        if (res.data.success) {
          setFoodList(res.data.data);
          setTotalItems(res.data.data.length);
        }
      } catch (error) {
        console.error('Error fetching the food list:', error);
      }
    };

    fetchFoodList();
  }, []);

  // Fetch user information
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/user/userinfo');
        if (res.data.success) {
          setUsers(res.data.data);
          setTotalCustomers(res.data.data.length);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch order list
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/order/list');
        if (res.data.success) {
          const ordersData = res.data.data;

          // Calculate total orders
          setOrders(ordersData);
          setTotalOrders(ordersData.length);

          // Calculate total sales where payment is true
          const sales = ordersData
            .filter(order => order.payment)
            .reduce((acc, order) => acc + (order.amount || 0), 0);
          setTotalSales(sales);

          // Calculate today's sales (last 24 hours)
          const startOfToday = getStartOfToday();
          const todaySales = ordersData
            .filter(order => new Date(order.Date) >= startOfToday && order.payment)
            .reduce((acc, order) => acc + (order.amount || 0), 0);
          setTodaysSales(todaySales);

          // Aggregate sales data by month
          const monthlySales = {};
          ordersData.forEach(order => {
            if (order.payment) {
              const date = new Date(order.Date);
              const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
              if (!monthlySales[yearMonth]) {
                monthlySales[yearMonth] = 0;
              }
              monthlySales[yearMonth] += order.amount || 0;
            }
          });

          // Convert aggregated sales data into chart format
          const labels = Object.keys(monthlySales);
          const data = labels.map(label => monthlySales[label]);

          setSalesData({
            labels,
            datasets: [
              {
                label: 'Sales Over Time',
                data,
                borderColor: '#00aaff',
                backgroundColor: 'rgba(0, 170, 255, 0.1)',
                fill: true,
                tension: 0.4,
              },
            ],
          });

          // Sort orders by date (most recent first)
          const sortedOrders = ordersData.sort((a, b) => new Date(b.Date) - new Date(a.Date));

          // Set sorted orders
          setOrders(sortedOrders);

        }
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome back, Admin!</h2>
      
        <p>Here is an overview of the food ordering metrics.</p>
      </div>

      {/* Today's Sales Section */}
      <div className="today-sales">
        <h3>Today's Sales</h3>
        <p className="sales-value">Rs.{todaysSales.toLocaleString()}</p>
      </div>

      <div className="dashboard-content">
        {/* Overview Cards */}
        <div className="card-container">
          <div className="card overview-card">
            <h3>Total Items</h3>
            <p className="metric-value">{totalItems}</p>
          </div>
          <div className="card overview-card">
            <h3>Total Customers</h3>
            <p className="metric-value">{totalCustomers}</p>
          </div>
          <div className="card overview-card">
            <h3>Total Orders</h3>
            <p className="metric-value">{totalOrders}</p>
          </div>
          <div className="card overview-card">
            <h3>Total Sales</h3>
            <p className="metric-value">Rs.{totalSales.toLocaleString()}</p>
          </div>
        </div>

        {/* Line Chart for Sales Over Time */}
        <div className="card large-card">
          <h3>Sales Over Time</h3>
          <Line data={salesData} />
        </div>

        {/* Orders Table */}
        <div className="card large-card rankings-card">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Status</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3).map(order => (
                <tr key={order._id}>
                  <td>{order.userId}</td>
                  <td>{order._id}</td>
                  <td>{order.status}</td>
                  <td>{order.amount ? `Rs.${order.amount.toFixed(2)}` : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
