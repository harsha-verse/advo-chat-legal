import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { BadgeCheck, Upload, FileText, ShieldCheck } from 'lucide-react';

type VerificationStatus = 'not_verified' | 'under_review' | 'verified';

const statusConfig: Record<VerificationStatus, { label: string; color: string }> = {
  not_verified: { label: 'Not Verified', color: 'bg-red-100 text-red-700 border-red-200' },
  under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  verified: { label: 'Verified', color: 'bg-green-100 text-green-700 border-green-200' },
};

const VerificationSection = () => {
  const { user } = useAuth();
  const [idStatus, setIdStatus] = useState<VerificationStatus>(user?.verified ? 'verified' : 'not_verified');
  const [addressStatus, setAddressStatus] = useState<VerificationStatus>('not_verified');

  const handleUpload = (type: 'id' | 'address') => {
    const setter = type === 'id' ? setIdStatus : setAddressStatus;
    setter('under_review');
    toast({ title: 'Document Uploaded', description: `Your ${type === 'id' ? 'Government ID' : 'Address Proof'} has been submitted for review.` });
  };

  const DocCard = ({ title, icon: Icon, status, onUpload }: { title: string; icon: any; status: VerificationStatus; onUpload: () => void }) => {
    const config = statusConfig[status];
    return (
      <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{title}</p>
            <Badge variant="outline" className={`text-xs mt-0.5 ${config.color}`}>
              {config.label}
            </Badge>
          </div>
        </div>
        {status === 'not_verified' && (
          <Button size="sm" variant="outline" onClick={onUpload}>
            <Upload className="h-3.5 w-3.5 mr-1" /> Upload
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <BadgeCheck className="h-4 w-4" /> Identity Verification
        </CardTitle>
        <p className="text-sm text-muted-foreground">Verify your identity for secure lawyer consultations and legal authenticity.</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <DocCard title="Government ID (Aadhaar / PAN / DL)" icon={FileText} status={idStatus} onUpload={() => handleUpload('id')} />
        <DocCard title="Address Proof" icon={ShieldCheck} status={addressStatus} onUpload={() => handleUpload('address')} />

        <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> Verification is optional but recommended for booking lawyer consultations. Documents are securely stored and only used for verification purposes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationSection;
