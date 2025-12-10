// components/Button.js
'use client';   
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false,
  fullWidth = false
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variants = {
    primary: 'bg-[#0F4C45] text-white hover:bg-[#1A5C52] focus:ring-[#0F4C45]',
    secondary: 'bg-[#F7DDE2] text-[#000000] hover:bg-[#FBEFF2] focus:ring-[#F7DDE2]',
    outline: 'border-2 border-[#0F4C45] text-[#0F4C45] hover:bg-[#F7DDE2] focus:ring-[#0F4C45]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;