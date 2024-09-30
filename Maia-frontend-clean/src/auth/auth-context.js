import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const access = sessionStorage.getItem('access_token');
    const refresh = sessionStorage.getItem('refresh_token');
    return access && refresh ? { access, refresh } : null;
  });

  const navigate = useNavigate();

  const login = async (username, password) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`http://${apiUrl}/api/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      const data = await response.json();
      setAuthTokens(data);
      sessionStorage.setItem('access_token', data.access);
      sessionStorage.setItem('refresh_token', data.refresh);
      sessionStorage.setItem('first_name', data.first_name);
      sessionStorage.setItem('last_name', data.last_name);
      navigate('/');
    } else {
      console.error('Login failed');
    }
  };

  const logout = () => {
    setAuthTokens(null);
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const fetchWithAuth = async (url, options = {}) => {
    const token = authTokens?.access;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        options.headers['Authorization'] = `Bearer ${newToken}`;
        return fetch(url, options);
      }
    }

    return response;
  };

  const refreshAccessToken = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const refreshToken = authTokens?.refresh;
    const response = await fetch(`http://${apiUrl}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh: refreshToken })
    });

    if (response.ok) {
      const data = await response.json();
      setAuthTokens(data);
      sessionStorage.setItem('access_token', data.access);
      return data.access;
    } else {
      console.error('Refresh token failed');
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, login, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
