import React from 'react';
import { Developer } from '../../types';

interface DeveloperSelectProps {
  label?: string;
  developers: Developer[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  exclude?: string[];
}

export function DeveloperSelect({
  label,
  developers,
  value,
  onChange,
  placeholder,
  required,
  exclude = [],
}: DeveloperSelectProps) {
  const filteredDevelopers = developers.filter(dev => !exclude.includes(dev.id));

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{placeholder || 'Select developer'}</option>
        {filteredDevelopers.map((dev) => (
          <option key={dev.id} value={dev.id}>
            {dev.name} ({dev.reviewCount} reviews)
          </option>
        ))}
      </select>
    </div>
  );
}