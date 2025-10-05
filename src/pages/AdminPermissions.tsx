import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, User, Calendar, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PermissionRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  from_date: string;
  to_date: string;
  created_at: string;
  user_id: string;
  permission_types: { name: string; color: string };
}

interface Profile {
  full_name: string;
  email: string;
}

export default function AdminPermissions() {
  const [requests, setRequests] = useState<PermissionRequest[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<PermissionRequest | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data: requestsData, error: requestsError } = await supabase
        .from('permission_requests')
        .select(`
          *,
          permission_types!inner (name, color)
        `)
        .order('created_at', { ascending: false });

      if (requestsError) throw requestsError;

      // Fetch profiles separately
      const userIds = [...new Set(requestsData?.map(r => r.user_id) || [])];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, full_name, email')
        .in('user_id', userIds);

      // Create profiles lookup
      const profilesMap: Record<string, Profile> = {};
      profilesData?.forEach(p => {
        profilesMap[p.user_id] = { full_name: p.full_name, email: p.email };
      });

      setRequests(requestsData || []);
      setProfiles(profilesMap);
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

  const handleAction = async () => {
    if (!selectedRequest || !actionType) return;

    try {
      const { error } = await supabase
        .from('permission_requests')
        .update({ 
          status: actionType === 'approve' ? 'approved' : 'rejected',
          approval_notes: approvalNotes
        })
        .eq('id', selectedRequest.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Permission ${actionType === 'approve' ? 'approved' : 'rejected'} successfully.`,
      });
      
      setSelectedRequest(null);
      setApprovalNotes('');
      setActionType(null);
      fetchRequests();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      pending: 'default',
      approved: 'secondary',
      rejected: 'destructive',
    };
    return variants[status] || 'secondary';
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Permission Requests</h1>
          <p className="text-muted-foreground">Review and approve student permission requests</p>
        </div>
      </div>

      <Tabs defaultValue="pending" value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4 mt-6">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No permission requests found
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {profiles[request.user_id]?.full_name || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(request.created_at).toLocaleDateString()}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        style={{ backgroundColor: `${request.permission_types.color}20`, color: request.permission_types.color }}
                      >
                        {request.permission_types.name}
                      </Badge>
                      <Badge variant={getStatusBadge(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                  {request.from_date && request.to_date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(request.from_date).toLocaleDateString()} - {new Date(request.to_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedRequest(request);
                          setActionType('approve');
                        }}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedRequest(request);
                          setActionType('reject');
                        }}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve' : 'Reject'} Permission Request
            </DialogTitle>
            <DialogDescription>
              Add notes about your decision (optional)
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Add your notes here..."
            value={approvalNotes}
            onChange={(e) => setApprovalNotes(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>
              Cancel
            </Button>
            <Button onClick={handleAction}>
              Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
