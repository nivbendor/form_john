import React, { useState } from 'react';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const EmployeeStep = ({ formData, setFormData, onPrev, onSubmit }) => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, selectedDate: date }));
  };

  const handleNotSureChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, notSure: checked, selectedDate: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.employeeFirstName.trim()) newErrors.employeeFirstName = 'First name is required';
    if (!formData.employeeLastName.trim()) newErrors.employeeLastName = 'Last name is required';
    if (!validateEmail(formData.employeeEmail)) newErrors.employeeEmail = 'Invalid email format';
    if (!formData.selectedDate && !formData.notSure) newErrors.date = 'Please select a date or choose "Not sure"';

    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="employeeFirstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="employeeFirstName"
          name="employeeFirstName"
          value={formData.employeeFirstName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.employeeFirstName && <p className="mt-1 text-sm text-red-600">{errors.employeeFirstName}</p>}
      </div>
      <div>
        <label htmlFor="employeeLastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="employeeLastName"
          name="employeeLastName"
          value={formData.employeeLastName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.employeeLastName && <p className="mt-1 text-sm text-red-600">{errors.employeeLastName}</p>}
      </div>
      <div>
        <label htmlFor="employeeEmail" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="employeeEmail"
          name="employeeEmail"
          value={formData.employeeEmail}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.employeeEmail && <p className="mt-1 text-sm text-red-600">{errors.employeeEmail}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pick a date
        </label>
        <DatePicker 
          value={formData.selectedDate}
          onChange={handleDateChange}
          disabled={formData.notSure}
          style={{ width: '100%' }}
          className="mt-1"
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="notSure"
          name="notSure"
          checked={formData.notSure}
          onChange={handleNotSureChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="notSure" className="ml-2 block text-sm text-gray-900">
          Not sure
        </label>
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
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmployeeStep;