import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Ticket,
  FileText
} from 'lucide-react';

interface Stats {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  avgResolutionTime: string;
  totalPermissions: number;
  pendingPermissions: number;
  approvedPermissions: number;
  totalAnnouncements: number;
}

export default function AdminAnalytics() {
  const [stats, setStats] = useState<Stats>({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    avgResolutionTime: '0',
    totalPermissions: 0,
    pendingPermissions: 0,
    approvedPermissions: 0,
    totalAnnouncements: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [ticketsResult, permissionsResult, announcementsResult] = await Promise.all([
        supabase.from('tickets').select('status, created_at, resolved_at'),
        supabase.from('permission_requests').select('status'),
        supabase.from('announcements').select('id')
      ]);

      const tickets = ticketsResult.data || [];
      const permissions = permissionsResult.data || [];
      const announcements = announcementsResult.data || [];

      // Calculate average resolution time
      const resolvedTickets = tickets.filter(t => t.resolved_at);
      let avgTime = 0;
      if (resolvedTickets.length > 0) {
        const totalTime = resolvedTickets.reduce((sum, ticket) => {
          const created = new Date(ticket.created_at).getTime();
          const resolved = new Date(ticket.resolved_at).getTime();
          return sum + (resolved - created);
        }, 0);
        avgTime = totalTime / resolvedTickets.length / (1000 * 60 * 60); // Convert to hours
      }

      setStats({
        totalTickets: tickets.length,
        openTickets: tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length,
        resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
        avgResolutionTime: avgTime.toFixed(1),
        totalPermissions: permissions.length,
        pendingPermissions: permissions.filter(p => p.status === 'pending').length,
        approvedPermissions: permissions.filter(p => p.status === 'approved').length,
        totalAnnouncements: announcements.length
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">System performance and statistics overview</p>
      </div>

      {/* Tickets Analytics */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Ticket className="h-5 w-5 mr-2" />
          Ticket Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTickets}</div>
              <p className="text-xs text-muted-foreground">All time tickets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open/Active</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.openTickets}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.openTickets / stats.totalTickets) * 100 || 0).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolvedTickets}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.resolvedTickets / stats.totalTickets) * 100 || 0).toFixed(1)}% resolution rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgResolutionTime}h</div>
              <p className="text-xs text-muted-foreground">Average time to resolve</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Permissions Analytics */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Permission Requests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPermissions}</div>
              <p className="text-xs text-muted-foreground">All time requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPermissions}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedPermissions}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.approvedPermissions / stats.totalPermissions) * 100 || 0).toFixed(1)}% approval rate
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            System Overview
          </CardTitle>
          <CardDescription>Overall platform statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Announcements Posted</span>
              <span className="text-2xl font-bold">{stats.totalAnnouncements}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Ticket Resolution Rate</span>
              <span className="text-2xl font-bold">
                {((stats.resolvedTickets / stats.totalTickets) * 100 || 0).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Permission Approval Rate</span>
              <span className="text-2xl font-bold">
                {((stats.approvedPermissions / stats.totalPermissions) * 100 || 0).toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
