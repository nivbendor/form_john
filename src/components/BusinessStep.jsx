import React, { useState } from 'react';
import TextInput from './TextInput'; // Ensure this path is correct

const BusinessStep = ({ formData, setFormData, onNext }) => {
  const [errors, setErrors] = useState({});
  const [showBillingAddress, setShowBillingAddress] = useState(false);

  const validateEIN = (ein) => {
    return /^\d{9}$/.test(ein);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleAddressCheckbox = (e) => {
    const { checked } = e.target;
    setShowBillingAddress(!checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, billingAddress: prev.address }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.legalName.trim()) newErrors.legalName = 'Legal name is required';
    if (!validateEIN(formData.ein)) newErrors.ein = 'EIN must be 9 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (showBillingAddress && !formData.billingAddress.trim()) newErrors.billingAddress = 'Billing address is required';

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <TextInput
        label="Legal Name"
        value={formData.legalName}
        onChange={(e) => handleChange('legalName', e.target.value)}
        errorText={errors.legalName}
        state={errors.legalName ? 'error' : 'default'}
      />
      
      <TextInput
        label="EIN (9 digits)"
        value={formData.ein}
        onChange={(e) => handleChange('ein', e.target.value)}
        errorText={errors.ein}
        state={errors.ein ? 'error' : 'default'}
      />
      
      <TextInput
        label="Address"
        value={formData.address}
        onChange={(e) => handleChange('address', e.target.value)}
        errorText={errors.address}
        state={errors.address ? 'error' : 'default'}
      />
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="sameAddress"
          name="sameAddress"
          checked={!showBillingAddress}
          onChange={handleAddressCheckbox}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="sameAddress" className="ml-2 block text-sm text-gray-900">
          Billing address same as business address
        </label>
      </div>
      
      {showBillingAddress && (
        <TextInput
          label="Billing Address"
          value={formData.billingAddress}
          onChange={(e) => handleChange('billingAddress', e.target.value)}
          errorText={errors.billingAddress}
          state={errors.billingAddress ? 'error' : 'default'}
        />
      )}
      
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Next
      </button>
    </form>
  );
};

export default BusinessStep;