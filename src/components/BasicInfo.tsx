import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormData } from '../types';

interface Props {
  updateFormData: (data: Partial<FormData>) => void;
  formData: FormData;
}

export default function BasicInfo({ updateFormData, formData }: Props) {
  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName || ''}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input
              id="contactName"
              value={formData.contactName || ''}
              onChange={(e) => updateFormData({ contactName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email || ''}
              onChange={(e) => updateFormData({ email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              value={formData.phone || ''}
              onChange={(e) => updateFormData({ phone: e.target.value })}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <Textarea
              id="businessAddress"
              rows={3}
              value={formData.businessAddress || ''}
              onChange={(e) => updateFormData({ businessAddress: e.target.value })}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              type="url"
              id="website"
              value={formData.website || ''}
              onChange={(e) => updateFormData({ website: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}