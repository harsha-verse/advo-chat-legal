import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';

const Consultants: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const consultants = [
    {
      id: 1,
      name: 'Dr. Anjali Mehta',
      specialization: 'Legal Consultation & Advisory',
      experience: 15,
      rating: 4.9,
      reviews: 234,
      consultationFee: 1500,
      location: 'Mumbai',
      verified: true,
      qualification: 'LLM, PhD in Law',
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi', 'Marathi'],
      description: 'Expert in providing strategic legal advice for complex business and personal matters.',
      expertise: ['Business Strategy', 'Legal Compliance', 'Risk Management']
    },
    {
      id: 2,
      name: 'Prof. Ramesh Kumar',
      specialization: 'Constitutional Law Expert',
      experience: 20,
      rating: 4.8,
      reviews: 189,
      consultationFee: 2000,
      location: 'Delhi',
      verified: true,
      qualification: 'LLM Constitutional Law',
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi'],
      description: 'Constitutional law professor and consultant with extensive court experience.',
      expertise: ['Constitutional Rights', 'Government Law', 'Public Policy']
    },
    {
      id: 3,
      name: 'Adv. Priya Sinha',
      specialization: 'Corporate Legal Advisory',
      experience: 12,
      rating: 4.7,
      reviews: 156,
      consultationFee: 2500,
      location: 'Bangalore',
      verified: true,
      qualification: 'LLM Corporate Law, MBA',
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi', 'Kannada'],
      description: 'Specialized in corporate governance, mergers, and startup legal frameworks.',
      expertise: ['Startup Law', 'M&A', 'Corporate Governance']
    },
    {
      id: 4,
      name: 'Dr. Kavita Sharma',
      specialization: 'Family Law Counselor',
      experience: 10,
      rating: 4.9,
      reviews: 201,
      consultationFee: 1200,
      location: 'Pune',
      verified: true,
      qualification: 'LLM Family Law, Counseling Cert.',
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi', 'Marathi'],
      description: 'Combines legal expertise with counseling to resolve family disputes amicably.',
      expertise: ['Mediation', 'Divorce Counseling', 'Child Custody']
    },
    {
      id: 5,
      name: 'Adv. Suresh Nair',
      specialization: 'Property Law Consultant',
      experience: 18,
      rating: 4.6,
      reviews: 98,
      consultationFee: 1800,
      location: 'Kochi',
      verified: true,
      qualification: 'LLM Property Law',
      image: '/api/placeholder/100/100',
      languages: ['English', 'Malayalam', 'Hindi'],
      description: 'Expert in property transactions, land acquisition, and real estate disputes.',
      expertise: ['Real Estate', 'Land Acquisition', 'Property Disputes']
    },
    {
      id: 6,
      name: 'Dr. Meera Gupta',
      specialization: 'Intellectual Property Expert',
      experience: 14,
      rating: 4.8,
      reviews: 167,
      consultationFee: 3000,
      location: 'Hyderabad',
      verified: true,
      qualification: 'LLM IP Law, Patent Agent',
      image: '/api/placeholder/100/100',
      languages: ['English', 'Hindi', 'Telugu'],
      description: 'Specializes in IP protection, patent filing, and technology law.',
      expertise: ['Patents', 'Trademarks', 'Copyrights']
    }
  ];

  const filteredConsultants = consultants.filter(consultant => 
    consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consultant.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consultant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consultant.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBookConsultation = (consultantId: number) => {
    console.log(`Booking consultation with consultant ${consultantId}`);
  };

  const handleChatWithConsultant = (consultantId: number) => {
    console.log(`Starting chat with consultant ${consultantId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('consultants')}</h1>
        <p className="text-muted-foreground">
          Connect with experienced legal consultants for expert advice and strategic guidance.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search consultants, expertise, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{consultants.length}+</p>
            <p className="text-sm text-muted-foreground">Expert Consultants</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">15+</p>
            <p className="text-sm text-muted-foreground">Years Avg. Experience</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">4.8</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-muted-foreground">Verified Experts</p>
          </CardContent>
        </Card>
      </div>

      {/* Consultants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConsultants.map((consultant) => (
          <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={consultant.image} alt={consultant.name} />
                  <AvatarFallback>
                    {consultant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{consultant.name}</CardTitle>
                    {consultant.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{consultant.qualification}</p>
                  <Badge variant="secondary" className="mt-1">
                    {consultant.specialization}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {consultant.description}
                </p>

                {/* Expertise */}
                <div>
                  <p className="text-sm font-medium mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {consultant.expertise.map((exp) => (
                      <Badge key={exp} variant="outline" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{consultant.experience} years</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{consultant.location}</span>
                  </div>
                </div>

                {/* Rating and Fee */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{consultant.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({consultant.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{consultant.consultationFee.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">per session</p>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <p className="text-sm font-medium mb-1">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {consultant.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleBookConsultation(consultant.id)}
                    className="flex-1"
                    size="sm"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                  <Button
                    onClick={() => handleChatWithConsultant(consultant.id)}
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
      {filteredConsultants.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No consultants found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria.
          </p>
        </div>
      )}

      {/* Help Section */}
      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Why choose our consultants?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>All consultants are verified and experienced</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Specialized expertise in various legal domains</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Flexible consultation options (online/offline)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Confidential and professional service</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Consultants;