import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatBot from '@/components/Chat/ChatBot';
import { 
  Search,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
  Calendar,
  Scale,
  Users,
  Building,
  Shield,
  Laptop,
  Heart,
  Gavel
} from 'lucide-react';

const Lawyers: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [showChatBot, setShowChatBot] = useState(false);

  const specializations = [
    { id: 'all', name: 'All Lawyers', icon: Scale },
    { id: 'family', name: 'Family Law', icon: Heart },
    { id: 'criminal', name: 'Criminal Law', icon: Gavel },
    { id: 'corporate', name: 'Corporate Law', icon: Building },
    { id: 'civil', name: 'Civil Law', icon: Users },
    { id: 'cyber', name: 'Cyber Law', icon: Laptop },
    { id: 'property', name: 'Property Law', icon: Shield }
  ];

  const lawyers = [
    {
      id: 1,
      name: 'Adv. Priya Sharma',
      specialization: 'Family Law',
      experience: 12,
      rating: 4.9,
      reviews: 156,
      consultationFee: 2500,
      location: 'Mumbai',
      verified: true,
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi', 'Marathi'],
      description: 'Expert in family disputes, divorce cases, and child custody matters.',
      category: 'family'
    },
    {
      id: 2,
      name: 'Adv. Rajesh Kumar',
      specialization: 'Criminal Law',
      experience: 15,
      rating: 4.8,
      reviews: 203,
      consultationFee: 3000,
      location: 'Delhi',
      verified: true,
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi'],
      description: 'Specialized in criminal defense and white-collar crime cases.',
      category: 'criminal'
    },
    {
      id: 3,
      name: 'Adv. Meera Patel',
      specialization: 'Corporate Law',
      experience: 10,
      rating: 4.7,
      reviews: 98,
      consultationFee: 4000,
      location: 'Bangalore',
      verified: true,
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi', 'Kannada'],
      description: 'Corporate governance, mergers & acquisitions, and startup legal advice.',
      category: 'corporate'
    },
    {
      id: 4,
      name: 'Adv. Arjun Singh',
      specialization: 'Civil Law',
      experience: 8,
      rating: 4.6,
      reviews: 67,
      consultationFee: 2000,
      location: 'Jaipur',
      verified: true,
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi'],
      description: 'Civil litigation, property disputes, and contract law specialist.',
      category: 'civil'
    },
    {
      id: 5,
      name: 'Adv. Kavya Nair',
      specialization: 'Cyber Law',
      experience: 6,
      rating: 4.8,
      reviews: 89,
      consultationFee: 3500,
      location: 'Kochi',
      verified: true,
      image: '/api/placeholder/100/100',
      languages: ['English', 'Malayalam', 'Hindi'],
      description: 'Cybercrime, data protection, and technology law expert.',
      category: 'cyber'
    },
    {
      id: 6,
      name: 'Adv. Rohit Gupta',
      specialization: 'Property Law',
      experience: 14,
      rating: 4.7,
      reviews: 142,
      consultationFee: 2800,
      location: 'Pune',
      verified: true,
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi', 'Marathi'],
      description: 'Real estate transactions, property disputes, and land acquisition.',
      category: 'property'
    },
    {
      id: 7,
      name: 'Adv. Sunita Reddy',
      specialization: 'Family Law',
      experience: 9,
      rating: 4.6,
      reviews: 76,
      consultationFee: 2200,
      location: 'Hyderabad',
      verified: true,
      image: '/api/placeholder/100/100',
      languages: ['English', 'Telugu', 'Hindi'],
      description: 'Women rights, domestic violence cases, and matrimonial disputes.',
      category: 'family'
    },
    {
      id: 8,
      name: 'Adv. Vikram Joshi',
      specialization: 'Criminal Law',
      experience: 11,
      rating: 4.9,
      reviews: 134,
      consultationFee: 3200,
      location: 'Chennai',
      verified: true,
      image: '/api/placeholder/100/100',
      languages: ['English', 'Tamil', 'Hindi'],
      description: 'Criminal defense, bail applications, and court representation.',
      category: 'criminal'
    }
  ];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'all' || lawyer.category === selectedSpecialization;
    
    return matchesSearch && matchesSpecialization;
  });

  const handleBookConsultation = (lawyerId: number) => {
    console.log(`Booking consultation with lawyer ${lawyerId}`);
  };

  const handleChatWithLawyer = (lawyerId: number) => {
    console.log(`Starting chat with lawyer ${lawyerId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('lawyers')}</h1>
        <p className="text-muted-foreground">
          Find and connect with verified lawyers across different specializations.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search lawyers, specialization, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Specialization Tabs */}
      <Tabs value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
        <TabsList className="grid w-full grid-cols-7">
          {specializations.map((spec) => {
            const Icon = spec.icon;
            return (
              <TabsTrigger 
                key={spec.id} 
                value={spec.id}
                className="flex items-center space-x-1 text-xs"
              >
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{spec.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Lawyers Grid */}
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLawyers.map((lawyer) => (
              <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={lawyer.image} alt={lawyer.name} />
                      <AvatarFallback>
                        {lawyer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{lawyer.name}</CardTitle>
                        {lawyer.verified && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        {lawyer.specialization}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {lawyer.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{lawyer.experience} years</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{lawyer.location}</span>
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{lawyer.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({lawyer.reviews} reviews)
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{lawyer.consultationFee.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per consultation</p>
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <p className="text-sm font-medium mb-1">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {lawyer.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleBookConsultation(lawyer.id)}
                        className="flex-1"
                        size="sm"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {t('bookConsultation')}
                      </Button>
                      <Button
                        onClick={() => handleChatWithLawyer(lawyer.id)}
                        variant="outline"
                        size="sm"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results */}
          {filteredLawyers.length === 0 && (
            <div className="text-center py-12">
              <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No lawyers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or specialization filter.
              </p>
            </div>
          )}
        </div>
      </Tabs>

      {/* Help Section */}
      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Need help choosing a lawyer?</h3>
              <p className="text-muted-foreground mb-4">
                Our AI assistant can help you find the right lawyer based on your legal needs and preferences.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowChatBot(true)}
              >
                Get AI Recommendations
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ChatBot Integration */}
      {showChatBot && <ChatBot />}
    </div>
  );
};

export default Lawyers;