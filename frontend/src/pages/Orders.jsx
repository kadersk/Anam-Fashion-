import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Filter, Eye, Trash2 } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    deliveryDate: '',
    priority: 'medium',
    writtenInstructions: ''
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders`,
        { headers, params }
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      cutting: 'bg-blue-100 text-blue-800',
      stitching: 'bg-purple-100 text-purple-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Orders</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} /> New Order
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['all', 'pending', 'cutting', 'stitching', 'ready', 'delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No orders found</div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{order.orderNumber}</h3>
                  <p className="text-gray-600 text-sm">Customer: {order.customerId?.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><strong>Priority:</strong> {order.priority}</p>
                <p><strong>Delivery:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> ₹{order.totalAmount || 'N/A'}</p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-600 rounded-lg hover:bg-blue-50">
                  <Eye size={16} className="mx-auto" />
                </button>
                <button className="flex-1 text-red-600 hover:text-red-800 px-3 py-2 border border-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 size={16} className="mx-auto" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
