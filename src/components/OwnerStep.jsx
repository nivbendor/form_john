import React, { useState } from 'react';
import TextInput from './TextInput';

/**
 * @typedef {Object} FormData
 * @property {string} ownerFirstName
 * @property {string} ownerLastName
 * @property {string} ownerPhone
 * @property {string} ownerEmail
 * @property {string} ownerAddress
 */

/**
 * @typedef {Object} OwnerStepProps
 * @property {FormData} formData
 * @property {function} setFormData
 * @property {function} onNext
 * @property {function} onPrev
 */

/**
 * @param {OwnerStepProps} props
 */
const OwnerStep = ({ formData, setFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  /**
   * @param {string} phone
   * @returns {boolean}
   */
  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  /**
   * @param {string} email
   * @returns {boolean}
   */
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * @param {string} name
   * @param {string} value
   */
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /**
   * @param {React.FormEvent} e
   */
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
      <TextInput
        label="First Name"
        value={formData.ownerFirstName}
        onChange={(e) => handleChange('ownerFirstName', e.target.value)}
        errorText={errors.ownerFirstName}
        state={errors.ownerFirstName ? 'error' : 'default'}
      />
      <TextInput
        label="Last Name"
        value={formData.ownerLastName}
        onChange={(e) => handleChange('ownerLastName', e.target.value)}
        errorText={errors.ownerLastName}
        state={errors.ownerLastName ? 'error' : 'default'}
      />
      <TextInput
        label="Phone Number (10 digits)"
        value={formData.ownerPhone}
        onChange={(e) => handleChange('ownerPhone', e.target.value)}
        errorText={errors.ownerPhone}
        state={errors.ownerPhone ? 'error' : 'default'}
        type="tel"
      />
      <TextInput
        label="Email"
        value={formData.ownerEmail}
        onChange={(e) => handleChange('ownerEmail', e.target.value)}
        errorText={errors.ownerEmail}
        state={errors.ownerEmail ? 'error' : 'default'}
        type="email"
      />
      <TextInput
        label="Address"
        value={formData.ownerAddress}
        onChange={(e) => handleChange('ownerAddress', e.target.value)}
        errorText={errors.ownerAddress}
        state={errors.ownerAddress ? 'error' : 'default'}
      />
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