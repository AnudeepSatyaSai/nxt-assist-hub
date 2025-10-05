import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

interface PermissionType {
  id: string;
  name: string;
  description: string;
}

export default function CreatePermission() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [permissionTypes, setPermissionTypes] = useState<PermissionType[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    permission_type_id: '',
    from_date: '',
    to_date: ''
  });

  useEffect(() => {
    fetchPermissionTypes();
  }, []);

  const fetchPermissionTypes = async () => {
    const { data } = await supabase
      .from('permission_types')
      .select('id, name, description')
      .order('name');
    if (data) setPermissionTypes(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('permission_requests')
        .insert([{
          user_id: profile.user_id,
          title: formData.title,
          description: formData.description,
          permission_type_id: formData.permission_type_id,
          from_date: formData.from_date ? new Date(formData.from_date).toISOString() : null,
          to_date: formData.to_date ? new Date(formData.to_date).toISOString() : null,
          status: 'pending'
        }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your permission request has been submitted successfully.',
      });
      navigate('/dashboard');
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Permission</CardTitle>
          <CardDescription>
            Submit a permission request for leave, outing, or special permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="permission_type">Permission Type *</Label>
              <Select
                value={formData.permission_type_id}
                onValueChange={(value) => setFormData({ ...formData, permission_type_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select permission type" />
                </SelectTrigger>
                <SelectContent>
                  {permissionTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Brief title for your request"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from_date">From Date</Label>
                <Input
                  id="from_date"
                  type="datetime-local"
                  value={formData.from_date}
                  onChange={(e) => setFormData({ ...formData, from_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to_date">To Date</Label>
                <Input
                  id="to_date"
                  type="datetime-local"
                  value={formData.to_date}
                  onChange={(e) => setFormData({ ...formData, to_date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Reason *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed reason for your permission request..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Request
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
