import React, { useState, ChangeEvent } from 'react';
import TextInput from './TextInput';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  errorText?: string;
  state?: 'default' | 'focused' | 'error';
}

const AddressInput: React.FC<AddressInputProps> = ({ value, onChange, label, errorText, state }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    // Simulated address autocomplete API call
    // Replace this with actual API call in production
    if (inputValue.length > 3) {
      setSuggestions([
        inputValue + " Street, City, State",
        inputValue + " Avenue, City, State",
        inputValue + " Road, City, State",
      ]);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <TextInput
        label={label}
        value={value}
        onChange={handleInputChange}
        errorText={errorText}
        state={state}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressInput;