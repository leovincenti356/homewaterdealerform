import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormData } from '../types';

interface Props {
  updateFormData: (data: Partial<FormData>) => void;
  formData: FormData;
}

export default function Agreements({ updateFormData, formData }: Props) {
  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle>Terms & Conditions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-sm">
          <p className="text-gray-700 leading-relaxed">
            By submitting this form, I confirm that:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>All information provided in this application is true, accurate, and complete to the best of my knowledge.</li>
            <li>I understand that any false or misleading information may result in the rejection of this application or termination of any subsequent agreements.</li>
            <li>I authorize Homewater to verify any information provided in this application.</li>
            <li>I consent to Homewater contacting me via email, phone, or mail regarding their products, services, and this application.</li>
            <li>I acknowledge that submission of this application does not guarantee acceptance into the Homewater Dealer program.</li>
          </ul>
          <p className="mt-6 text-sm text-gray-500">
            Your privacy is important to us. We will handle all information in accordance with applicable privacy laws and our privacy policy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}