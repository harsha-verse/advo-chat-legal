import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INDIAN_STATES } from '@/types';
import { toast } from '@/hooks/use-toast';
import { Pencil, Save, X } from 'lucide-react';

const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi', 'Odia', 'Urdu'];

const PersonalInfoSection = () => {
  const { user, updatePreferences } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: user?.preferences?.selectedState || '',
    pincode: '',
    language: user?.preferences?.preferredLanguage || 'English',
    occupation: '',
  });

  if (!user) return null;

  const handleSave = () => {
    // Update user preferences via context
    updatePreferences({
      selectedState: form.state as any,
      preferredLanguage: form.language,
    });

    // Update name in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('lawlite_users') || '[]');
    const idx = storedUsers.findIndex((u: any) => u.id === user.id);
    if (idx !== -1) {
      storedUsers[idx] = { ...storedUsers[idx], name: form.name };
      localStorage.setItem('lawlite_users', JSON.stringify(storedUsers));
    }
    const updatedUser = { ...user, name: form.name };
    localStorage.setItem('lawlite_user', JSON.stringify(updatedUser));

    setEditing(false);
    toast({ title: 'Profile Updated', description: 'Your personal information has been saved.' });
  };

  const Field = ({ label, value, field, type = 'text' }: { label: string; value: string; field: string; type?: string }) => (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {editing ? (
        <Input
          type={type}
          value={value}
          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
          className="h-9"
        />
      ) : (
        <p className="text-sm font-medium text-foreground py-1.5 px-3 bg-muted/50 rounded-md min-h-[36px] flex items-center">
          {value || '—'}
        </p>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">Personal Information</CardTitle>
        {editing ? (
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name" value={form.name} field="name" />
          <Field label="Email Address" value={form.email} field="email" type="email" />
          <Field label="Phone Number" value={form.phone} field="phone" type="tel" />
          <Field label="Date of Birth" value={form.dob} field="dob" type="date" />

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Gender</Label>
            {editing ? (
              <Select value={form.gender} onValueChange={v => setForm(p => ({ ...p, gender: v }))}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {['Male', 'Female', 'Other', 'Prefer not to say'].map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm font-medium text-foreground py-1.5 px-3 bg-muted/50 rounded-md min-h-[36px] flex items-center">{form.gender || '—'}</p>
            )}
          </div>

          <Field label="Occupation" value={form.occupation} field="occupation" />
          <Field label="Residential Address" value={form.address} field="address" />
          <Field label="City" value={form.city} field="city" />

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">State</Label>
            {editing ? (
              <Select value={form.state} onValueChange={v => setForm(p => ({ ...p, state: v }))}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm font-medium text-foreground py-1.5 px-3 bg-muted/50 rounded-md min-h-[36px] flex items-center">{form.state || '—'}</p>
            )}
          </div>

          <Field label="Pincode" value={form.pincode} field="pincode" />

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Preferred Language</Label>
            {editing ? (
              <Select value={form.language} onValueChange={v => setForm(p => ({ ...p, language: v }))}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {languages.map(l => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm font-medium text-foreground py-1.5 px-3 bg-muted/50 rounded-md min-h-[36px] flex items-center">{form.language || '—'}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
