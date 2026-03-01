import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Edit, 
  Search,
  Home,
  Building,
  Users,
  ShieldCheck,
  Briefcase,
  Heart
} from 'lucide-react';

const Templates: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templateCategories = [
    { id: 'all', name: 'All Templates', icon: FileText },
    { id: 'personal', name: 'Personal Legal', icon: Users },
    { id: 'property', name: 'Property & Rental', icon: Home },
    { id: 'employment', name: 'Employment', icon: Briefcase },
    { id: 'consumer', name: 'Consumer & Complaints', icon: ShieldCheck },
    { id: 'business', name: 'Business & Corporate', icon: Building },
    { id: 'family', name: 'Family & Women Rights', icon: Heart }
  ];

  const legalTemplates = [
    // Personal Legal Templates
    {
      id: 1,
      title: 'Power of Attorney',
      description: 'General Power of Attorney for legal representation',
      category: 'personal',
      downloads: 1250,
      languages: ['English', 'Hindi', 'Kannada'],
      type: 'Document'
    },
    {
      id: 2,
      title: 'Affidavit Template',
      description: 'General purpose affidavit for legal declarations',
      category: 'personal',
      downloads: 890,
      languages: ['English', 'Hindi', 'Tamil'],
      type: 'Document'
    },
    {
      id: 3,
      title: 'Legal Notice',
      description: 'Formal legal notice template for various purposes',
      category: 'personal',
      downloads: 756,
      languages: ['English', 'Hindi'],
      type: 'Notice'
    },
    
    // Individual Templates
    {
      id: 18,
      title: 'Rental Agreement (Individual)',
      description: 'Simple rental agreement template for individuals renting residential property',
      category: 'property',
      downloads: 3200,
      languages: ['English', 'Hindi', 'Kannada', 'Tamil', 'Malayalam'],
      type: 'Agreement'
    },
    {
      id: 19,
      title: 'Property NOC',
      description: 'No Objection Certificate for property transfer, construction, or mortgage clearance',
      category: 'property',
      downloads: 1450,
      languages: ['English', 'Hindi', 'Kannada'],
      type: 'Certificate'
    },
    {
      id: 20,
      title: 'Police Verification Form',
      description: 'Tenant/employee police verification application template with all required fields',
      category: 'property',
      downloads: 1820,
      languages: ['English', 'Hindi'],
      type: 'Application'
    },

    // Property and Rental Templates
    {
      id: 4,
      title: 'Rental Agreement',
      description: 'Comprehensive rental agreement for residential properties',
      category: 'property',
      downloads: 2100,
      languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
      type: 'Agreement'
    },
    {
      id: 5,
      title: 'Property Sale Deed',
      description: 'Property sale and transfer deed template',
      category: 'property',
      downloads: 980,
      languages: ['English', 'Hindi'],
      type: 'Deed'
    },
    {
      id: 6,
      title: 'Leave and License Agreement',
      description: 'Leave and license agreement for property usage',
      category: 'property',
      downloads: 670,
      languages: ['English', 'Hindi', 'Malayalam'],
      type: 'Agreement'
    },
    
    // Employment Templates
    {
      id: 7,
      title: 'Employment Contract',
      description: 'Standard employment contract template',
      category: 'employment',
      downloads: 1500,
      languages: ['English', 'Hindi'],
      type: 'Contract'
    },
    {
      id: 8,
      title: 'Non-Disclosure Agreement (NDA)',
      description: 'Employee NDA for confidential information protection',
      category: 'employment',
      downloads: 1200,
      languages: ['English'],
      type: 'Agreement'
    },
    {
      id: 9,
      title: 'Resignation Letter',
      description: 'Formal resignation letter template',
      category: 'employment',
      downloads: 800,
      languages: ['English', 'Hindi'],
      type: 'Letter'
    },
    
    // Consumer and Complaint Templates
    {
      id: 10,
      title: 'Consumer Complaint',
      description: 'Consumer court complaint template',
      category: 'consumer',
      downloads: 650,
      languages: ['English', 'Hindi', 'Kannada'],
      type: 'Complaint'
    },
    {
      id: 11,
      title: 'RTI Application',
      description: 'Right to Information application template',
      category: 'consumer',
      downloads: 1100,
      languages: ['English', 'Hindi', 'Tamil', 'Malayalam'],
      type: 'Application'
    },
    
    // Business & Corporate Templates
    {
      id: 12,
      title: 'Partnership Deed',
      description: 'Partnership agreement for business ventures',
      category: 'business',
      downloads: 890,
      languages: ['English'],
      type: 'Deed'
    },
    {
      id: 13,
      title: 'Service Agreement',
      description: 'Professional service agreement template',
      category: 'business',
      downloads: 750,
      languages: ['English', 'Hindi'],
      type: 'Agreement'
    },
    {
      id: 14,
      title: 'Loan Agreement',
      description: 'Personal/Business loan agreement template',
      category: 'business',
      downloads: 920,
      languages: ['English', 'Hindi'],
      type: 'Agreement'
    },
    
    // Family & Women Rights Templates
    {
      id: 15,
      title: 'Divorce Petition',
      description: 'Mutual consent divorce petition template',
      category: 'family',
      downloads: 450,
      languages: ['English', 'Hindi'],
      type: 'Petition'
    },
    {
      id: 16,
      title: 'Maintenance Application',
      description: 'Application for spousal/child maintenance',
      category: 'family',
      downloads: 320,
      languages: ['English', 'Hindi', 'Kannada'],
      type: 'Application'
    },
    {
      id: 17,
      title: 'Domestic Violence Complaint',
      description: 'Complaint under Domestic Violence Act',
      category: 'family',
      downloads: 280,
      languages: ['English', 'Hindi', 'Tamil'],
      type: 'Complaint'
    }
  ];

  const filteredTemplates = legalTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDownloadTemplate = (templateId: number) => {
    // In a real app, this would trigger actual download
    console.log(`Downloading template ${templateId}`);
  };

  const handleEditTemplate = (templateId: number) => {
    // In a real app, this would open the template editor
    console.log(`Editing template ${templateId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('templates')}</h1>
        <p className="text-muted-foreground">
          Access pre-filled legal templates for various purposes. All templates are created by legal experts.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-7">
          {templateCategories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center space-x-1 text-xs"
              >
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Templates Grid */}
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{template.type}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Languages */}
                    <div>
                      <p className="text-sm font-medium mb-2">Available in:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Download count */}
                    <div className="text-sm text-muted-foreground">
                      {template.downloads.toLocaleString()} downloads
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleDownloadTemplate(template.id)}
                        className="flex-1"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        onClick={() => handleEditTemplate(template.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filter.
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
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Need help with templates?</h3>
              <p className="text-muted-foreground mb-4">
                Our AI assistant can help you fill out templates or connect you with a lawyer for review.
              </p>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  Chat with AI Assistant
                </Button>
                <Button variant="outline" size="sm">
                  Find a Lawyer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Templates;