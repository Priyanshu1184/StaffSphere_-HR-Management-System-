import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || null);

  useEffect(() => {
    if (userId) {
      sessionStorage.setItem('userId', userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
