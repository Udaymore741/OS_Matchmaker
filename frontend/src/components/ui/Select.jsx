import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

const Select = ({
  options,
  label,
  value,
  onChange,
  error,
  disabled,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`
            block appearance-none bg-white dark:bg-gray-800
            border border-gray-300 dark:border-gray-600
            rounded-md
            px-3 py-2
            pr-8
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${fullWidth ? 'w-full' : ''}
            ${className}
          `}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Select; 