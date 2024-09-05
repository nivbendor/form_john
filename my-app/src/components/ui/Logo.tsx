import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex justify-center mb-6">
      <img src="/logo.png" alt="Company Logo" className="h-16 w-auto" />
    </div>
  );
};

export default Logo;