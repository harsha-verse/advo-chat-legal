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
import { Scale, User, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { INDIAN_STATES } from '@/types';
import logo from '@/assets/logo.png';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login, updatePreferences } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    type: 'user' as 'user' | 'lawyer',
    selectedState: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = t('pleaseEnterEmail');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = t('pleaseEnterPassword');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password, formData.type);
      if (success) {
        // Update state preference if selected during login
        if (formData.selectedState) {
          updatePreferences({ selectedState: formData.selectedState as any });
        }
        toast({ title: "Success", description: "Logged in successfully!" });
        navigate(formData.type === 'lawyer' ? '/lawyer-dashboard' : '/dashboard');
      } else {
        toast({ title: "Error", description: t('invalidCredentials'), variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "An error occurred. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="LAWLITE" className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">LAWLITE</CardTitle>
          <CardDescription>{t('welcome')}</CardDescription>
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
                <Label htmlFor="email">{t('email')}</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'border-destructive' : ''} />
                {errors.email && <Alert variant="destructive"><AlertDescription>{errors.email}</AlertDescription></Alert>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} className={errors.password ? 'border-destructive' : ''} />
                {errors.password && <Alert variant="destructive"><AlertDescription>{errors.password}</AlertDescription></Alert>}
              </div>

              {/* State Selection - Optional on login */}
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  Select Your State (optional)
                </Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, selectedState: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">This personalizes your legal content</p>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : t('login')}
              </Button>
              
              <div className="text-center space-y-2">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  {t('forgotPassword')}
                </Link>
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary hover:underline">{t('signup')}</Link>
                </p>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
