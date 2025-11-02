import React, { useState, useRef } from 'react';
import {
  FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaCalendarAlt, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaGlobe, FaUsers, FaHandsHelping, FaUtensils,
  FaShieldAlt, FaCertificate, FaAward, FaStar, FaHeart, FaBoxOpen,
  FaClipboardList, FaMoneyCheckAlt, FaUserCheck, FaBuilding, FaIdCard,
  FaClock
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import imageCompression from 'browser-image-compression';
import useAxios from '../../hooks/useAxios';

// Mock data - replace with actual API calls
const mockProfileData = {
  user: {
    joinDate: '2024-01-15',
    totalDonations: 15,
    totalAmount: 450,
    favoriteCharities: 8,
    reviewsGiven: 12,
    location: 'New York, NY',
    bio: 'Passionate about helping reduce food waste and supporting local charities.',
    achievements: ['First Donation', 'Regular Donor', 'Community Helper']
  },
  charity: {
    organizationName: 'Hope Community Kitchen',
    registrationNumber: 'CHR-2023-0458',
    establishedDate: '2018-03-15',
    verified: true,
    totalRequests: 24,
    acceptedRequests: 18,
    peopleHelped: 1250,
    address: '123 Community Street, Downtown',
    phone: '+1 (555) 123-4567',
    website: 'www.hopecommunitykitchen.org',
    description: 'Dedicated to fighting hunger in our community by distributing meals to families in need.',
    servingAreas: ['Downtown', 'East Side', 'Riverside'],
    capacity: '500 meals/day',
    specializations: ['Family Meals', 'Senior Care', 'Emergency Relief']
  },
  restaurant: {
    businessName: 'Golden Spoon Restaurant',
    businessLicense: 'BLN-2019-7829',
    establishedDate: '2019-08-22',
    cuisine: 'Italian & Mediterranean',
    totalDonations: 32,
    totalFood: '3,200 kg',
    address: '456 Main Street, City Center',
    phone: '+1 (555) 987-6543',
    website: 'www.goldenspoonrestaurant.com',
    description: 'Family-owned restaurant committed to reducing food waste by sharing surplus meals.',
    operatingHours: '11:00 AM - 10:00 PM',
    averageRating: 4.8,
    specialties: ['Fresh Pasta', 'Seasonal Vegetables', 'Artisan Bread']
  },
  admin: {
    employeeId: 'ADM-001',
    department: 'Platform Operations',
    joinDate: '2023-01-10',
    accessLevel: 'Super Admin',
    lastLogin: '2025-01-16 09:30 AM',
    managedUsers: 1248,
    resolvedIssues: 156,
    systemUptime: '99.8%'
  }
};

const Profile = () => {
  const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
  const { user, updateUser } = useAuth();
  const { role, roleLoading } = useUserRole();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const profileData = mockProfileData[role] || mockProfileData.user;

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    await axiosSecure.patch(`/users/${user.email}/profile`, {
  name: editForm.displayName,
  photoURL: hostedImageUrl,
});
    try {
      setIsUploading(true);
      await updateUser({
        displayName: editForm.displayName,
        photoURL: hostedImageUrl
      });

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been successfully updated.',
        timer: 2000,
        showConfirmButton: false
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setEditForm(prev => ({ ...prev, photoURL: e.target.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [hostedImageUrl, setHostedImageUrl] = useState(user?.photoURL);
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;
    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(imageFile, options);
      const localPreviewUrl = URL.createObjectURL(compressedFile);
      setPreviewImage(localPreviewUrl);
      setProcessing(true); 
      setUploading(true);

      const formData = new FormData();
      formData.append('image', compressedFile);

      const res = await axiosInstance.post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 180000,
      });

      const url = res.data?.data?.url;

      if (!url) throw new Error('Image URL not returned');

      setHostedImageUrl(url);
      setProcessing(false);
      setUploading(false); 
    } catch (err) {
      console.error('Upload error:', err);
      Swal.fire('Upload Failed', 'Could not upload image', 'error');
      setPreviewImage('');
      setHostedImageUrl('');
      setProcessing(false);
      setUploading(false);
    }
  };

  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'user': return 'Donor';
      case 'charity': return 'Charity Organization';
      case 'restaurant': return 'Restaurant Partner';
      case 'admin': return 'Administrator';
      default: return 'User';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'user': return 'badge-info';
      case 'charity': return 'badge-success';
      case 'restaurant': return 'badge-warning';
      case 'admin': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  const InfoCard = ({ icon: Icon, title, value, description = null }) => (
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
          <Icon className="w-5 h-5 text-primary dark:text-primary-300" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
          {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );

  const StatCard = ({ icon: Icon, title, value, subtitle }) => (
<div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl p-4 border border-primary/10 dark:border-primary/20">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-6 h-6 text-primary dark:text-primary-300" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 dark:from-primary/20 dark:via-secondary/10 dark:to-accent/20 rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={isEditing ? hostedImageUrl : user?.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200"
              >
                <FaCamera className="w-4 h-4" />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                  className="input input-bordered text-2xl font-bold bg-white/80 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your name"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.displayName || 'User'}</h1>
              )}
              <div className={`badge ${getRoleBadgeColor(role)} badge-lg`}>
                {getRoleDisplayName(role)}
              </div>
              {role === 'charity' && profileData.verified && (
                <MdVerified className="w-6 h-6 text-blue-500 dark:text-blue-400" title="Verified Organization" />
              )}
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
              <FaEnvelope className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>

            {/* Role-specific header info */}
            {role === 'charity' && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FaBuilding className="w-4 h-4" />
                  <span>{profileData.organizationName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaIdCard className="w-4 h-4" />
                  <span>Reg: {profileData.registrationNumber}</span>
                </div>
              </div>
            )}

            {role === 'restaurant' && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FaUtensils className="w-4 h-4" />
                  <span>{profileData.businessName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                  <span>{profileData.averageRating}/5.0</span>
                </div>
              </div>
            )}

            {role === 'admin' && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FaShieldAlt className="w-4 h-4" />
                  <span>ID: {profileData.employeeId}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBuilding className="w-4 h-4" />
                  <span>{profileData.department}</span>
                </div>
              </div>
            )}
          </div>

          {/* Edit Button */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  disabled={isUploading}
                  className="btn btn-primary gap-2"
                >
                  {isUploading ? (
                    <div className="loading loading-spinner loading-sm"></div>
                  ) : (
                    <FaSave className="w-4 h-4" />
                  )}
                  Save
                </button>
                <button
                  onClick={handleEditToggle}
                  className="btn btn-ghost gap-2 dark:text-gray-300"
                >
                  <FaTimes className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="btn btn-outline btn-primary gap-2"
              >
                <FaEdit className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Role-specific Statistics */}
      {role === 'user' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={FaHandsHelping} title="Total Donations" value={profileData.totalDonations} subtitle="lifetime contributions" />
          <StatCard icon={FaMoneyCheckAlt} title="Amount Donated" value={`$${profileData.totalAmount}`} subtitle="total contribution" />
          <StatCard icon={FaHeart} title="Favorite Charities" value={profileData.favoriteCharities} subtitle="organizations followed" />
          <StatCard icon={FaStar} title="Reviews Given" value={profileData.reviewsGiven} subtitle="feedback provided" />
        </div>
      )}

      {role === 'charity' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={FaClipboardList} title="Total Requests" value={profileData.totalRequests} subtitle="food requests made" />
          <StatCard icon={FaUserCheck} title="Accepted Requests" value={profileData.acceptedRequests} subtitle="successful applications" />
          <StatCard icon={FaUsers} title="People Helped" value={profileData.peopleHelped.toLocaleString()} subtitle="lives impacted" />
          <StatCard icon={FaBoxOpen} title="Serving Capacity" value={profileData.capacity} subtitle="daily meal capacity" />
        </div>
      )}

      {role === 'restaurant' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={FaHandsHelping} title="Total Donations" value={profileData.totalDonations} subtitle="food items shared" />
          <StatCard icon={FaBoxOpen} title="Food Donated" value={profileData.totalFood} subtitle="total weight donated" />
          <StatCard icon={FaStar} title="Average Rating" value={profileData.averageRating} subtitle="community rating" />
          <StatCard icon={FaUtensils} title="Cuisine Type" value={profileData.cuisine} subtitle="specialty cuisine" />
        </div>
      )}

      {role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={FaUsers} title="Managed Users" value={profileData.managedUsers.toLocaleString()} subtitle="platform users" />
          <StatCard icon={FaUserCheck} title="Resolved Issues" value={profileData.resolvedIssues} subtitle="support tickets" />
          <StatCard icon={FaShieldAlt} title="Access Level" value={profileData.accessLevel} subtitle="admin privileges" />
          <StatCard icon={FaGlobe} title="System Uptime" value={profileData.systemUptime} subtitle="platform reliability" />
        </div>
      )}

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact & Basic Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <FaUser className="w-5 h-5 text-primary dark:text-primary-300" />
            {role === 'charity' ? 'Organization Information' : 
             role === 'restaurant' ? 'Business Information' : 
             role === 'admin' ? 'Administrative Information' : 'Personal Information'}
          </h2>
          
          <div className="space-y-4">
            {role === 'user' && (
              <>
                <InfoCard icon={FaCalendarAlt} title="Member Since" value={new Date(profileData.joinDate).toLocaleDateString()} />
                <InfoCard icon={FaMapMarkerAlt} title="Location" value={profileData.location} />
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Bio</p>
                  <p className="text-gray-800 dark:text-gray-300">{profileData.bio}</p>
                </div>
              </>
            )}

            {role === 'charity' && (
              <>
                <InfoCard icon={FaCalendarAlt} title="Established" value={new Date(profileData.establishedDate).toLocaleDateString()} />
                <InfoCard icon={FaPhone} title="Phone" value={profileData.phone} />
                <InfoCard icon={FaMapMarkerAlt} title="Address" value={profileData.address} />
                <InfoCard icon={FaGlobe} title="Website" value={profileData.website} />
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Description</p>
                  <p className="text-gray-800 dark:text-gray-300">{profileData.description}</p>
                </div>
              </>
            )}

            {role === 'restaurant' && (
              <>
                <InfoCard icon={FaCalendarAlt} title="Established" value={new Date(profileData.establishedDate).toLocaleDateString()} />
                <InfoCard icon={FaPhone} title="Phone" value={profileData.phone} />
                <InfoCard icon={FaMapMarkerAlt} title="Address" value={profileData.address} />
                <InfoCard icon={FaGlobe} title="Website" value={profileData.website} />
                <InfoCard icon={FaClock} title="Operating Hours" value={profileData.operatingHours} />
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">About Us</p>
                  <p className="text-gray-800 dark:text-gray-300">{profileData.description}</p>
                </div>
              </>
            )}

            {role === 'admin' && (
              <>
                <InfoCard icon={FaCalendarAlt} title="Join Date" value={new Date(profileData.joinDate).toLocaleDateString()} />
                <InfoCard icon={FaBuilding} title="Department" value={profileData.department} />
                <InfoCard icon={FaShieldAlt} title="Access Level" value={profileData.accessLevel} />
                <InfoCard icon={FaClock} title="Last Login" value={profileData.lastLogin} />
              </>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <FaAward className="w-5 h-5 text-primary dark:text-primary-300" />
            {role === 'charity' ? 'Service Areas & Specializations' : 
             role === 'restaurant' ? 'Specialties & Features' : 
             role === 'admin' ? 'System Access & Permissions' : 'Achievements & Interests'}
          </h2>

          {role === 'user' && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Achievements</p>
                <div className="flex flex-wrap gap-2">
                  {profileData.achievements.map((achievement, index) => (
                    <span key={index} className="badge badge-primary badge-outline">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {role === 'charity' && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Serving Areas</p>
                <div className="flex flex-wrap gap-2">
                  {profileData.servingAreas.map((area, index) => (
                    <span key={index} className="badge badge-success badge-outline">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {profileData.specializations.map((spec, index) => (
                    <span key={index} className="badge badge-info badge-outline">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {role === 'restaurant' && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {profileData.specialties.map((specialty, index) => (
                    <span key={index} className="badge badge-warning badge-outline">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <InfoCard icon={FaIdCard} title="Business License" value={profileData.businessLicense} />
            </div>
          )}

          {role === 'admin' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">Platform Status</p>
                      <p className="text-lg font-bold text-green-900 dark:text-green-100">Operational</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;