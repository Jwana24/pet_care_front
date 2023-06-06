'use client';

import React from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => {
  return (
    <><ToastContainer position="bottom-right" theme="light" closeOnClick /></>
  );
}

export default Toaster;