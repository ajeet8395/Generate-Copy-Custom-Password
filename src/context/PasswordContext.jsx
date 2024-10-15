import React, { createContext, useState, useCallback } from 'react';

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addToHistory = useCallback((password) => {
    setHistory(prev => [password, ...prev.slice(0, 9)]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <PasswordContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </PasswordContext.Provider>
  );
};