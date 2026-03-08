import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Settings, UserX, Trash2, Download, FileText, Shield } from 'lucide-react';

const AccountManagementSection = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDeactivate = () => {
    toast({ title: 'Account Deactivation', description: 'Please contact support to deactivate your account.', variant: 'destructive' });
  };

  const handleDelete = () => {
    toast({ title: 'Account Deletion', description: 'Please contact support to request account deletion.', variant: 'destructive' });
  };

  const handleExport = () => {
    toast({ title: 'Data Export', description: 'Your personal data export will be prepared and sent to your email.' });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-4 w-4" /> Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3" onClick={handleExport}>
            <Download className="h-4 w-4 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium">Export Personal Data</p>
              <p className="text-xs text-muted-foreground">Download all your data in a portable format</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3" onClick={handleDeactivate}>
            <UserX className="h-4 w-4 text-yellow-600" />
            <div className="text-left">
              <p className="text-sm font-medium">Deactivate Account</p>
              <p className="text-xs text-muted-foreground">Temporarily disable your account</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 border-destructive/30 hover:bg-destructive/5" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
            <div className="text-left">
              <p className="text-sm font-medium text-destructive">Request Account Deletion</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-4 w-4" /> Legal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
            <FileText className="h-4 w-4" /> Privacy Policy
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
            <FileText className="h-4 w-4" /> Terms & Conditions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountManagementSection;
