import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import BasicInfo from './components/BasicInfo';
import BusinessDetails from './components/BusinessDetails';
import LicensesCerts from './components/LicensesCerts';
import Capabilities from './components/Capabilities';
import Banking from './components/Banking';
import Agreements from './components/Agreements';
import SuccessMessage from './components/SuccessMessage';
import ProgressBar from './components/ProgressBar';
import { sendEmail } from './utils/emailService';
import type { FormData } from './types';

type FormSection = 
  | 'basicInfo'
  | 'businessDetails'
  | 'licensesCerts'
  | 'capabilities'
  | 'banking'
  | 'agreements';

const initialFormData: FormData = {
  companyName: '',
  contactName: '',
  businessAddress: '',
  email: '',
  phone: '',
  website: '',
  businessStructure: '',
  yearsActive: 0,
  employeeCount: 0,
  services: [],
  serviceArea: '',
  salesRepCount: 0,
  technicianCount: 0,
  experienceYears: 0,
  experienceBrands: '',
  currentProductLines: '',
  achDetails: '',
  licenseNumber: '',
  tradeCerts: ''
};

export default function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentSection, setCurrentSection] = useState<FormSection>('basicInfo');
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections: FormSection[] = [
    'basicInfo',
    'businessDetails',
    'licensesCerts',
    'capabilities',
    'banking',
    'agreements'
  ];

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await sendEmail(formData);
      setSubmitStatus(result);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'There was an error submitting the form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'basicInfo':
        return <BasicInfo formData={formData} updateFormData={updateFormData} />;
      case 'businessDetails':
        return <BusinessDetails formData={formData} updateFormData={updateFormData} />;
      case 'licensesCerts':
        return <LicensesCerts formData={formData} updateFormData={updateFormData} />;
      case 'capabilities':
        return <Capabilities formData={formData} updateFormData={updateFormData} />;
      case 'banking':
        return <Banking formData={formData} updateFormData={updateFormData} />;
      case 'agreements':
        return <Agreements formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  if (submitStatus?.success) {
    return <SuccessMessage success={true} message={submitStatus.message} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Homewater Dealer Onboarding Form
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Complete this form to become an authorized Homewater Dealer. All required fields must be filled accurately.
        </p>

        <ProgressBar currentSection={currentSection} sections={sections} />

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderSection()}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                onClick={handlePrevious}
                variant="outline"
                className={currentSection === 'basicInfo' ? 'invisible' : ''}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentSection === 'agreements' ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
      {submitStatus && !submitStatus.success && (
        <SuccessMessage success={false} message={submitStatus.message} />
      )}
    </div>
  );
}