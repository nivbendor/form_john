import React, { useState } from 'react';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

// Custom wrapper for DatePicker
const CustomDatePicker = React.forwardRef((props, ref) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Pick a date
      </label>
      <DatePicker 
        {...props}
        ref={ref}
        style={{ width: '100%' }}
        className="mt-1"
      />
    </div>
  );
});

const EnrollmentDateStep = ({ formData, setFormData, onPrev, onSubmit }) => {
  const [errors, setErrors] = useState({});

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

    if (!formData.selectedDate && !formData.notSure) {
      newErrors.date = 'Please select a date or choose "Not sure"';
    }

    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Timing Is Everything</h2>
        <p className="text-lg mb-4">What date are you looking to start the enrollment?</p>
      </div>
      
      <CustomDatePicker
        value={formData.selectedDate}
        onChange={handleDateChange}
        disabled={formData.notSure}
      />
      {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
      
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
      
      <p className="text-sm text-gray-600 italic">You update the information after submission.</p>
      
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

export default EnrollmentDateStep;