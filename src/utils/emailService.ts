import type { FormData } from '../types';

const MAILGUN_DOMAIN = 'www.homewaterdealerform.com';
const API_KEY = 'd7799a8127b6d8b67483af0e3438d72b-72e4a3d5-23fa794e';
const API_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

// Authorized recipient for sandbox account
const AUTHORIZED_RECIPIENT = 'cmdtlabs@gmail.com';

interface EmailAttachment {
  filename: string;
  data: File;
}

interface MailgunError {
  message: string;
  status?: number;
}

export const sendEmail = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
  try {
    const emailData = new FormData();
    emailData.append('from', `Homewater Dealer Onboarding <mailgun@${MAILGUN_DOMAIN}>`);
    emailData.append('to', AUTHORIZED_RECIPIENT);
    emailData.append('subject', `New Dealer Application - ${formData.companyName}`);
    emailData.append('text', generateEmailContent(formData));

    // Append files if they exist
    const attachments: EmailAttachment[] = [];
    if (formData.w9) attachments.push({ filename: 'w9.pdf', data: formData.w9 });
    if (formData.insuranceDoc) attachments.push({ filename: 'insurance.pdf', data: formData.insuranceDoc });
    if (formData.legalDoc) attachments.push({ filename: 'legal.pdf', data: formData.legalDoc });
    if (formData.signedAgreement) attachments.push({ filename: 'agreement.pdf', data: formData.signedAgreement });
    if (formData.coupaDoc) attachments.push({ filename: 'coupa.pdf', data: formData.coupaDoc });

    attachments.forEach(({ filename, data }) => {
      emailData.append('attachment', data, filename);
    });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`api:${API_KEY}`)}`,
      },
      body: emailData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = responseData as MailgunError;
      
      if (error.message?.includes('Please activate your Mailgun account')) {
        return {
          success: false,
          message: 'Email service requires activation. Please contact support.',
        };
      }
      
      if (error.message?.includes('Free accounts are for test purposes only')) {
        return {
          success: false,
          message: 'Form submitted successfully, but email notification is currently in test mode.',
        };
      }

      throw new Error(error.message || 'Failed to send email');
    }

    return {
      success: true,
      message: 'Application submitted successfully! We will review and contact you shortly.',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Your application was saved but we encountered an issue sending the confirmation email. Our team will contact you soon.',
    };
  }
};

const generateEmailContent = (formData: FormData): string => {
  return `
New Dealer Application Received

Company Information:
-------------------
Company Name: ${formData.companyName}
Contact Name: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}
Website: ${formData.website || 'Not provided'}
Business Address: ${formData.businessAddress}

Business Details:
----------------
Structure: ${formData.businessStructure}
Years Active: ${formData.yearsActive}
Employee Count: ${formData.employeeCount}
Service Area: ${formData.serviceArea}
Services: ${formData.services?.join(', ')}

Banking Information:
------------------
Bank Name: ${formData.bankName}
Account Number: ${formData.accountNumber}
Routing Number: ${formData.routingNumber}

Capabilities:
------------
Sales Rep Count: ${formData.salesRepCount}
Technician Count: ${formData.technicianCount}
Water Filtration Experience: ${formData.experienceYears} years
Experience with Brands: ${formData.experienceBrands}
Current Product Lines: ${formData.currentProductLines}

Additional Information:
----------------------
License Number: ${formData.licenseNumber || 'Not provided'}
Trade Certifications: ${formData.tradeCerts || 'Not provided'}

Files Attached:
--------------
${formData.w9 ? '- W9 Form\n' : ''}${formData.insuranceDoc ? '- Insurance Document\n' : ''}${formData.legalDoc ? '- Legal Document\n' : ''}${formData.signedAgreement ? '- Signed Agreement\n' : ''}${formData.coupaDoc ? '- Coupa Setup Document' : ''}

Please review the application and contact the dealer for any additional information.
`;
};