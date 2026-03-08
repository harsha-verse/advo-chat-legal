import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Clock, Eye, Scale, Users, ShieldCheck } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { isAdmin, isLoading } = useAuth();
  const { toast } = useToast();
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [documents, setDocuments] = useState<Record<string, any[]>>({});
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (isAdmin) fetchLawyers();
  }, [isAdmin]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  async function fetchLawyers() {
    // Fetch all lawyer profiles (admin RLS policy)
    const { data } = await supabase.from('lawyer_profiles').select('*');
    if (data) {
      // Fetch profiles for names
      const userIds = data.map(l => l.user_id);
      const { data: profiles } = await supabase.from('profiles').select('*');
      const profileMap: Record<string, any> = {};
      profiles?.forEach(p => { profileMap[p.id] = p; });

      const enriched = data.map(l => ({ ...l, profile: profileMap[l.user_id] }));
      setLawyers(enriched);

      // Fetch all docs
      const { data: docs } = await supabase.from('lawyer_documents').select('*');
      const docMap: Record<string, any[]> = {};
      docs?.forEach(d => {
        if (!docMap[d.user_id]) docMap[d.user_id] = [];
        docMap[d.user_id].push(d);
      });
      setDocuments(docMap);
    }
  }

  const handleApprove = async (userId: string) => {
    await supabase.from('lawyer_profiles').update({
      verification_status: 'verified',
      verified_at: new Date().toISOString(),
    }).eq('user_id', userId);

    // Approve all docs
    await supabase.from('lawyer_documents').update({ status: 'approved', admin_notes: adminNotes || null }).eq('user_id', userId);

    toast({ title: 'Lawyer Approved', description: 'The lawyer has been verified successfully.' });
    setSelectedLawyer(null);
    setAdminNotes('');
    fetchLawyers();
  };

  const handleReject = async (userId: string) => {
    await supabase.from('lawyer_profiles').update({
      verification_status: 'rejected',
    }).eq('user_id', userId);

    await supabase.from('lawyer_documents').update({ status: 'rejected', admin_notes: adminNotes || 'Rejected by admin' }).eq('user_id', userId);

    toast({ title: 'Lawyer Rejected', description: 'The application has been rejected.' });
    setSelectedLawyer(null);
    setAdminNotes('');
    fetchLawyers();
  };

  const filtered = filter === 'all' ? lawyers : lawyers.filter(l => l.verification_status === filter);

  const stats = {
    total: lawyers.length,
    pending: lawyers.filter(l => l.verification_status === 'pending').length,
    under_review: lawyers.filter(l => l.verification_status === 'under_review').length,
    verified: lawyers.filter(l => l.verification_status === 'verified').length,
    rejected: lawyers.filter(l => l.verification_status === 'rejected').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage lawyer verifications and platform oversight</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: Users, color: 'bg-primary/10 text-primary' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Under Review', value: stats.under_review, icon: Eye, color: 'bg-blue-100 text-blue-700' },
          { label: 'Verified', value: stats.verified, icon: CheckCircle, color: 'bg-green-100 text-green-700' },
          { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'bg-red-100 text-red-700' },
        ].map(s => (
          <Card key={s.label} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter(s.label === 'Total' ? 'all' : s.label.toLowerCase().replace(' ', '_'))}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lawyer List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="h-5 w-5" /> Lawyer Applications
            <Badge variant="outline" className="ml-2">{filtered.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No applications found.</p>
          ) : (
            filtered.map(lawyer => (
              <div key={lawyer.id} className={`p-4 rounded-lg border transition-colors ${selectedLawyer === lawyer.user_id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{lawyer.profile?.name || 'Unknown'}</p>
                      <p className="text-xs text-muted-foreground">{lawyer.profile?.email} • {lawyer.bar_council_number}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">{lawyer.role_type?.replace('_', ' ')}</Badge>
                        <span className="text-xs text-muted-foreground">{lawyer.experience}y exp</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      lawyer.verification_status === 'verified' ? 'default' :
                      lawyer.verification_status === 'rejected' ? 'destructive' : 'secondary'
                    } className="capitalize">
                      {lawyer.verification_status?.replace('_', ' ')}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => setSelectedLawyer(selectedLawyer === lawyer.user_id ? null : lawyer.user_id)}>
                      <Eye className="h-3.5 w-3.5 mr-1" /> Review
                    </Button>
                  </div>
                </div>

                {/* Expanded Review */}
                {selectedLawyer === lawyer.user_id && (
                  <div className="mt-4 pt-4 border-t space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div><span className="text-muted-foreground">State:</span> <span className="font-medium">{lawyer.profile?.state}</span></div>
                      <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{lawyer.profile?.phone || 'N/A'}</span></div>
                      <div><span className="text-muted-foreground">Fee:</span> <span className="font-medium">₹{lawyer.consultation_fee}/hr</span></div>
                      <div><span className="text-muted-foreground">Started:</span> <span className="font-medium">{lawyer.year_of_practice}</span></div>
                    </div>

                    {lawyer.practice_areas?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {lawyer.practice_areas.map((a: string) => <Badge key={a} variant="outline" className="text-xs">{a}</Badge>)}
                      </div>
                    )}

                    {/* Documents */}
                    <div>
                      <p className="text-sm font-medium mb-2">Uploaded Documents</p>
                      {documents[lawyer.user_id]?.length ? (
                        <div className="space-y-2">
                          {documents[lawyer.user_id].map((doc: any) => (
                            <div key={doc.id} className="flex items-center justify-between p-2 rounded border bg-card">
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <span className="text-sm">{doc.document_type.replace('_', ' ')}</span>
                                <span className="text-xs text-muted-foreground">— {doc.file_name}</span>
                              </div>
                              <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="ghost"><Eye className="h-3.5 w-3.5" /></Button>
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
                      )}
                    </div>

                    {/* Admin Actions */}
                    {(lawyer.verification_status === 'under_review' || lawyer.verification_status === 'pending') && (
                      <div className="space-y-3">
                        <Textarea placeholder="Admin notes (optional)" value={adminNotes} onChange={e => setAdminNotes(e.target.value)} />
                        <div className="flex gap-2">
                          <Button onClick={() => handleApprove(lawyer.user_id)} className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button variant="destructive" onClick={() => handleReject(lawyer.user_id)}>
                            <XCircle className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
