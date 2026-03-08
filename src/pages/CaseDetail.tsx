import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft, User, MapPin, Calendar, FileText, MessageCircle,
  Send, Upload, Download, StickyNote, CheckCircle, Clock, AlertTriangle, X
} from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'accepted', label: 'Accepted', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'consultation_scheduled', label: 'Consultation Scheduled', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  { value: 'under_review', label: 'Under Review', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'waiting_for_client', label: 'Waiting for Client', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { value: 'closed', label: 'Closed', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'declined', label: 'Declined', color: 'bg-red-100 text-red-800 border-red-200' },
];

const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [caseData, setCaseData] = useState<any>(null);
  const [clientProfile, setClientProfile] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const isLawyer = profile?.user_type === 'lawyer';

  useEffect(() => {
    if (id && user) fetchAll();
  }, [id, user]);

  useEffect(() => {
    if (!id) return;
    const channel = supabase
      .channel(`case-messages-${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'case_messages', filter: `case_id=eq.${id}` },
        (payload) => { setMessages(prev => [...prev, payload.new]); }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchAll = async () => {
    setLoading(true);
    const [caseRes, msgRes, noteRes, docRes] = await Promise.all([
      supabase.from('cases').select('*').eq('id', id!).single(),
      supabase.from('case_messages').select('*').eq('case_id', id!).order('created_at', { ascending: true }),
      supabase.from('case_notes').select('*').eq('case_id', id!).order('created_at', { ascending: false }),
      supabase.from('case_documents').select('*').eq('case_id', id!).order('created_at', { ascending: false }),
    ]);

    if (caseRes.data) {
      setCaseData(caseRes.data);
      // Fetch client profile
      const { data: cp } = await supabase.from('profiles').select('*').eq('id', caseRes.data.client_id).single();
      if (cp) setClientProfile(cp);
    }
    if (msgRes.data) setMessages(msgRes.data);
    if (noteRes.data) setNotes(noteRes.data);
    if (docRes.data) setDocuments(docRes.data);
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!caseData) return;
    const updates: any = { status: newStatus, updated_at: new Date().toISOString() };
    if (newStatus === 'accepted') updates.accepted_at = new Date().toISOString();
    if (newStatus === 'closed') updates.closed_at = new Date().toISOString();
    if (newStatus === 'accepted' && !caseData.lawyer_id) updates.lawyer_id = user!.id;

    const { error } = await supabase.from('cases').update(updates).eq('id', caseData.id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setCaseData({ ...caseData, ...updates });
      // Notify client
      await supabase.from('notifications').insert({
        user_id: caseData.client_id,
        title: `Case ${newStatus === 'accepted' ? 'Accepted' : 'Updated'}`,
        message: `Your case "${caseData.title}" status changed to ${newStatus}.`,
        type: 'case_update',
        related_case_id: caseData.id,
      });
      toast({ title: 'Status Updated' });
    }
  };

  const sendMessage = async (fileData?: { file_url: string; file_name: string; file_type: string }) => {
    if (!fileData && !newMessage.trim()) return;
    if (!caseData) return;
    const insert: any = {
      case_id: caseData.id,
      sender_id: user!.id,
      message: fileData ? `📎 ${fileData.file_name}` : newMessage.trim(),
    };
    if (fileData) {
      insert.file_url = fileData.file_url;
      insert.file_name = fileData.file_name;
      insert.file_type = fileData.file_type;
    }
    const { error } = await supabase.from('case_messages').insert(insert);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      if (!fileData) setNewMessage('');
      const recipientId = isLawyer ? caseData.client_id : caseData.lawyer_id;
      if (recipientId) {
        await supabase.from('notifications').insert({
          user_id: recipientId,
          title: 'New Message',
          message: `New message in case "${caseData.title}"`,
          type: 'message',
          related_case_id: caseData.id,
        });
      }
    }
  };

  const handleChatFileUpload = async (file: File) => {
    if (!caseData || !user) return;
    try {
      const filePath = `${caseData.id}/chat/${user.id}/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage.from('case-documents').upload(filePath, file);
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage.from('case-documents').getPublicUrl(filePath);
      await sendMessage({ file_url: urlData.publicUrl, file_name: file.name, file_type: file.type });
    } catch (err: any) {
      toast({ title: 'Upload Failed', description: err.message, variant: 'destructive' });
    }
  };

  // Mark messages as read
  useEffect(() => {
    if (!messages.length || !user || !caseData) return;
    const unread = messages.filter(m => m.sender_id !== user.id && !m.read_at);
    if (unread.length > 0) {
      const ids = unread.map(m => m.id);
      supabase.from('case_messages').update({ read_at: new Date().toISOString() }).in('id', ids).then(() => {});
    }
  }, [messages, user]);

  const addNote = async () => {
    if (!newNote.trim() || !caseData) return;
    const { data, error } = await supabase.from('case_notes').insert({
      case_id: caseData.id,
      lawyer_id: user!.id,
      content: newNote.trim(),
    }).select().single();
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setNotes(prev => [data, ...prev]);
      setNewNote('');
      toast({ title: 'Note Added' });
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!caseData || !user) return;
    setUploading(true);
    try {
      const filePath = `${caseData.id}/${user.id}/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage.from('case-documents').upload(filePath, file);
      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage.from('case-documents').getPublicUrl(filePath);

      const { data, error } = await supabase.from('case_documents').insert({
        case_id: caseData.id,
        uploaded_by: user.id,
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_type: file.type,
      }).select().single();

      if (error) throw error;
      setDocuments(prev => [data, ...prev]);
      toast({ title: 'Document Uploaded' });
    } catch (err: any) {
      toast({ title: 'Upload Failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const getStatusConfig = (status: string) => STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];

  if (loading) {
    return <div className="p-6 flex items-center justify-center min-h-[400px]"><Clock className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  if (!caseData) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
        <p>Case not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const statusConfig = getStatusConfig(caseData.status);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{caseData.title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="outline">{caseData.case_type}</Badge>
              <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(caseData.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        {isLawyer && caseData.status !== 'closed' && caseData.status !== 'declined' && (
          <Select value={caseData.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.filter(s => s.value !== 'declined').map(s => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
              <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
              {isLawyer && <TabsTrigger value="notes">Notes ({notes.length})</TabsTrigger>}
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details">
              <Card>
                <CardHeader><CardTitle className="text-lg">Case Description</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-foreground whitespace-pre-wrap">{caseData.description}</p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><Label className="text-muted-foreground text-xs">Priority</Label><p className="font-medium capitalize">{caseData.priority}</p></div>
                    <div><Label className="text-muted-foreground text-xs">Preferred Consultation</Label><p className="font-medium capitalize">{caseData.preferred_consultation}</p></div>
                    {caseData.accepted_at && <div><Label className="text-muted-foreground text-xs">Accepted On</Label><p className="font-medium">{new Date(caseData.accepted_at).toLocaleDateString()}</p></div>}
                    {caseData.closed_at && <div><Label className="text-muted-foreground text-xs">Closed On</Label><p className="font-medium">{new Date(caseData.closed_at).toLocaleDateString()}</p></div>}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card className="flex flex-col" style={{ height: '500px' }}>
                <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><MessageCircle className="h-5 w-5" />Communication</CardTitle></CardHeader>
                <CardContent className="flex-1 flex flex-col overflow-hidden">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-3 py-2">
                      {messages.length === 0 && (
                        <p className="text-center text-muted-foreground text-sm py-8">No messages yet. Start the conversation.</p>
                      )}
                      {messages.map(msg => {
                        const isMe = msg.sender_id === user?.id;
                        return (
                          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-lg px-4 py-2 ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                              {msg.file_url ? (
                                <a href={msg.file_url} target="_blank" rel="noopener noreferrer"
                                  className={`text-sm underline flex items-center gap-1 ${isMe ? 'text-primary-foreground' : 'text-primary'}`}>
                                  📎 {msg.file_name || 'File'}
                                </a>
                              ) : (
                                <p className="text-sm">{msg.message}</p>
                              )}
                              <div className={`flex items-center gap-1 mt-1 ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                <span className="text-xs">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                {isMe && msg.read_at && <CheckCircle className="h-3 w-3" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  {caseData.status !== 'closed' && caseData.status !== 'declined' && (
                    <div className="flex gap-2 pt-3 border-t border-border mt-2">
                      <Input type="file" className="hidden" id="chat-file-upload"
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleChatFileUpload(f); }} />
                      <Button size="icon" variant="ghost" asChild>
                        <label htmlFor="chat-file-upload" className="cursor-pointer"><Upload className="h-4 w-4" /></label>
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                        className="flex-1"
                      />
                      <Button size="icon" onClick={() => sendMessage()} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5" />Documents</CardTitle>
                    {caseData.status !== 'closed' && (
                      <div>
                        <Input type="file" className="hidden" id="case-doc-upload"
                          onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }} />
                        <Button size="sm" variant="outline" disabled={uploading} asChild>
                          <label htmlFor="case-doc-upload" className="cursor-pointer">
                            <Upload className="h-3.5 w-3.5 mr-1" />{uploading ? 'Uploading...' : 'Upload'}
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {documents.length === 0 ? (
                    <p className="text-center text-muted-foreground text-sm py-8">No documents uploaded.</p>
                  ) : (
                    <div className="space-y-2">
                      {documents.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{doc.file_name}</p>
                              <p className="text-xs text-muted-foreground">{new Date(doc.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" asChild>
                            <a href={doc.file_url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab (Lawyer only) */}
            {isLawyer && (
              <TabsContent value="notes">
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><StickyNote className="h-5 w-5" />Private Case Notes</CardTitle>
                    <CardDescription>Only visible to you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Textarea placeholder="Add a private note..." value={newNote} onChange={e => setNewNote(e.target.value)} className="min-h-[80px]" />
                    </div>
                    <Button size="sm" onClick={addNote} disabled={!newNote.trim()}>
                      <StickyNote className="h-3.5 w-3.5 mr-1" />Add Note
                    </Button>
                    <Separator />
                    {notes.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No notes yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {notes.map(note => (
                          <div key={note.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                            <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                            <p className="text-xs text-muted-foreground mt-2">{new Date(note.created_at).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Client Info */}
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><User className="h-4 w-4" />Client Information</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div><Label className="text-muted-foreground text-xs">Name</Label><p className="font-medium">{clientProfile?.name || 'Unknown'}</p></div>
              <div><Label className="text-muted-foreground text-xs">Email</Label><p className="font-medium">{clientProfile?.email}</p></div>
              {clientProfile?.phone && <div><Label className="text-muted-foreground text-xs">Phone</Label><p className="font-medium">{clientProfile.phone}</p></div>}
              {(caseData.client_location_city || caseData.client_location_state) && (
                <div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{[caseData.client_location_city, caseData.client_location_state].filter(Boolean).join(', ')}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {isLawyer && caseData.status === 'pending' && !caseData.lawyer_id && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" onClick={() => handleStatusChange('accepted')}>
                  <CheckCircle className="h-4 w-4 mr-2" />Accept Case
                </Button>
                <Button variant="destructive" className="w-full" onClick={() => handleStatusChange('declined')}>
                  <X className="h-4 w-4 mr-2" />Decline Case
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Case Timeline */}
          <Card>
            <CardHeader><CardTitle className="text-sm">Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Created: {new Date(caseData.created_at).toLocaleDateString()}</span>
                </div>
                {caseData.accepted_at && (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Accepted: {new Date(caseData.accepted_at).toLocaleDateString()}</span>
                  </div>
                )}
                {caseData.closed_at && (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                    <span>Closed: {new Date(caseData.closed_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
