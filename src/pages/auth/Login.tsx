import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LANGUAGE_OPTIONS } from '@/i18n';
import { lovable } from '@/integrations/lovable/index';
import logo from '@/assets/logo.png';

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = t('pleaseEnterEmail');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('invalidEmail');
    if (!formData.password) newErrors.password = t('pleaseEnterPassword');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast({ title: t('success'), description: t('loginSuccess') });
        navigate('/dashboard');
      } else {
        toast({ title: t('error'), description: result.error || t('invalidCredentials'), variant: "destructive" });
      }
    } catch {
      toast({ title: t('error'), description: t('errorOccurred'), variant: "destructive" });
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
          <div className="flex justify-center mt-2">
            <Select onValueChange={(v) => i18n.changeLanguage(v)} value={i18n.language}>
              <SelectTrigger className="w-32"><Globe className="h-4 w-4 mr-1" /><SelectValue /></SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>{lang.nativeLabel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('loggingIn') : t('login')}
            </Button>
            <div className="text-center space-y-2">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">{t('forgotPassword')}</Link>
              <p className="text-sm text-muted-foreground">
                {t('dontHaveAccount')}{' '}
                <Link to="/signup" className="text-primary hover:underline">{t('signup')}</Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Are you a lawyer?{' '}
                <Link to="/lawyer-signup" className="text-primary hover:underline font-medium">Register as Lawyer</Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
