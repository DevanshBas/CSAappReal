// src/utils.js

// Placeholder for a generic fetch wrapper
export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
 return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw to allow calling code to handle
  }
};

// Placeholder for formatting a date
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Placeholder for checking if a user is authenticated
export const isAuthenticated = () => {
  // Implement logic to check for a valid session token or user data
  // For now, let's assume isAuthenticated is true if there's a user in localStorage
  return !!localStorage.getItem('currentUser');
};

// Placeholder for getting the current logged-in user
export const getCurrentUser = () => {
  const userData = localStorage.getItem('currentUser');
 return userData ? JSON.parse(userData) : null;
};

// Placeholder for logging in a user (simulation)
export const loginUser = (userData) => {
  // In a real app, this would involve API calls to authenticate
  // For simulation, store user data in localStorage
  localStorage.setItem('currentUser', JSON.stringify(userData));
  console.log("User logged in:", userData);
};

// Placeholder for logging out a user
export const logoutUser = () => {
  // In a real app, this might involve API calls to invalidate tokens
  // For simulation, remove user data from localStorage
  localStorage.removeItem('currentUser');
  console.log("User logged out");
};