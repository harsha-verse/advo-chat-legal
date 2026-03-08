import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Scale, Upload, FileText, ShieldCheck, Clock, CheckCircle,
  XCircle, User, Briefcase, MessageCircle, Star, AlertTriangle, Edit
} from 'lucide-react';

const VERIFICATION_DOCS = [
  { type: 'bar_certificate', label: 'Bar Council Enrollment Certificate', icon: Scale },
  { type: 'government_id', label: 'Government ID (Aadhaar / PAN)', icon: ShieldCheck },
  { type: 'professional_photo', label: 'Professional Photo', icon: User },
];

const LawyerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, profile, lawyerProfile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user]);

  const fetchDocuments = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('lawyer_documents')
      .select('*')
      .eq('user_id', user.id);
    if (data) setDocuments(data);
  };

  const handleUpload = async (docType: string, file: File) => {
    if (!user) return;
    setUploading(docType);
    try {
      const filePath = `${user.id}/${docType}_${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('lawyer-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('lawyer-documents')
        .getPublicUrl(filePath);

      await supabase.from('lawyer_documents').insert({
        user_id: user.id,
        document_type: docType,
        file_url: publicUrl,
        file_name: file.name,
      });

      // If all 3 docs uploaded, update status to under_review
      const updatedDocs = [...documents, { document_type: docType }];
      const uploadedTypes = new Set(updatedDocs.map(d => d.document_type));
      if (uploadedTypes.has('bar_certificate') && uploadedTypes.has('government_id') && uploadedTypes.has('professional_photo')) {
        await supabase.from('lawyer_profiles').update({ verification_status: 'under_review' }).eq('user_id', user.id);
        await refreshProfile();
      }

      toast({ title: 'Document Uploaded', description: `${file.name} uploaded successfully.` });
      fetchDocuments();
    } catch (err: any) {
      toast({ title: 'Upload Failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(null);
    }
  };

  const getDocStatus = (docType: string) => {
    const doc = documents.find(d => d.document_type === docType);
    if (!doc) return null;
    return doc;
  };

  const statusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: any }> = {
      pending: { label: 'Pending Verification', variant: 'outline', icon: Clock },
      under_review: { label: 'Under Review', variant: 'secondary', icon: Clock },
      verified: { label: 'Verified Lawyer', variant: 'default', icon: CheckCircle },
      rejected: { label: 'Rejected', variant: 'destructive', icon: XCircle },
    };
    const c = config[status] || config.pending;
    const Icon = c.icon;
    return <Badge variant={c.variant} className="text-sm"><Icon className="h-3 w-3 mr-1" />{c.label}</Badge>;
  };

  const verificationStatus = lawyerProfile?.verification_status || 'pending';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Lawyer Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {profile?.name || user?.email}</p>
          </div>
          {statusBadge(verificationStatus)}
        </div>
      </div>

      {/* Verification Banner */}
      {verificationStatus !== 'verified' && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">
                {verificationStatus === 'pending' && 'Complete Your Verification'}
                {verificationStatus === 'under_review' && 'Verification In Progress'}
                {verificationStatus === 'rejected' && 'Verification Rejected'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {verificationStatus === 'pending' && 'Upload all required documents below to start the verification process.'}
                {verificationStatus === 'under_review' && 'Your documents are being reviewed. You\'ll be notified once approved.'}
                {verificationStatus === 'rejected' && 'Please re-upload your documents or contact support.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="verification" className="space-y-4">
        <TabsList>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="cases">Case Requests</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
        </TabsList>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Document Verification
              </CardTitle>
              <CardDescription>Upload your credentials for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {VERIFICATION_DOCS.map(doc => {
                const existing = getDocStatus(doc.type);
                const Icon = doc.icon;
                return (
                  <div key={doc.type} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.label}</p>
                        {existing ? (
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">{existing.file_name}</span>
                            <Badge variant="outline" className={
                              existing.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' :
                              existing.status === 'rejected' ? 'bg-red-100 text-red-700 border-red-200' :
                              'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }>
                              {existing.status}
                            </Badge>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">Not uploaded</p>
                        )}
                      </div>
                    </div>
                    {(!existing || existing.status === 'rejected') && (
                      <div>
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          id={`upload-${doc.type}`}
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(doc.type, file);
                          }}
                        />
                        <Button size="sm" variant="outline" disabled={uploading === doc.type} asChild>
                          <label htmlFor={`upload-${doc.type}`} className="cursor-pointer">
                            <Upload className="h-3.5 w-3.5 mr-1" />
                            {uploading === doc.type ? 'Uploading...' : 'Upload'}
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground text-xs">Name</Label><p className="font-medium">{profile?.name}</p></div>
                <div><Label className="text-muted-foreground text-xs">Email</Label><p className="font-medium">{profile?.email}</p></div>
                <div><Label className="text-muted-foreground text-xs">Phone</Label><p className="font-medium">{profile?.phone || 'Not set'}</p></div>
                <div><Label className="text-muted-foreground text-xs">State</Label><p className="font-medium">{profile?.state || 'Not set'}</p></div>
                <div><Label className="text-muted-foreground text-xs">Bar Council Number</Label><p className="font-medium">{lawyerProfile?.bar_council_number}</p></div>
                <div><Label className="text-muted-foreground text-xs">Role</Label><p className="font-medium capitalize">{lawyerProfile?.role_type?.replace('_', ' ')}</p></div>
                <div><Label className="text-muted-foreground text-xs">Experience</Label><p className="font-medium">{lawyerProfile?.experience} years</p></div>
                <div><Label className="text-muted-foreground text-xs">Consultation Fee</Label><p className="font-medium">₹{lawyerProfile?.consultation_fee}/hr</p></div>
              </div>
              {lawyerProfile?.practice_areas && lawyerProfile.practice_areas.length > 0 && (
                <div>
                  <Label className="text-muted-foreground text-xs">Practice Areas</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {lawyerProfile.practice_areas.map(a => <Badge key={a} variant="outline">{a}</Badge>)}
                  </div>
                </div>
              )}
              {lawyerProfile?.rating !== undefined && lawyerProfile.rating > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{lawyerProfile.rating}</span>
                  <span className="text-sm text-muted-foreground">({lawyerProfile.total_reviews} reviews)</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cases Tab */}
        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Briefcase className="h-5 w-5" /> Case Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {verificationStatus !== 'verified' ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Scale className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Complete verification to receive case requests.</p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No case requests yet. They'll appear here when users reach out.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consultations Tab */}
        <TabsContent value="consultations">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><MessageCircle className="h-5 w-5" /> Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No consultations scheduled yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LawyerDashboard;
