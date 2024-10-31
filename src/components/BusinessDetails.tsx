import React from 'react';
import type { FormData } from '../types';

interface Props {
  updateFormData: (data: Partial<FormData>) => void;
  formData: FormData;
}

export default function BusinessDetails({ updateFormData, formData }: Props) {
  const businessStructures = ['LLC', 'Corporation', 'Sole Proprietorship', 'Other'];
  const serviceOptions = ['Plumbing', 'HVAC', 'Water Treatment', 'Other'];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-900">Business Details</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="businessStructure" className="block text-sm font-medium text-gray-700">
            Business Structure
          </label>
          <select
            id="businessStructure"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.businessStructure || ''}
            onChange={(e) => updateFormData({ businessStructure: e.target.value })}
          >
            <option value="">Select structure</option>
            {businessStructures.map((structure) => (
              <option key={structure} value={structure}>
                {structure}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="yearsActive" className="block text-sm font-medium text-gray-700">
            Years Active
          </label>
          <input
            type="number"
            id="yearsActive"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.yearsActive || ''}
            onChange={(e) => updateFormData({ yearsActive: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700">
            Employee Count
          </label>
          <input
            type="number"
            id="employeeCount"
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.employeeCount || ''}
            onChange={(e) => updateFormData({ employeeCount: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Services</label>
          <div className="mt-2 space-y-2">
            {serviceOptions.map((service) => (
              <div key={service} className="flex items-center">
                <input
                  type="checkbox"
                  id={`service-${service}`}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.services?.includes(service) || false}
                  onChange={(e) => {
                    const currentServices = formData.services || [];
                    const updatedServices = e.target.checked
                      ? [...currentServices, service]
                      : currentServices.filter((s) => s !== service);
                    updateFormData({ services: updatedServices });
                  }}
                />
                <label htmlFor={`service-${service}`} className="ml-2 text-sm text-gray-700">
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700">
            Service Area
          </label>
          <textarea
            id="serviceArea"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.serviceArea || ''}
            onChange={(e) => updateFormData({ serviceArea: e.target.value })}
            placeholder="Describe your service area (e.g., counties, cities, regions)"
          />
        </div>
      </div>
    </div>
  );
}