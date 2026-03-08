import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProfileOverview from '@/components/Profile/ProfileOverview';
import PersonalInfoSection from '@/components/Profile/PersonalInfoSection';
import SecuritySection from '@/components/Profile/SecuritySection';
import LegalPreferencesSection from '@/components/Profile/LegalPreferencesSection';
import VerificationSection from '@/components/Profile/VerificationSection';
import ActivitySection from '@/components/Profile/ActivitySection';
import DocumentsSection from '@/components/Profile/DocumentsSection';
import NotificationsSection from '@/components/Profile/NotificationsSection';
import HelpSupportSection from '@/components/Profile/HelpSupportSection';
import AccountManagementSection from '@/components/Profile/AccountManagementSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  User, Shield, Scale, BadgeCheck, History,
  FileText, Bell, HelpCircle, Settings
} from 'lucide-react';

const sidebarItems = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'legal', label: 'Legal Preferences', icon: Scale },
  { id: 'verification', label: 'Verification', icon: BadgeCheck },
  { id: 'activity', label: 'Legal Activity', icon: History },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
  { id: 'account', label: 'Account', icon: Settings },
];

const Profile = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');

  if (!user) return null;

  const renderSection = () => {
    switch (activeSection) {
      case 'personal': return <PersonalInfoSection />;
      case 'security': return <SecuritySection />;
      case 'legal': return <LegalPreferencesSection />;
      case 'verification': return <VerificationSection />;
      case 'activity': return <ActivitySection />;
      case 'documents': return <DocumentsSection />;
      case 'notifications': return <NotificationsSection />;
      case 'help': return <HelpSupportSection />;
      case 'account': return <AccountManagementSection />;
      default: return <PersonalInfoSection />;
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <ProfileOverview />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <nav className="md:w-60 shrink-0">
          <div className="bg-card rounded-xl border border-border p-2 sticky top-20">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
