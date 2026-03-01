import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Scale, AlertTriangle, ExternalLink, BookOpen } from 'lucide-react';

interface StateInfo {
  id: string;
  name: string;
  importantRules: { title: string; description: string; category: string }[];
  commonIssues: string[];
  governmentPortals: { name: string; url: string }[];
  localVariations?: string[];
}

const statesData: StateInfo[] = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    importantRules: [
      { title: 'Stamp Duty on Property', description: 'Stamp duty ranges from 3% to 6% depending on location. Women buyers get 1% concession in some areas.', category: 'property' },
      { title: 'Rent Control Act', description: 'Maharashtra Rent Control Act 1999 governs tenant-landlord relationships. Standard rent increase is capped at 4% per annum.', category: 'rental' },
      { title: 'Police Verification', description: 'Mandatory for all tenants within 15 days of occupancy. Landlords must submit Form-V at the nearest police station.', category: 'police' },
      { title: 'Civil Court Jurisdiction', description: 'District courts handle civil matters up to ₹5 crore. High Court for matters above.', category: 'civil' },
    ],
    commonIssues: [
      'Tenant eviction disputes',
      'Property registration delays',
      'RERA complaints for under-construction properties',
      'Cooperative housing society disputes',
      'Domestic violence complaints under DV Act',
    ],
    governmentPortals: [
      { name: 'MahaRERA', url: 'https://maharera.mahaonline.gov.in' },
      { name: 'IGR Maharashtra (Registration)', url: 'https://igrmaharashtra.gov.in' },
      { name: 'Mumbai Police (Verification)', url: 'https://mumbaipolice.gov.in' },
      { name: 'Maharashtra e-Courts', url: 'https://districts.ecourts.gov.in/maharashtra' },
    ],
    localVariations: [
      'Mumbai has separate rent control provisions under the Bombay Rents Act',
      'Pune and Mumbai have different stamp duty rates',
    ],
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    importantRules: [
      { title: 'Karnataka Rent Act 1999', description: 'Regulates residential and commercial tenancy. Rent agreements must be registered if tenure exceeds 11 months.', category: 'rental' },
      { title: 'Property Registration', description: 'Stamp duty is 5% for properties above ₹45 lakh, 3% for properties between ₹21-45 lakh, and 2% below ₹20 lakh.', category: 'property' },
      { title: 'Police Verification (Bataada)', description: 'Online tenant verification via Kaveri portal. Must be done within 7 days of occupancy.', category: 'police' },
      { title: 'RERA Karnataka', description: 'All projects above 500 sq.m or 8 units must be registered under K-RERA.', category: 'civil' },
    ],
    commonIssues: [
      'Tenant deposit return disputes',
      'Unauthorized construction penalties',
      'Land encroachment cases',
      'Consumer forum complaints',
      'Labour law violations in IT sector',
    ],
    governmentPortals: [
      { name: 'K-RERA', url: 'https://rera.karnataka.gov.in' },
      { name: 'Kaveri Online (Registration)', url: 'https://kaverionline.karnataka.gov.in' },
      { name: 'Karnataka Police', url: 'https://ksp.karnataka.gov.in' },
      { name: 'Karnataka e-Courts', url: 'https://districts.ecourts.gov.in/karnataka' },
    ],
  },
  {
    id: 'delhi',
    name: 'Delhi',
    importantRules: [
      { title: 'Delhi Rent Control Act', description: 'Applies to premises rented before 1988. New tenancies governed by the Draft Model Tenancy Act.', category: 'rental' },
      { title: 'Property Registration', description: 'Circle rates vary by colony category (A-H). Stamp duty is 4% for women, 6% for men.', category: 'property' },
      { title: 'Police Verification', description: 'Online tenant verification through Delhi Police website. Mandatory within 3 days.', category: 'police' },
      { title: 'Consumer Disputes', description: 'District Consumer Forums handle claims up to ₹1 crore. State Commission up to ₹10 crore.', category: 'civil' },
    ],
    commonIssues: [
      'Unauthorized colony regularization',
      'DDA flat allotment disputes',
      'Tenant eviction under old rent act',
      'Traffic challan disputes',
      'Property mutation delays',
    ],
    governmentPortals: [
      { name: 'Delhi Revenue Dept', url: 'https://revenue.delhi.gov.in' },
      { name: 'Delhi Police (Verification)', url: 'https://delhipolice.gov.in' },
      { name: 'Delhi e-Courts', url: 'https://districts.ecourts.gov.in/delhi' },
      { name: 'DDA Portal', url: 'https://dda.gov.in' },
    ],
    localVariations: [
      'Different circle rates for different colony categories (A through H)',
      'Old Delhi areas have separate rent control provisions',
    ],
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    importantRules: [
      { title: 'TN Buildings (Lease & Rent Control) Act', description: 'Governs all rental properties. Fair rent can be fixed by Rent Controller.', category: 'rental' },
      { title: 'Property Registration', description: 'Stamp duty is 7% and registration fee is 4%. Women get 1% stamp duty concession.', category: 'property' },
      { title: 'Police Verification', description: 'Tenant verification through local police station. Required within 15 days.', category: 'police' },
      { title: 'TNRERA', description: 'All projects above 500 sq.m or 8 apartments must register with TNRERA.', category: 'civil' },
    ],
    commonIssues: [
      'Land grabbing and encroachment',
      'Temple land disputes',
      'Labour court cases',
      'Cooperative society frauds',
      'Motor accident claims',
    ],
    governmentPortals: [
      { name: 'TNRERA', url: 'https://tnrera.in' },
      { name: 'TNREGINET (Registration)', url: 'https://tnreginet.gov.in' },
      { name: 'TN Police', url: 'https://eservices.tnpolice.gov.in' },
      { name: 'TN e-Courts', url: 'https://districts.ecourts.gov.in/tamilnadu' },
    ],
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    importantRules: [
      { title: 'Rajasthan Rent Control Act 2001', description: 'Applicable to urban areas. Limits rent increase and protects against arbitrary eviction.', category: 'rental' },
      { title: 'Property Registration', description: 'Stamp duty is 5% for men and 4% for women. Registration fee is 1%.', category: 'property' },
      { title: 'Police Verification', description: 'Tenant verification through Rajasthan Police portal within 10 days.', category: 'police' },
      { title: 'Rajasthan RERA', description: 'Projects above 500 sq.m must be RERA registered.', category: 'civil' },
    ],
    commonIssues: [
      'Agricultural land conversion disputes',
      'Tribal land protection issues',
      'Mining lease conflicts',
      'Child marriage-related legal cases',
      'Water rights disputes',
    ],
    governmentPortals: [
      { name: 'Rajasthan RERA', url: 'https://rera.rajasthan.gov.in' },
      { name: 'e-Panjiyan (Registration)', url: 'https://epanjiyan.raj.nic.in' },
      { name: 'Rajasthan Police', url: 'https://police.rajasthan.gov.in' },
      { name: 'Rajasthan e-Courts', url: 'https://districts.ecourts.gov.in/rajasthan' },
    ],
  },
  {
    id: 'kerala',
    name: 'Kerala',
    importantRules: [
      { title: 'Kerala Buildings (Lease & Rent Control) Act', description: 'Comprehensive rent control with fair rent determination by Rent Control Court.', category: 'rental' },
      { title: 'Property Registration', description: 'Stamp duty is 8% and registration fee is 2%. One of the highest in India.', category: 'property' },
      { title: 'Police Verification', description: 'Online verification through Kerala Police portal. Mandatory for all tenants.', category: 'police' },
      { title: 'Kerala RERA', description: 'All residential projects above 500 sq.m or commercial above 1000 sq.m must register.', category: 'civil' },
    ],
    commonIssues: [
      'CRZ violation disputes',
      'Paddy land conversion issues',
      'Labour union-related disputes',
      'NRI property inheritance cases',
      'Consumer protection cases',
    ],
    governmentPortals: [
      { name: 'Kerala RERA', url: 'https://rera.kerala.gov.in' },
      { name: 'Kerala Registration', url: 'https://keralaregistration.gov.in' },
      { name: 'Kerala Police', url: 'https://keralapolice.gov.in' },
      { name: 'Kerala e-Courts', url: 'https://districts.ecourts.gov.in/kerala' },
    ],
    localVariations: [
      'Paddy land and wetland conversion requires special permission under Kerala Conservation of Paddy Land Act',
      'CRZ restrictions are stricter along Kerala coastline',
    ],
  },
];

