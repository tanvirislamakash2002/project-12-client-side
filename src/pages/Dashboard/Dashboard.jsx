import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  FaUsers, FaHandsHelping, FaUtensils, FaHeart, FaCalendarAlt,
  FaClock, FaChartLine, FaBoxOpen, FaUserCheck, FaPlusCircle,
  FaStar, FaClipboardList, FaMoneyCheckAlt, FaUsersCog, FaTasks,
  FaStarHalfAlt, FaTachometerAlt, FaHandHoldingUsd, FaUserTag,
  FaArrowUp, FaArrowDown 
} from 'react-icons/fa';
import { MdTrendingUp } from "react-icons/md";
import { IoIosStats } from 'react-icons/io';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';

// Mock data - replace with actual API calls
const mockData = {
  user: {
    totalDonations: 15,
    totalAmount: 450,
    favoriteCharities: 8,
    recentActivity: [
      { id: 1, type: 'donation', charity: 'Food for All', amount: 25, date: '2025-01-15' },
      { id: 2, type: 'review', charity: 'Hope Kitchen', rating: 5, date: '2025-01-14' },
      { id: 3, type: 'favorite', charity: 'Community Care', date: '2025-01-13' }
    ]
  },
  charity: {
    totalRequests: 24,
    acceptedRequests: 18,
    pendingRequests: 6,
    totalFoodReceived: '2,450 kg',
    peopleHelped: 1250,
    recentPickups: [
      { id: 1, restaurant: 'Golden Spoon', food: 'Mixed Meals', quantity: '50 portions', date: '2025-01-16', status: 'scheduled' },
      { id: 2, restaurant: 'Garden Bistro', food: 'Fresh Vegetables', quantity: '30 kg', date: '2025-01-15', status: 'completed' },
      { id: 3, restaurant: 'City Diner', food: 'Sandwiches', quantity: '25 items', date: '2025-01-14', status: 'completed' }
    ]
  },
  restaurant: {
    totalDonations: 32,
    totalFood: '3,200 kg',
    requestsReceived: 45,
    acceptanceRate: 78,
    recentRequests: [
      { id: 1, charity: 'Food Bridge', food: 'Pasta Meals', quantity: '40 portions', date: '2025-01-16', status: 'pending' },
      { id: 2, charity: 'Hope Kitchen', food: 'Bread & Pastries', quantity: '15 kg', date: '2025-01-15', status: 'accepted' },
      { id: 3, charity: 'Community Care', food: 'Soup & Salad', quantity: '60 portions', date: '2025-01-14', status: 'completed' }
    ]
  },
  admin: {
    totalUsers: 1248,
    totalCharities: 85,
    totalRestaurants: 156,
    totalDonations: 3420,
    pendingRoleRequests: 12,
    recentActivity: [
      { id: 1, type: 'role_request', user: 'Maria Santos', role: 'charity', date: '2025-01-16' },
      { id: 2, type: 'new_user', user: 'John Doe', date: '2025-01-15' },
      { id: 3, type: 'donation_featured', restaurant: 'Sunset Grill', date: '2025-01-14' }
    ]
  }
};

// Reusable Components
const StatCard = ({ icon: Icon, title, value, subtitle, color = "primary", trend = null }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-${color}/10`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  </div>
);

const QuickActionCard = ({ icon: Icon, title, description, to, color = "primary" }) => (
  <Link to={to} className="block group">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-primary/20 transition-all duration-200 group-hover:transform group-hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-${color}/10 group-hover:bg-${color}/20 transition-colors duration-200`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

const ActivityItem = ({ activity, type = 'user' }) => {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'donation': return FaHandsHelping;
      case 'review': return FaStarHalfAlt;
      case 'favorite': return FaHeart;
      case 'role_request': return FaUserCheck;
      case 'new_user': return FaUsers;
      case 'donation_featured': return FaStar;
      default: return FaClipboardList;
    }
  };

  const Icon = getActivityIcon();

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">
          {type === 'user' && activity.charity && `${activity.charity}`}
          {type === 'admin' && activity.user && `${activity.user}`}
          {type === 'charity' && activity.restaurant && `${activity.restaurant}`}
          {type === 'restaurant' && activity.charity && `${activity.charity}`}
        </div>
        <div className="text-xs text-gray-500">
          {activity.date} • {activity.status || activity.type}
        </div>
      </div>
    </div>
  );
};

