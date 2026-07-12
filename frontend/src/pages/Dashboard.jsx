import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingCart, DollarSign, Package, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, salesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/dashboard/stats`, { headers }),
          axios.get(`${process.env.REACT_APP_API_URL}/dashboard/sales?period=weekly`, { headers })
        ]);

        setStats(statsRes.data);
        if (salesRes.data.labels && salesRes.data.data) {
          const chartData = salesRes.data.labels.map((label, idx) => ({
            date: label,
            sales: salesRes.data.data[idx]
          }));
          setSalesData(chartData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Orders */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Today's Orders</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.todayOrders || 0}</p>
            </div>
            <ShoppingCart className="text-blue-500" size={40} />
          </div>
        </div>

        {/* Today's Deliveries */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Today's Deliveries</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.todayDeliveries || 0}</p>
            </div>
            <Package className="text-green-500" size={40} />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Pending Orders</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.pendingOrders || 0}</p>
            </div>
            <AlertCircle className="text-yellow-500" size={40} />
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Customers</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.totalCustomers || 0}</p>
            </div>
            <Users className="text-purple-500" size={40} />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">₹{(stats?.totalRevenue || 0).toLocaleString()}</p>
            </div>
            <DollarSign className="text-green-600" size={40} />
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Pending Payments</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">₹{(stats?.pendingPayments || 0).toLocaleString()}</p>
            </div>
            <TrendingUp className="text-red-500" size={40} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        {salesData.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8B5CF6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Orders Chart */}
        {salesData.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Orders Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