const categoryColors: Record<string, string> = {
  property: 'bg-primary/10 text-primary',
  rental: 'bg-secondary/20 text-secondary-foreground',
  police: 'bg-accent/20 text-accent-foreground',
  civil: 'bg-muted text-muted-foreground',
};

const StateLegalSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>(statesData[0].id);

  const filteredStates = statesData.filter((state) =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentState = statesData.find((s) => s.id === selectedState) || statesData[0];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">State Legal Support</h1>
        <p className="text-muted-foreground">
          Explore state-wise legal rules, common issues, and government portals across India.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search states..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* State Tabs */}
      <Tabs value={selectedState} onValueChange={setSelectedState}>
        <TabsList className="flex flex-wrap h-auto gap-1">
          {filteredStates.map((state) => (
            <TabsTrigger key={state.id} value={state.id} className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {state.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedState} className="mt-6 space-y-6">
          {/* Important Legal Rules */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Important Legal Rules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentState.importantRules.map((rule, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{rule.title}</CardTitle>
                      <Badge variant="outline" className={categoryColors[rule.category]}>
                        {rule.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Common Legal Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Common Legal Issues
              </CardTitle>
              <CardDescription>Frequently reported legal problems in {currentState.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentState.commonIssues.map((issue, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Government Portals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Government Portals
              </CardTitle>
              <CardDescription>Important online resources for {currentState.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentState.governmentPortals.map((portal, idx) => (
                  <a
                    key={idx}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent/10 transition-colors text-sm"
                  >
                    <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground font-medium">{portal.name}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Local Variations */}
          {currentState.localVariations && currentState.localVariations.length > 0 && (
            <Card className="bg-primary/5 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Local Law Variations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentState.localVariations.map((variation, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      {variation}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StateLegalSupport;
