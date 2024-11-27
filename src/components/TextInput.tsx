import React, { useState, ChangeEvent } from 'react';

interface TextInputProps {
  label: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number' | 'password' | 'email';
  state?: 'default' | 'focused' | 'error';
  isValid?: boolean;
  isDisabled?: boolean;
  isAutocomplete?: boolean;
  icon?: React.ReactNode;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  helperText,
  errorText,
  value,
  onChange,
  type = 'text',
  state = 'default',
  isValid = false,
  isDisabled = false,
  isAutocomplete = false,
  icon,
  onIncrement,
  onDecrement
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputClassName = (): string => {
    let baseClass = "w-full h-[58px] px-4 py-2 rounded-lg border flex-col justify-start items-start gap-2.5 flex";
    
    if (state === 'focused' || isFocused) return `${baseClass} border-[#5570f1]`;
    if (state === 'error') return `${baseClass} border-[#f57e76]`;
    if (isValid) return `${baseClass} border-[#32936f]`;
    if (isDisabled) return `${baseClass} bg-[#f2f4f5] border-[#dce2e5]`;
    
    return `${baseClass} border-[#cfd2d4]`;
  };

  const getLabelClassName = (): string => {
    let baseClass = "text-left text-base font-semibold font-['Inter'] mb-1";
    
    if (state === 'focused' || isFocused) return `${baseClass} text-[#5570f1]`;
    if (state === 'error') return `${baseClass} text-[#f57e76]`;
    if (isValid) return `${baseClass} text-[#32936f]`;
    
    return `${baseClass} text-[#5e6366]`;
  };

  const getInputTextClassName = (): string => {
    if (isDisabled) return "text-[#5e6366] opacity-70";
    if (value === '') return "text-[#aaaeb1]";
    return "text-[#5e6366]";
  };

  return (
    <div className="w-full flex-col justify-start items-start px-2 inline-flex">
      <label className={getLabelClassName()}>{label}</label>
      <div className={getInputClassName()}>
        <div className="self-stretch grow shrink basis-0 justify-start items-center gap-4 inline-flex">
          {icon && <div className="w-6 h-6 relative">{icon}</div>}
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={isDisabled}
            className={`w-full bg-transparent text-base font-normal font-['Inter'] ${getInputTextClassName()} outline-none`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {(type === 'number' && !isDisabled) && (
            <div className="h-[42px] flex-col justify-start items-start gap-[3px] inline-flex">
              <button type="button" onClick={onIncrement} className="grow shrink basis-0 px-3.5 py-px bg-[#dce2e5] rounded-tl rounded-tr">+</button>
              <button type="button" onClick={onDecrement} className="grow shrink basis-0 px-3.5 py-px bg-[#dce2e5] rounded-bl rounded-br">-</button>
            </div>
          )}
        </div>
      </div>
      {(helperText || errorText) && (
        <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
          <div className={`text-sm font-normal font-['Inter'] ${state === 'error' ? 'text-[#f57e76]' : 'text-[#aaaeb1]'}`}>
            {state === 'error' ? errorText : helperText}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInput;