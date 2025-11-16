import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scale, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

const Signup: React.FC = () => {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    state: '',
    preferredLanguage: 'en',
    type: 'user' as 'user' | 'lawyer',
    licenseNumber: '',
    specialization: '',
    experience: '',
    consultationFee: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const specializations = [
    'Family Law',
    'Criminal Law',
    'Corporate Law',
    'Civil Law',
    'Cyber Law',
    'Property Law',
    'Labor Law',
    'Tax Law',
    'Constitutional Law',
    'Environmental Law'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    
    if (!formData.state) {
      newErrors.state = 'Please select your state';
    }
    
    if (!formData.email) {
      newErrors.email = t('pleaseEnterEmail');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Strengthened password validation
    if (!formData.password) {
      newErrors.password = t('pleaseEnterPassword');
    } else {
      const password = formData.password;
      const passwordErrors: string[] = [];
      
      if (password.length < 12) {
        passwordErrors.push('at least 12 characters');
      }
      if (!/[A-Z]/.test(password)) {
        passwordErrors.push('one uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        passwordErrors.push('one lowercase letter');
      }
      if (!/[0-9]/.test(password)) {
        passwordErrors.push('one number');
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        passwordErrors.push('one special character');
      }
      
      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain ${passwordErrors.join(', ')}`;
      }
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordsDoNotMatch');
    }
    
    if (!formData.name) {
      newErrors.name = 'Please enter your name';
    }
    
    // Lawyer-specific validations
    if (formData.type === 'lawyer') {
      if (!formData.licenseNumber) {
        newErrors.licenseNumber = t('pleaseEnterLicenseNumber');
      }
      if (!formData.specialization) {
        newErrors.specialization = 'Please select your specialization';
      }
      if (!formData.experience) {
        newErrors.experience = 'Please enter your experience';
      }
      if (!formData.consultationFee) {
        newErrors.consultationFee = 'Please enter your consultation fee';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const success = await signup({
        ...formData,
        experience: formData.experience ? parseInt(formData.experience) : 0,
        consultationFee: formData.consultationFee ? parseInt(formData.consultationFee) : 0
      });
      
      if (success) {
        toast({
          title: "Success",
          description: formData.type === 'lawyer' 
            ? "Registration successful! Your account will be verified before activation."
            : t('registrationSuccessful'),
        });
        navigate('/login');
      } else {
        toast({
          title: "Error",
          description: formData.type === 'lawyer' 
            ? t('licenseVerificationRequired')
            : "Registration failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="LAWLITE" className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">LAWLITE</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as 'user' | 'lawyer' }))}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>User</span>
              </TabsTrigger>
              <TabsTrigger value="lawyer" className="flex items-center space-x-2">
                <Scale className="h-4 w-4" />
                <span>Lawyer</span>
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.name}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleSelectChange('state', value)}
                >
                  <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="AN">Andaman and Nicobar Islands</SelectItem>
                    <SelectItem value="AP">Andhra Pradesh</SelectItem>
                    <SelectItem value="AR">Arunachal Pradesh</SelectItem>
                    <SelectItem value="AS">Assam</SelectItem>
                    <SelectItem value="BR">Bihar</SelectItem>
                    <SelectItem value="CH">Chandigarh</SelectItem>
                    <SelectItem value="CT">Chhattisgarh</SelectItem>
                    <SelectItem value="DN">Dadra and Nagar Haveli and Daman and Diu</SelectItem>
                    <SelectItem value="DL">Delhi</SelectItem>
                    <SelectItem value="GA">Goa</SelectItem>
                    <SelectItem value="GJ">Gujarat</SelectItem>
                    <SelectItem value="HR">Haryana</SelectItem>
                    <SelectItem value="HP">Himachal Pradesh</SelectItem>
                    <SelectItem value="JK">Jammu and Kashmir</SelectItem>
                    <SelectItem value="JH">Jharkhand</SelectItem>
                    <SelectItem value="KA">Karnataka</SelectItem>
                    <SelectItem value="KL">Kerala</SelectItem>
                    <SelectItem value="LA">Ladakh</SelectItem>
                    <SelectItem value="LD">Lakshadweep</SelectItem>
                    <SelectItem value="MP">Madhya Pradesh</SelectItem>
                    <SelectItem value="MH">Maharashtra</SelectItem>
                    <SelectItem value="MN">Manipur</SelectItem>
                    <SelectItem value="ML">Meghalaya</SelectItem>
                    <SelectItem value="MZ">Mizoram</SelectItem>
                    <SelectItem value="NL">Nagaland</SelectItem>
                    <SelectItem value="OR">Odisha</SelectItem>
                    <SelectItem value="PY">Puducherry</SelectItem>
                    <SelectItem value="PB">Punjab</SelectItem>
                    <SelectItem value="RJ">Rajasthan</SelectItem>
                    <SelectItem value="SK">Sikkim</SelectItem>
                    <SelectItem value="TN">Tamil Nadu</SelectItem>
                    <SelectItem value="TG">Telangana</SelectItem>
                    <SelectItem value="TR">Tripura</SelectItem>
                    <SelectItem value="UP">Uttar Pradesh</SelectItem>
                    <SelectItem value="UT">Uttarakhand</SelectItem>
                    <SelectItem value="WB">West Bengal</SelectItem>
                  </SelectContent>
                </Select>
                {errors.state && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.state}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredLanguage">Preferred Language</Label>
                <Select
                  value={formData.preferredLanguage}
                  onValueChange={(value) => handleSelectChange('preferredLanguage', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your language" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                    <SelectItem value="hi">🇮🇳 हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</SelectItem>
                    <SelectItem value="ta">🇮🇳 தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="te">🇮🇳 తెలుగు (Telugu)</SelectItem>
                    <SelectItem value="ml">🇮🇳 മലയാളം (Malayalam)</SelectItem>
                    <SelectItem value="bn">🇮🇳 বাংলা (Bengali)</SelectItem>
                    <SelectItem value="mr">🇮🇳 मराठी (Marathi)</SelectItem>
                    <SelectItem value="gu">🇮🇳 ગુજરાતી (Gujarati)</SelectItem>
                    <SelectItem value="pa">🇮🇳 ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'border-destructive' : ''}
                />
                {errors.confirmPassword && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.confirmPassword}</AlertDescription>
                  </Alert>
                )}
              </div>
              
              {/* Lawyer-specific fields */}
              {formData.type === 'lawyer' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">{t('licenseNumber')}</Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="Advocate License Number"
                      className={errors.licenseNumber ? 'border-destructive' : ''}
                    />
                    {errors.licenseNumber && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.licenseNumber}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t('specialization')}</Label>
                    <Select onValueChange={(value) => handleSelectChange('specialization', value)}>
                      <SelectTrigger className={errors.specialization ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.specialization && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.specialization}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">{t('experience')}</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="Years"
                        className={errors.experience ? 'border-destructive' : ''}
                      />
                      {errors.experience && (
                        <Alert variant="destructive">
                          <AlertDescription>{errors.experience}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="consultationFee">{t('consultationFee')}</Label>
                      <Input
                        id="consultationFee"
                        name="consultationFee"
                        type="number"
                        value={formData.consultationFee}
                        onChange={handleInputChange}
                        placeholder="₹ per hour"
                        className={errors.consultationFee ? 'border-destructive' : ''}
                      />
                      {errors.consultationFee && (
                        <Alert variant="destructive">
                          <AlertDescription>{errors.consultationFee}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : t('signup')}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    {t('login')}
                  </Link>
                </p>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;