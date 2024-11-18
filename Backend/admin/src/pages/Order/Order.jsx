import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assest } from "../../assets/assest";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

function Order({ url }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      console.log("API response:", response.data);
      if (response.data && response.data.success) {
        const orderssss = response.data.data;
        const orderssssss = orderssss.reverse();
        setOrders(orderssssss);

        setFilteredOrders(orderssssss); // Initialize filtered orders with all orders
      } else {
        throw new Error("Error Fetching Orders");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const res = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (res.data.success) {
      await fetchAllOrders();
      toast.success(res.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterOrders(event.target.value);
  };

  const filterOrders = (query) => {
    if (query.trim() === "") {
      setFilteredOrders(orders); // Reset to all orders if query is empty
    } else {
      const filtered = orders.filter((order) =>
        order.address.phone.includes(query.trim())
      );
      setFilteredOrders(filtered);
    }
  };

  const generatePDF = (order) => {
    const doc = new jsPDF();
    const imgData =
      "data:image/png;base64,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";
    // Set image to be used in the PDF
    doc.addImage(imgData, "PNG", 10, 10, 50, 20);

    // Set up columns and rows for the table
    const tableColumn = [
      "ID",
      "Customer Name",
      "Total Amount",
      "Phone",
      "Address",
      "Status",
    ];
    const tableRows = [
      [
        order._id,
        order.address.firstName + order.address.lastName,
        order.amount,
        order.address.phone,
        order.address.street,
        order.status,
      ],
    ];

    doc.autoTable(tableColumn, tableRows, { startY: 40 });

    doc.setFontSize(14);
    doc.text(
      "More Information About Order:",
      10,
      doc.autoTable.previous.finalY + 10
    );
    doc.text(`Order ID: ${order._id}`, 15, doc.autoTable.previous.finalY + 20);
    doc.text(
      `Total Amount: Rs.${order.amount}`,
      15,
      doc.autoTable.previous.finalY + 30
    );
    doc.text(
      `Items: ${order.items.length}`,
      15,
      doc.autoTable.previous.finalY + 40
    );
    doc.text(
      `Full Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode}`,
      15,
      doc.autoTable.previous.finalY + 50
    );
    doc.text(`Status: ${order.status}`, 15, doc.autoTable.previous.finalY + 60);

    doc.text("Thank You For Ordering!", 10, doc.autoTable.previous.finalY + 90);

    // Save the PDF
    doc.save(`order_${order._id}.pdf`);
  };

  return (
    <>
      {/* <div className="back-link-container">
  <Link to="/dashboard" className="back-link">Back</Link>
</div> */}

      <div className="order-table">
        <h1>Food Order List</h1>

        {/* Search input */}
        <div className="ui-input-container">
          <input
            value={searchQuery}
            onChange={handleSearchInputChange}
            required=""
            placeholder="Search by phone number..."
            className="ui-input"
            type="text"
          />
          <div className="ui-input-underline"></div>
          <div className="ui-input-highlight"></div>
          <div className="ui-input-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="currentColor"
                d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              ></path>
            </svg>
          </div>
        </div>

        <table className="order-list">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Items</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Invoice</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{`${order.address.firstName} ${order.address.lastName}`}</td>
                <td>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {`${item.name} x${item.quantity}`}
                      {idx !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td>
                  <div>
                    <p>{order.address.street}</p>
                    <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode}`}</p>
                  </div>
                </td>
                <td>{order.address.phone}</td>
                <td>Rs {order.amount}</td>
                <td>
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Preparing Order">Preparing Order</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>
                  <button
                    className="invoice"
                    onClick={() => generatePDF(order)}
                  >
                    Invoice
                  </button>
                </td>

                <td>
                  <div className="payment-status">
                    {order.payment ? (
                      <span role="img" aria-label="tick">
                        ✅
                      </span>
                    ) : (
                      <span role="img" aria-label="cross">
                        ❌
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Order;
