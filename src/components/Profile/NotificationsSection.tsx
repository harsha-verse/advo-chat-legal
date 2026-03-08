import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NotificationsSection = () => {
  const { t } = useTranslation();

  const notificationItems = [
    { id: 'email', labelKey: 'emailNotifications', descKey: 'emailNotificationsDesc', default: true },
    { id: 'sms', labelKey: 'smsNotifications', descKey: 'smsNotificationsDesc', default: false },
    { id: 'consultation', labelKey: 'consultationAlerts', descKey: 'consultationAlertsDesc', default: true },
    { id: 'legal', labelKey: 'legalUpdates', descKey: 'legalUpdatesDesc', default: true },
    { id: 'announcements', labelKey: 'platformAnnouncements', descKey: 'platformAnnouncementsDesc', default: false },
  ];

  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationItems.map(n => [n.id, n.default]))
  );

  const toggle = (id: string, labelKey: string) => {
    setSettings(prev => {
      const next = { ...prev, [id]: !prev[id] };
      toast({ title: next[id] ? t('enabled') : t('disabled'), description: `${t(labelKey)} ${next[id] ? t('enabled').toLowerCase() : t('disabled').toLowerCase()}.` });
      return next;
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-4 w-4" /> {t('notificationsAndCommunication')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notificationItems.map(item => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0 border-border">
              <div>
                <Label className="text-sm font-medium text-foreground">{t(item.labelKey)}</Label>
                <p className="text-xs text-muted-foreground">{t(item.descKey)}</p>
              </div>
              <Switch checked={settings[item.id]} onCheckedChange={() => toggle(item.id, item.labelKey)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;
