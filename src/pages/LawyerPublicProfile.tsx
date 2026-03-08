import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle, MapPin, Clock, Star, Briefcase, GraduationCap, Globe,
  Calendar, Phone, Video, Users, ArrowLeft, Scale, BarChart3, Building
} from 'lucide-react';

const LawyerPublicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [caseStats, setCaseStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchLawyerProfile(id);
  }, [id]);

  const fetchLawyerProfile = async (userId: string) => {
    setLoading(true);
    const [lpRes, profRes, eduRes, csRes] = await Promise.all([
      supabase.from('lawyer_profiles').select('*').eq('user_id', userId).single(),
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('lawyer_education' as any).select('*').eq('user_id', userId),
      supabase.from('lawyer_case_stats' as any).select('*').eq('user_id', userId),
    ]);
    if (lpRes.data) setLawyer(lpRes.data);
    if (profRes.data) setProfileData(profRes.data);
    if (eduRes.data) setEducation(eduRes.data as any[]);
    if (csRes.data) setCaseStats(csRes.data as any[]);
    setLoading(false);
  };

  const roleLabel = (r: string) => r?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const totalCases = caseStats.reduce((sum, s) => sum + (s.cases_handled || 0), 0);

  if (loading) return <div className="p-6 flex items-center justify-center min-h-[400px]"><p className="text-muted-foreground">Loading profile...</p></div>;
  if (!lawyer || !profileData) return <div className="p-6 text-center"><p className="text-muted-foreground">Lawyer profile not found.</p><Button variant="outline" className="mt-4" onClick={() => navigate('/lawyers')}><ArrowLeft className="h-4 w-4 mr-2" />Back to Lawyers</Button></div>;

  const isVerified = lawyer.verification_status === 'verified';

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" onClick={() => navigate('/lawyers')}><ArrowLeft className="h-4 w-4 mr-2" />Back to Lawyers</Button>

      {/* Hero Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="h-28 w-28 border-4 border-primary/20">
              <AvatarImage src={profileData.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                {(profileData.name || '?').slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">{profileData.name}</h1>
                {isVerified && <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Verified Lawyer</Badge>}
              </div>
              <p className="text-muted-foreground font-medium">{roleLabel(lawyer.role_type)}</p>
              {lawyer.tagline && <p className="text-foreground italic">"{lawyer.tagline}"</p>}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {profileData.city && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{profileData.city}, {profileData.state}</span>}
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{lawyer.experience || 0} years experience</span>
                {lawyer.law_firm && <span className="flex items-center gap-1"><Building className="h-3.5 w-3.5" />{lawyer.law_firm}</span>}
                {lawyer.rating > 0 && <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />{lawyer.rating} ({lawyer.total_reviews} reviews)</span>}
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => navigate(`/book-consultation?lawyer=${id}`)}><Calendar className="h-4 w-4 mr-2" />Book Consultation</Button>
                <Button variant="outline" onClick={() => navigate(`/submit-case?lawyer=${id}`)}>Submit Case</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          {lawyer.bio && (
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Briefcase className="h-5 w-5" />About</CardTitle></CardHeader>
              <CardContent><p className="text-foreground leading-relaxed whitespace-pre-wrap">{lawyer.bio}</p></CardContent>
            </Card>
          )}

          {/* Practice Areas */}
          {lawyer.practice_areas?.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Scale className="h-5 w-5" />Practice Areas</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lawyer.practice_areas.map((a: string) => <Badge key={a} variant="secondary">{a}</Badge>)}
                </div>
                {lawyer.specialization && (
                  <p className="text-sm text-muted-foreground mt-3">Primary Specialization: <span className="font-medium text-foreground">{lawyer.specialization}</span></p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><GraduationCap className="h-5 w-5" />Education & Qualifications</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.university} – {edu.graduation_year}</p>
                      {edu.certifications && <p className="text-xs text-muted-foreground mt-0.5">{edu.certifications}</p>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Case Stats */}
          {caseStats.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><BarChart3 className="h-5 w-5" />Cases Handled ({totalCases} total)</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {caseStats.map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{stat.case_category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min((stat.cases_handled / Math.max(totalCases, 1)) * 100, 100)}%` }} />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">{stat.cases_handled}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Consultation */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Consultation</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {lawyer.consultation_fee > 0 && (
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">₹{lawyer.consultation_fee}</p>
                  <p className="text-xs text-muted-foreground">per {lawyer.consultation_duration || 30} min session</p>
                </div>
              )}
              {lawyer.consultation_types?.length > 0 && (
                <div className="space-y-2">
                  {lawyer.consultation_types.map((type: string) => {
                    const Icon = type.includes('Online') ? Video : type.includes('Phone') ? Phone : Users;
                    return <div key={type} className="flex items-center gap-2 text-sm"><Icon className="h-4 w-4 text-muted-foreground" />{type}</div>;
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Availability */}
          {lawyer.available_days?.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Availability</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {lawyer.available_days.map((day: string) => <Badge key={day} variant="outline" className="text-xs">{day.slice(0, 3)}</Badge>)}
                </div>
                <p className="text-sm text-muted-foreground">{lawyer.available_start_time} – {lawyer.available_end_time}</p>
              </CardContent>
            </Card>
          )}

          {/* Languages */}
          {lawyer.languages_spoken?.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Globe className="h-5 w-5" />Languages</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lawyer.languages_spoken.map((l: string) => <Badge key={l} variant="outline">{l}</Badge>)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Jurisdictions */}
          {lawyer.court_jurisdictions?.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Court Jurisdictions</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lawyer.court_jurisdictions.map((c: string) => <Badge key={c} variant="secondary">{c}</Badge>)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bar Council */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Professional Info</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Bar Council No.</span><span className="font-medium">{lawyer.bar_council_number}</span></div>
              <Separator />
              <div className="flex justify-between"><span className="text-muted-foreground">Practicing Since</span><span className="font-medium">{lawyer.year_of_practice}</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LawyerPublicProfile;
