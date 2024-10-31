export interface FormData {
  // Basic Info
  companyName?: string;
  contactName?: string;
  businessAddress?: string;
  email?: string;
  phone?: string;
  website?: string;

  // Business Details
  businessStructure?: string;
  yearsActive?: number;
  employeeCount?: number;
  services?: string[];
  serviceArea?: string;

  // Licenses & Certs
  licenseNumber?: string;
  tradeCerts?: string;
  insuranceDoc?: File;

  // Capabilities
  salesRepCount?: number;
  technicianCount?: number;
  experienceYears?: number;
  experienceBrands?: string;
  currentProductLines?: string;

  // Banking
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  w9?: File;

  // Agreements
  legalDoc?: File;
  signedAgreement?: File;
}