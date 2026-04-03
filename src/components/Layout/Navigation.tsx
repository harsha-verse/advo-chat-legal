import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, Users, FileText, File, MessageCircle, User,
  Briefcase, Scale, MapPin, Building, Landmark, FilePlus, ShieldCheck
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const { profile, isAdmin } = useAuth();
  const location = useLocation();

  const userNavItems = [
    { path: '/dashboard', icon: Home, label: t('dashboard') },
    { path: '/lawyers', icon: Scale, label: t('lawyers') },
    { path: '/my-cases', icon: Briefcase, label: t('myCases') },
    { path: '/my-consultations', icon: MessageCircle, label: t('consultations') },
    { path: '/documents', icon: FileText, label: t('documents') },
    { path: '/templates', icon: File, label: t('templates') },
    { path: '/consultants', icon: Users, label: t('consultants') },
    { path: '/state-legal-support', icon: MapPin, label: t('stateLegalSupport') },
    { path: '/msme-support', icon: Building, label: t('msmeSupport') },
    { path: '/authority-finder', icon: Landmark, label: t('authorityFinder') },
    { path: '/generate-document', icon: FilePlus, label: t('generateDocument') },
    { path: '/chat', icon: MessageCircle, label: t('chat') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  const lawyerNavItems = [
    { path: '/lawyer-dashboard', icon: Home, label: t('dashboard') },
    { path: '/my-cases', icon: Briefcase, label: t('caseDashboard') },
    { path: '/my-consultations', icon: MessageCircle, label: t('consultations') },
    { path: '/documents', icon: FileText, label: t('documents') },
    { path: '/chat', icon: MessageCircle, label: t('chat') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  const navItems = profile?.user_type === 'lawyer' ? lawyerNavItems : userNavItems;

  // Add admin link if user is admin
  const allItems = isAdmin ? [...navItems, { path: '/admin', icon: ShieldCheck, label: 'Admin' }] : navItems;

  return (
    <nav className="bg-card border-r h-full min-h-screen w-64 fixed left-0 top-16 z-40">
      <div className="p-4 space-y-2">
        {allItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}>
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
