'use client';

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="dark"
        closeButton={false}
        hideProgressBar
      />
    </React.Fragment>
  );
};
