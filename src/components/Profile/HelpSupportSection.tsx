import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Bug, Star, BookOpen, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const supportItems = [
  { icon: MessageCircle, label: 'Contact Support', desc: 'Get help from our team', action: 'contact' },
  { icon: Bug, label: 'Report an Issue', desc: 'Report a bug or problem', action: 'report' },
  { icon: Star, label: 'Submit Feedback', desc: 'Share your experience', action: 'feedback' },
  { icon: BookOpen, label: 'FAQ', desc: 'Frequently asked questions', action: 'faq' },
];

const helplines = [
  { label: 'Women Helpline', number: '181' },
  { label: 'Cyber Crime', number: '1930' },
  { label: 'Consumer Helpline', number: '1800-11-4000' },
  { label: 'Legal Aid (NALSA)', number: '15100' },
  { label: 'Police', number: '100' },
];

const HelpSupportSection = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <HelpCircle className="h-4 w-4" /> Help & Support
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {supportItems.map(item => {
            const Icon = item.icon;
            return (
              <Button
                key={item.action}
                variant="outline"
                className="h-auto p-4 flex items-start gap-3 justify-start"
                onClick={() => toast({ title: item.label, description: 'This feature is coming soon.' })}
              >
                <Icon className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Phone className="h-4 w-4" /> Legal Helplines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {helplines.map(h => (
            <div key={h.number} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-sm text-foreground">{h.label}</span>
              <a href={`tel:${h.number}`} className="text-sm font-bold text-primary hover:underline">{h.number}</a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default HelpSupportSection;