// Role-specific Dashboard Components
const UserDashboard = ({ user, data }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.displayName}!</h1>
        <p className="text-gray-600 mt-2">Track your donations and discover new ways to help.</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Member since</p>
        <p className="font-semibold text-gray-900">January 2024</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        icon={FaHandsHelping} 
        title="Total Donations" 
        value={data.totalDonations} 
        subtitle="lifetime contributions"
        color="primary"
        trend={12}
      />
      <StatCard 
        icon={FaMoneyCheckAlt} 
        title="Amount Donated" 
        value={`$${data.totalAmount}`} 
        subtitle="total contribution"
        color="secondary"
        trend={8}
      />
      <StatCard 
        icon={FaHeart} 
        title="Favorite Charities" 
        value={data.favoriteCharities} 
        subtitle="organizations you follow"
        color="accent"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <QuickActionCard 
            icon={FaUserCheck} 
            title="Become a Charity" 
            description="Apply to become a charity organization"
            to="/dashboard/requestCharityRole"
            color="primary"
          />
          <QuickActionCard 
            icon={FaHandsHelping} 
            title="Browse Donations" 
            description="Find food donations near you"
            to="/allDonations"
            color="secondary"
          />
          <QuickActionCard 
            icon={FaHeart} 
            title="My Favorites" 
            description="View your favorite charities"
            to="/dashboard/favorites"
            color="accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-2">
          {data.recentActivity.map(activity => (
            <ActivityItem key={activity.id} activity={activity} type="user" />
          ))}
        </div>
        <Link to="/dashboard/transactionHistory" className="block mt-4 text-center text-primary hover:text-primary-600 font-medium">
          View All History →
        </Link>
      </div>
    </div>
  </div>
);

