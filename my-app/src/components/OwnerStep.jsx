import React, { useState } from 'react';

const OwnerStep = ({ formData, setFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.ownerFirstName.trim()) newErrors.ownerFirstName = 'First name is required';
    if (!formData.ownerLastName.trim()) newErrors.ownerLastName = 'Last name is required';
    if (!validatePhone(formData.ownerPhone)) newErrors.ownerPhone = 'Phone number must be 10 digits';
    if (!validateEmail(formData.ownerEmail)) newErrors.ownerEmail = 'Invalid email format';
    if (!formData.ownerAddress.trim()) newErrors.ownerAddress = 'Address is required';

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="ownerFirstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="ownerFirstName"
          name="ownerFirstName"
          value={formData.ownerFirstName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.ownerFirstName && <p className="mt-1 text-sm text-red-600">{errors.ownerFirstName}</p>}
      </div>
      <div>
        <label htmlFor="ownerLastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="ownerLastName"
          name="ownerLastName"
          value={formData.ownerLastName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.ownerLastName && <p className="mt-1 text-sm text-red-600">{errors.ownerLastName}</p>}
      </div>
      <div>
        <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700">
          Phone Number (10 digits)
        </label>
        <input
          type="tel"
          id="ownerPhone"
          name="ownerPhone"
          value={formData.ownerPhone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.ownerPhone && <p className="mt-1 text-sm text-red-600">{errors.ownerPhone}</p>}
      </div>
      <div>
        <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="ownerEmail"
          name="ownerEmail"
          value={formData.ownerEmail}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.ownerEmail && <p className="mt-1 text-sm text-red-600">{errors.ownerEmail}</p>}
      </div>
      <div>
        <label htmlFor="ownerAddress" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="ownerAddress"
          name="ownerAddress"
          value={formData.ownerAddress}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.ownerAddress && <p className="mt-1 text-sm text-red-600">{errors.ownerAddress}</p>}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Previous
        </button>
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default OwnerStep;