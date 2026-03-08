import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const notificationItems = [
  { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email', default: true },
  { id: 'sms', label: 'SMS Notifications', desc: 'Get text alerts on your phone', default: false },
  { id: 'consultation', label: 'Consultation Alerts', desc: 'Reminders for upcoming consultations', default: true },
  { id: 'legal', label: 'Legal Updates', desc: 'News about legal changes in your state', default: true },
  { id: 'announcements', label: 'Platform Announcements', desc: 'LawLite feature updates and news', default: false },
];

const NotificationsSection = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationItems.map(n => [n.id, n.default]))
  );

  const toggle = (id: string) => {
    setSettings(prev => {
      const next = { ...prev, [id]: !prev[id] };
      toast({ title: next[id] ? 'Enabled' : 'Disabled', description: `${notificationItems.find(n => n.id === id)?.label} ${next[id] ? 'enabled' : 'disabled'}.` });
      return next;
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-4 w-4" /> Notifications & Communication
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notificationItems.map(item => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0 border-border">
              <div>
                <Label className="text-sm font-medium text-foreground">{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={settings[item.id]} onCheckedChange={() => toggle(item.id)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;
