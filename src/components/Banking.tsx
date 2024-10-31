import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormData } from '../types';

interface Props {
  updateFormData: (data: Partial<FormData>) => void;
  formData: FormData;
}

export default function Banking({ updateFormData, formData }: Props) {
  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle>Banking Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              type="text"
              id="bankName"
              value={formData.bankName || ''}
              onChange={(e) => updateFormData({ bankName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              type="text"
              id="accountNumber"
              value={formData.accountNumber || ''}
              onChange={(e) => updateFormData({ accountNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="routingNumber">Routing Number</Label>
            <Input
              type="text"
              id="routingNumber"
              value={formData.routingNumber || ''}
              onChange={(e) => updateFormData({ routingNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="w9">
              W9 Upload (PDF) - 
              <a 
                href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                Download Form
              </a>
            </Label>
            <Input
              type="file"
              id="w9"
              accept=".pdf"
              className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  updateFormData({ w9: file });
                }
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}