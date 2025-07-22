import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  FileText, 
  File, 
  Users, 
  MessageCircle, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Find Lawyers',
      description: 'Browse verified lawyers by specialization',
      icon: Scale,
      href: '/lawyers',
      color: 'bg-primary'
    },
    {
      title: 'Legal Templates',
      description: 'Access pre-filled legal documents',
      icon: File,
      href: '/templates',
      color: 'bg-secondary'
    },
    {
      title: 'My Documents',
      description: 'View and manage your documents',
      icon: FileText,
      href: '/documents',
      color: 'bg-accent'
    },
    {
      title: 'Consultants',
      description: 'Connect with legal consultants',
      icon: Users,
      href: '/consultants',
      color: 'bg-muted'
    }
  ];

  const recentActivities = [
    {
      action: 'Downloaded rental agreement template',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      action: 'Consulted with Adv. Sharma about property law',
      time: '1 day ago',
      status: 'completed'
    },
    {
      action: 'Submitted review for Adv. Patel',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t('welcome')}, {user?.name || user?.email}!
        </h1>
        <p className="text-muted-foreground">
          Access legal services, connect with verified lawyers, and manage your legal documents all in one place.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} to={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{action.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-muted-foreground">Consultations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-muted-foreground">Templates Used</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="bg-green-100 p-1 rounded-full flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link to="/activity">View All Activity</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Lawyers */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Featured Lawyers</h2>
          <Button variant="outline" asChild>
            <Link to="/lawyers">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Sample featured lawyers */}
          {[
            { name: 'Adv. Priya Sharma', specialization: 'Family Law', rating: 4.9, experience: 12 },
            { name: 'Adv. Rajesh Kumar', specialization: 'Criminal Law', rating: 4.8, experience: 15 },
            { name: 'Adv. Meera Patel', specialization: 'Corporate Law', rating: 4.7, experience: 10 }
          ].map((lawyer, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{lawyer.name}</h3>
                    <p className="text-sm text-muted-foreground">{lawyer.specialization}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>⭐ {lawyer.rating}</span>
                  <span>{lawyer.experience} years exp.</span>
                </div>
                <Button className="w-full mt-3" size="sm">
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;