const CharityDashboard = ({ user, data }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Charity Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your food requests and track your impact.</p>
      </div>
      <div className="badge badge-success badge-lg">Verified Charity</div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        icon={FaClipboardList} 
        title="Total Requests" 
        value={data.totalRequests} 
        subtitle="all time requests"
        color="primary"
        trend={15}
      />
      <StatCard 
        icon={FaUserCheck} 
        title="Accepted" 
        value={data.acceptedRequests} 
        subtitle="successful requests"
        color="success"
        trend={8}
      />
      <StatCard 
        icon={FaClock} 
        title="Pending" 
        value={data.pendingRequests} 
        subtitle="awaiting response"
        color="warning"
      />
      <StatCard 
        icon={FaUsers} 
        title="People Helped" 
        value={data.peopleHelped.toLocaleString()} 
        subtitle="lives impacted"
        color="secondary"
        trend={22}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <QuickActionCard 
            icon={FaHandsHelping} 
            title="Browse Available Food" 
            description="Find new donation opportunities"
            to="/allDonations"
            color="primary"
          />
          <QuickActionCard 
            icon={FaClipboardList} 
            title="My Requests" 
            description="Manage your donation requests"
            to="/dashboard/myRequests"
            color="secondary"
          />
          <QuickActionCard 
            icon={FaTachometerAlt} 
            title="Scheduled Pickups" 
            description="View upcoming pickups"
            to="/dashboard/myPickups"
            color="accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Pickups</h2>
        <div className="space-y-3">
          {data.recentPickups.map(pickup => (
            <div key={pickup.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="p-2 rounded-lg bg-primary/10">
                <FaUtensils className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{pickup.restaurant}</div>
                <div className="text-xs text-gray-500">{pickup.food} • {pickup.quantity}</div>
              </div>
              <div className={`badge badge-sm ${
                pickup.status === 'completed' ? 'badge-success' : 
                pickup.status === 'scheduled' ? 'badge-warning' : 'badge-info'
              }`}>
                {pickup.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const RestaurantDashboard = ({ user, data }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Restaurant Dashboard</h1>
        <p className="text-gray-600 mt-2">Share your surplus food and make a difference.</p>
      </div>
      <div className="badge badge-warning badge-lg">Restaurant Partner</div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        icon={FaHandsHelping} 
        title="Total Donations" 
        value={data.totalDonations} 
        subtitle="food items shared"
        color="primary"
        trend={10}
      />
      <StatCard 
        icon={FaBoxOpen} 
        title="Food Donated" 
        value={data.totalFood} 
        subtitle="total weight"
        color="secondary"
        trend={18}
      />
      <StatCard 
        icon={FaTasks} 
        title="Requests Received" 
        value={data.requestsReceived} 
        subtitle="charity requests"
        color="accent"
      />
      <StatCard 
        icon={FaChartLine} 
        title="Acceptance Rate" 
        value={`${data.acceptanceRate}%`} 
        subtitle="request approval rate"
        color="success"
        trend={5}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <QuickActionCard 
            icon={FaPlusCircle} 
            title="Add New Donation" 
            description="Post surplus food for donation"
            to="/dashboard/addDonation"
            color="primary"
          />
          <QuickActionCard 
            icon={FaHandsHelping} 
            title="My Donations" 
            description="Manage your food donations"
            to="/dashboard/myDonations"
            color="secondary"
          />
          <QuickActionCard 
            icon={IoIosStats} 
            title="View Statistics" 
            description="Track your donation impact"
            to="/dashboard/donationStats"
            color="accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Requests</h2>
        <div className="space-y-3">
          {data.recentRequests.map(request => (
            <div key={request.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="p-2 rounded-lg bg-primary/10">
                <FaClipboardList className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{request.charity}</div>
                <div className="text-xs text-gray-500">{request.food} • {request.quantity}</div>
              </div>
              <div className={`badge badge-sm ${
                request.status === 'completed' ? 'badge-success' : 
                request.status === 'accepted' ? 'badge-info' : 'badge-warning'
              }`}>
                {request.status}
              </div>
            </div>
          ))}
        </div>
        <Link to="/dashboard/requestedDonations" className="block mt-4 text-center text-primary hover:text-primary-600 font-medium">
          View All Requests →
        </Link>
      </div>
    </div>
  </div>
);

const AdminDashboard = ({ user, data }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage the platform and oversee all activities.</p>
      </div>
      <div className="badge badge-error badge-lg">Administrator</div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        icon={FaUsers} 
        title="Total Users" 
        value={data.totalUsers.toLocaleString()} 
        subtitle="registered users"
        color="primary"
        trend={7}
      />
      <StatCard 
        icon={FaHeart} 
        title="Charities" 
        value={data.totalCharities} 
        subtitle="verified organizations"
        color="success"
        trend={12}
      />
      <StatCard 
        icon={FaUtensils} 
        title="Restaurants" 
        value={data.totalRestaurants} 
        subtitle="partner restaurants"
        color="warning"
        trend={8}
      />
      <StatCard 
        icon={FaHandsHelping} 
        title="Total Donations" 
        value={data.totalDonations.toLocaleString()} 
        subtitle="successful matches"
        color="secondary"
        trend={15}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Pending Role Requests</h2>
          {data.pendingRoleRequests > 0 && (
            <div className="badge badge-warning">{data.pendingRoleRequests}</div>
          )}
        </div>
        <div className="space-y-3">
          <QuickActionCard 
            icon={FaUserTag} 
            title="Role Requests" 
            description="Review charity applications"
            to="/dashboard/manageRoleRequests"
            color="warning"
          />
          <QuickActionCard 
            icon={FaUsersCog} 
            title="Manage Users" 
            description="User administration"
            to="/dashboard/manageUsers"
            color="primary"
          />
          <QuickActionCard 
            icon={FaHandHoldingUsd} 
            title="Manage Donations" 
            description="Oversee all donations"
            to="/dashboard/manageDonations"
            color="secondary"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Platform Activity</h2>
        <div className="space-y-2">
          {data.recentActivity.map(activity => (
            <ActivityItem key={activity.id} activity={activity} type="admin" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (role) {
      case 'user':
        return <UserDashboard user={user} data={mockData.user} />;
      case 'charity':
        return <CharityDashboard user={user} data={mockData.charity} />;
      case 'restaurant':
        return <RestaurantDashboard user={user} data={mockData.restaurant} />;
      case 'admin':
        return <AdminDashboard user={user} data={mockData.admin} />;
      default:
        return <UserDashboard user={user} data={mockData.user} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200/30">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;