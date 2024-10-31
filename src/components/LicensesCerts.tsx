import React from 'react';
import type { FormData } from '../types';

interface Props {
  updateFormData: (data: Partial<FormData>) => void;
  formData: FormData;
}

export default function LicensesCerts({ updateFormData, formData }: Props) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-900">Licenses & Certifications</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
            License Number
          </label>
          <input
            type="text"
            id="licenseNumber"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.licenseNumber || ''}
            onChange={(e) => updateFormData({ licenseNumber: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="tradeCerts" className="block text-sm font-medium text-gray-700">
            Trade Certifications
          </label>
          <textarea
            id="tradeCerts"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.tradeCerts || ''}
            onChange={(e) => updateFormData({ tradeCerts: e.target.value })}
            placeholder="List any relevant trade certifications"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="insuranceDoc" className="block text-sm font-medium text-gray-700">
            Insurance Document (PDF)
          </label>
          <input
            type="file"
            id="insuranceDoc"
            accept=".pdf"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                updateFormData({ insuranceDoc: file });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}