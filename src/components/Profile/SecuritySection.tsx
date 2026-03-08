import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Shield, Lock, Smartphone, LogOut, Monitor, MapPin } from 'lucide-react';

const SecuritySection = () => {
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [twoFA, setTwoFA] = useState(false);

  const handlePasswordChange = () => {
    if (passwords.newPass.length < 8) {
      toast({ title: 'Error', description: 'Password must be at least 8 characters.', variant: 'destructive' });
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }
    setChangingPassword(false);
    setPasswords({ current: '', newPass: '', confirm: '' });
    toast({ title: 'Password Updated', description: 'Your password has been changed successfully.' });
  };

  const loginHistory = [
    { device: 'Chrome on Windows', location: 'Mumbai, Maharashtra', time: '2 hours ago', current: true },
    { device: 'Safari on iPhone', location: 'Pune, Maharashtra', time: '1 day ago', current: false },
    { device: 'Firefox on macOS', location: 'Delhi', time: '3 days ago', current: false },
  ];

  return (
    <div className="space-y-4">
      {/* Password */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="h-4 w-4" /> Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          {changingPassword ? (
            <div className="space-y-3 max-w-sm">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Current Password</Label>
                <Input type="password" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">New Password</Label>
                <Input type="password" value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Confirm New Password</Label>
                <Input type="password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} className="h-9" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handlePasswordChange}>Update Password</Button>
                <Button size="sm" variant="ghost" onClick={() => setChangingPassword(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Last changed: 30 days ago</p>
              <Button size="sm" variant="outline" onClick={() => setChangingPassword(true)}>Change Password</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2FA */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Smartphone className="h-4 w-4" /> Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
              <Badge variant="outline" className="mt-1">{twoFA ? 'Enabled' : 'Disabled'}</Badge>
            </div>
            <Switch checked={twoFA} onCheckedChange={v => {
              setTwoFA(v);
              toast({ title: v ? '2FA Enabled' : '2FA Disabled' });
            }} />
          </div>
        </CardContent>
      </Card>

      {/* Login Activity */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Monitor className="h-4 w-4" /> Login Activity
          </CardTitle>
          <Button size="sm" variant="destructive" onClick={() => toast({ title: 'Logged Out', description: 'All other sessions have been terminated.' })}>
            <LogOut className="h-3.5 w-3.5 mr-1" /> Logout All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loginHistory.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 border-border">
                <div className="flex items-center gap-3">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.device}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {item.location} · {item.time}
                    </p>
                  </div>
                </div>
                {item.current && <Badge variant="default" className="text-xs">Current</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-4 w-4" /> Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Password Strength', status: 'Strong', color: 'bg-green-500' },
              { label: 'Email Verified', status: 'Yes', color: 'bg-green-500' },
              { label: '2FA', status: twoFA ? 'Enabled' : 'Disabled', color: twoFA ? 'bg-green-500' : 'bg-yellow-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <div className={`h-2 w-2 rounded-full ${item.color}`} />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySection;
