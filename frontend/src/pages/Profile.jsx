import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    bio: user?.bio || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await authService.updateProfile(profileData);
      updateUser(response.user);
      setEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Unable to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 6 characters',
      });
      return;
    }

    setLoading(true);

    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      setMessage({ type: 'success', text: 'Password updated successfully' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update password',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-dark-900 mb-8">
            My Profile
          </h1>

          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`px-4 py-3 rounded-lg mb-6 ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <h2 className="text-2xl font-bold text-dark-900">
                  {user?.name || 'User'}
                </h2>
                <p className="text-dark-600 mb-4">{user?.email}</p>

                <div className="pt-4 border-t border-dark-200 text-sm">
                  <div className="flex justify-between py-2">
                    <span className="text-dark-600">Member Since</span>
                    <span className="font-semibold text-dark-900">
                      Jan 2024
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-dark-600">Listings</span>
                    <span className="font-semibold text-dark-900">12</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-dark-600">Account Status</span>
                    <span className="font-semibold text-green-600">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Info */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-dark-900">
                    Personal Information
                  </h3>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {editing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-100"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-100"
                      placeholder="+91 9XXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Company / Agency
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={profileData.company}
                      onChange={handleProfileChange}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-100"
                      placeholder="Real Estate Agency / Builder"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      About You
                    </label>
                    <textarea
                      name="bio"
                      rows="4"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-100"
                      placeholder="Brief introduction about your experience"
                    />
                  </div>

                  {editing && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  )}
                </form>
              </div>

              {/* Change Password */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold text-dark-900 mb-6">
                  Change Password
                </h3>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="input-field"
                    placeholder="Current password"
                  />

                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="input-field"
                    placeholder="New password"
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="input-field"
                    placeholder="Confirm new password"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
