import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  FileText, 
  File, 
  MessageCircle, 
  User,
  Briefcase,
  Scale
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  const userNavItems = [
    { path: '/dashboard', icon: Home, label: t('dashboard') },
    { path: '/lawyers', icon: Scale, label: t('lawyers') },
    { path: '/documents', icon: FileText, label: t('documents') },
    { path: '/templates', icon: File, label: t('templates') },
    { path: '/consultants', icon: Users, label: t('consultants') },
    { path: '/chat', icon: MessageCircle, label: t('chat') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  const lawyerNavItems = [
    { path: '/lawyer-dashboard', icon: Home, label: t('dashboard') },
    { path: '/my-clients', icon: Users, label: 'My Clients' },
    { path: '/consultations', icon: Briefcase, label: 'Consultations' },
    { path: '/documents', icon: FileText, label: t('documents') },
    { path: '/chat', icon: MessageCircle, label: t('chat') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  const navItems = user?.type === 'lawyer' ? lawyerNavItems : userNavItems;

  return (
    <nav className="bg-card border-r h-full min-h-screen w-64 fixed left-0 top-16 z-40">
      <div className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
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