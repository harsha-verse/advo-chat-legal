import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Scale, FileText, File, Users, TrendingUp, Clock, CheckCircle,
  MapPin, ExternalLink, AlertTriangle, Shield
} from 'lucide-react';
import { getStateInfo } from '@/data/stateData';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const userState = user?.preferences?.selectedState;
  const stateInfo = getStateInfo(userState);

  const quickActions = [
    { title: 'Find Lawyers', description: 'Browse verified lawyers by specialization', icon: Scale, href: '/lawyers', color: 'bg-primary' },
    { title: 'Legal Templates', description: 'Access pre-filled legal documents', icon: File, href: '/templates', color: 'bg-secondary' },
    { title: 'My Documents', description: 'View and manage your documents', icon: FileText, href: '/documents', color: 'bg-accent' },
    { title: 'Consultants', description: 'Connect with legal consultants', icon: Users, href: '/consultants', color: 'bg-muted' },
  ];

  const recentActivities = [
    { action: 'Downloaded rental agreement template', time: '2 hours ago', status: 'completed' },
    { action: 'Consulted with Adv. Sharma about property law', time: '1 day ago', status: 'completed' },
    { action: 'Submitted review for Adv. Patel', time: '2 days ago', status: 'completed' },
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
        {userState && (
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <MapPin className="h-3 w-3 mr-1" />
              {userState}
            </Badge>
            <span className="text-xs text-muted-foreground">Content personalized for your state</span>
          </div>
        )}
      </div>

      {/* State-Specific Quick Info */}
      {userState && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {userState} — Quick Legal Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stateInfo.quickFacts.map((fact, idx) => (
              <Card key={idx} className="bg-primary/5 border-primary/10">
                <CardContent className="p-4 flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{fact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

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

      {/* State Authorities & Portals */}
      {userState && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Authorities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-primary" />
                Key Authorities — {userState}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stateInfo.authorities.map((auth, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{auth.name}</p>
                    <p className="text-xs text-muted-foreground">{auth.department}</p>
                    {auth.helpline && (
                      <p className="text-xs text-primary mt-1">📞 {auth.helpline}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Portals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ExternalLink className="h-5 w-5 text-primary" />
                Government Portals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stateInfo.portals.map((portal, idx) => (
                <a
                  key={idx}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/10 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-medium">{portal.name}</p>
                    <p className="text-xs text-muted-foreground">{portal.description}</p>
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Common Issues for State */}
      {userState && stateInfo.commonIssues.length > 0 && (
        <Card className="bg-destructive/5 border-destructive/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Common Legal Issues in {userState}
            </CardTitle>
            <CardDescription>Frequently reported problems — tap to ask NyayaBot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stateInfo.commonIssues.map((issue, idx) => (
                <Badge key={idx} variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                  {issue}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <Button className="w-full mt-3" size="sm">Book Consultation</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
