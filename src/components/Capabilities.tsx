import React from 'react';
import type { FormData } from '../types';

interface Props {
  updateFormData: (data: Partial<FormData>) => void;
  formData: FormData;
}

export default function Capabilities({ updateFormData, formData }: Props) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-900">Capabilities</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="salesRepCount" className="block text-sm font-medium text-gray-700">
            Sales Representative Count
          </label>
          <input
            type="number"
            id="salesRepCount"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.salesRepCount || ''}
            onChange={(e) => updateFormData({ salesRepCount: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label htmlFor="technicianCount" className="block text-sm font-medium text-gray-700">
            Technician Count
          </label>
          <input
            type="number"
            id="technicianCount"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.technicianCount || ''}
            onChange={(e) => updateFormData({ technicianCount: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">
            Years of Water Filtration Experience
          </label>
          <input
            type="number"
            id="experienceYears"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.experienceYears || ''}
            onChange={(e) => updateFormData({ experienceYears: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label htmlFor="experienceBrands" className="block text-sm font-medium text-gray-700">
            Experience with Brands
          </label>
          <textarea
            id="experienceBrands"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.experienceBrands || ''}
            onChange={(e) => updateFormData({ experienceBrands: e.target.value })}
            placeholder="List the water treatment brands you have experience with"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="currentProductLines" className="block text-sm font-medium text-gray-700">
            Current Product Lines
          </label>
          <textarea
            id="currentProductLines"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.currentProductLines || ''}
            onChange={(e) => updateFormData({ currentProductLines: e.target.value })}
            placeholder="List your current water treatment product lines"
          />
        </div>
      </div>
    </div>
  );
}