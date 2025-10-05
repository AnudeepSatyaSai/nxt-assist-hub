import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Building2, GraduationCap, Loader2 } from 'lucide-react';

export default function Profile() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone_number: profile?.phone_number || '',
    department: profile?.department || '',
    year_of_study: profile?.year_of_study || 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          department: formData.department,
          year_of_study: formData.year_of_study
        })
        .eq('user_id', profile.user_id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Profile updated successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Summary */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <CardTitle>{profile.full_name}</CardTitle>
            <CardDescription>{profile.email}</CardDescription>
            <div className="flex justify-center mt-2">
              <Badge className="capitalize">{profile.role}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                {profile.email}
              </div>
              {profile.phone_number && (
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {profile.phone_number}
                </div>
              )}
              {profile.department && (
                <div className="flex items-center text-muted-foreground">
                  <Building2 className="h-4 w-4 mr-2" />
                  {profile.department}
                </div>
              )}
              {profile.role === 'student' && profile.year_of_study && (
                <div className="flex items-center text-muted-foreground">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Year {profile.year_of_study}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              {profile.role === 'student' && (
                <div className="space-y-2">
                  <Label htmlFor="year_of_study">Year of Study</Label>
                  <Input
                    id="year_of_study"
                    type="number"
                    min="1"
                    max="4"
                    value={formData.year_of_study}
                    onChange={(e) => setFormData({ ...formData, year_of_study: parseInt(e.target.value) })}
                  />
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
