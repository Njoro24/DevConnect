import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
      © {new Date().getFullYear()} DevConnect. All rights reserved.
    </footer>
  );
};

export default Footer;
