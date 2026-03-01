import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Building,
  FileCheck,
  ClipboardList,
  Users,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

const msmeCards = [
  {
    title: 'MSME Registration Guidance',
    description: 'Step-by-step guide to register your MSME on the Udyam portal.',
    icon: Building,
    items: [
      'Visit the Udyam Registration Portal (udyamregistration.gov.in)',
      'Enter Aadhaar number and validate with OTP',
      'Fill enterprise details: name, type, address',
      'Select NIC codes for your business activity',
      'Submit — no fees, no documents needed',
      'Download your Udyam Registration Certificate',
    ],
    badge: 'Free Registration',
  },
  {
    title: 'GST Basics',
    description: 'Understand GST registration, filing, and compliance essentials for MSMEs.',
    icon: FileCheck,
    items: [
      'GST registration is mandatory if turnover exceeds ₹40 lakh (goods) or ₹20 lakh (services)',
      'Composition scheme available for turnover up to ₹1.5 crore — pay 1-6% flat tax',
      'File GSTR-1 (outward supplies) by 11th of each month',
      'File GSTR-3B (summary return) by 20th of each month',
      'Input Tax Credit (ITC) can be claimed on business purchases',
      'Quarterly filing option available for small taxpayers under QRMP scheme',
    ],
    badge: 'Tax Compliance',
  },
  {
    title: 'Vendor Agreement Templates',
    description: 'Ready-to-use vendor and supplier agreement templates for your business.',
    icon: ClipboardList,
    items: [
      'Standard Vendor Supply Agreement',
      'Service Level Agreement (SLA)',
      'Purchase Order Template',
      'Raw Material Supply Contract',
      'Annual Maintenance Contract (AMC)',
      'Terms & Conditions for vendor onboarding',
    ],
    badge: 'Templates',
    linkTo: '/templates',
  },
  {
    title: 'Partnership Deed Templates',
    description: 'Legal partnership deed templates compliant with Indian Partnership Act.',
    icon: Users,
    items: [
      'General Partnership Deed',
      'Limited Liability Partnership (LLP) Agreement',
      'Profit Sharing Agreement',
      'Silent Partner / Sleeping Partner Agreement',
      'Partnership Dissolution Deed',
      'Amendment to existing Partnership Deed',
    ],
    badge: 'Templates',
    linkTo: '/templates',
  },
  {
    title: 'HR Policy Templates',
    description: 'Essential HR policies and employment documents for small businesses.',
    icon: Users,
    items: [
      'Employee Handbook Template',
      'Leave Policy Document',
      'Anti-Harassment Policy (POSH Act compliant)',
      'Offer Letter & Appointment Letter',
      'Employee Code of Conduct',
      'Exit / Full & Final Settlement Format',
    ],
    badge: 'HR & Compliance',
  },
  {
    title: 'Compliance Checklist',
    description: 'Comprehensive compliance checklist to keep your MSME legally sound.',
    icon: ShieldCheck,
    items: [
      'Udyam Registration — valid & up to date',
      'GST Registration & Regular Filing',
      'Shop & Establishment Act License',
      'FSSAI License (if food-related)',
      'PF & ESI registration (if 10+ employees)',
      'Professional Tax Registration',
      'Trade License from local municipality',
      'Fire Safety NOC (if applicable)',
      'Pollution Control Board consent (manufacturing)',
      'Annual ROC filing (for companies & LLPs)',
    ],
    badge: 'Must-Do',
  },
];

const MSMESupport: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">MSME Support</h1>
          <p className="text-muted-foreground">
            Everything micro, small, and medium enterprises need — registration, compliance, templates, and expert help.
          </p>
        </div>
        <Link to="/consultants">
          <Button className="gap-2">
            <HelpCircle className="h-4 w-4" />
            Ask for Help
          </Button>
        </Link>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {msmeCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2.5 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="shrink-0">{card.badge}</Badge>
                </div>
                <CardDescription className="mt-2">{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-2 mb-4">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                {card.linkTo && (
                  <Link to={card.linkTo}>
                    <Button variant="outline" size="sm" className="gap-2 w-full">
                      <ExternalLink className="h-4 w-4" />
                      View Templates
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Need personalized MSME guidance?</h3>
              <p className="text-muted-foreground text-sm">
                Connect with a legal consultant who specializes in MSME compliance, registration, and business law.
              </p>
            </div>
            <Link to="/consultants">
              <Button>Connect with Consultant</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MSMESupport;
