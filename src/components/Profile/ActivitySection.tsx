import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, MessageSquare, Users, FileText, Download, AlertCircle, Eye } from 'lucide-react';

const activities = [
  { type: 'chat', title: 'Property Dispute Query', date: '2 Mar 2026', status: 'Completed', icon: MessageSquare },
  { type: 'consultation', title: 'Consultation with Adv. Priya Sharma', date: '28 Feb 2026', status: 'Completed', icon: Users },
  { type: 'template', title: 'Rental Agreement Template', date: '25 Feb 2026', status: 'Downloaded', icon: Download },
  { type: 'document', title: 'Legal Notice Draft', date: '20 Feb 2026', status: 'Generated', icon: FileText },
  { type: 'chat', title: 'Consumer Rights Query', date: '18 Feb 2026', status: 'Completed', icon: MessageSquare },
  { type: 'complaint', title: 'Online Fraud Complaint', date: '15 Feb 2026', status: 'In Progress', icon: AlertCircle },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-green-100 text-green-700 border-green-200',
  Downloaded: 'bg-blue-100 text-blue-700 border-blue-200',
  Generated: 'bg-purple-100 text-purple-700 border-purple-200',
  'In Progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

const ActivitySection = () => (
  <Card>
    <CardHeader className="pb-4">
      <CardTitle className="text-lg flex items-center gap-2">
        <History className="h-4 w-4" /> My Legal Activity
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {activities.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${statusColors[a.status] || ''}`}>
                  {a.status}
                </Badge>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <Eye className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

export default ActivitySection;
