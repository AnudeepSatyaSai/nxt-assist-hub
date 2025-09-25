import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Ticket, 
  Megaphone, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  BarChart3,
  Users,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  pendingPermissions: number;
  totalAnnouncements: number;
}

export default function Dashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    pendingPermissions: 0,
    totalAnnouncements: 0
  });
  const [recentTickets, setRecentTickets] = useState<any[]>([]);
  const [recentAnnouncements, setRecentAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [profile]);

  const fetchDashboardData = async () => {
    if (!profile) return;

    try {
      // Fetch stats based on user role
      if (profile.role === 'student') {
        await fetchStudentStats();
        await fetchStudentRecentData();
      } else {
        await fetchFacultyStats();
        await fetchFacultyRecentData();
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentStats = async () => {
    const [ticketsResult, permissionsResult, announcementsResult] = await Promise.all([
      supabase
        .from('tickets')
        .select('status')
        .eq('user_id', profile.user_id),
      supabase
        .from('permission_requests')
        .select('status')
        .eq('user_id', profile.user_id),
      supabase
        .from('announcements')
        .select('id')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    ]);

    const tickets = ticketsResult.data || [];
    const permissions = permissionsResult.data || [];
    const announcements = announcementsResult.data || [];

    setStats({
      totalTickets: tickets.length,
      openTickets: tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length,
      resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
      pendingPermissions: permissions.filter(p => p.status === 'pending').length,
      totalAnnouncements: announcements.length
    });
  };

  const fetchFacultyStats = async () => {
    const [ticketsResult, permissionsResult, announcementsResult] = await Promise.all([
      supabase
        .from('tickets')
        .select('status'),
      supabase
        .from('permission_requests')
        .select('status'),
      supabase
        .from('announcements')
        .select('id')
    ]);

    const tickets = ticketsResult.data || [];
    const permissions = permissionsResult.data || [];
    const announcements = announcementsResult.data || [];

    setStats({
      totalTickets: tickets.length,
      openTickets: tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length,
      resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
      pendingPermissions: permissions.filter(p => p.status === 'pending').length,
      totalAnnouncements: announcements.length
    });
  };

  const fetchStudentRecentData = async () => {
    const [ticketsResult, announcementsResult] = await Promise.all([
      supabase
        .from('tickets')
        .select(`
          *,
          ticket_categories (name, color)
        `)
        .eq('user_id', profile.user_id)
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('announcements')
        .select(`
          *,
          announcement_categories (name, color, icon)
        `)
        .order('created_at', { ascending: false })
        .limit(5)
    ]);

    setRecentTickets(ticketsResult.data || []);
    setRecentAnnouncements(announcementsResult.data || []);
  };

  const fetchFacultyRecentData = async () => {
    const [ticketsResult, announcementsResult] = await Promise.all([
      supabase
        .from('tickets')
        .select(`
          *,
          ticket_categories (name, color),
          profiles!tickets_user_id_fkey (full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('announcements')
        .select(`
          *,
          announcement_categories (name, color, icon)
        `)
        .order('created_at', { ascending: false })
        .limit(5)
    ]);

    setRecentTickets(ticketsResult.data || []);
    setRecentAnnouncements(announcementsResult.data || []);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'destructive';
      case 'in_progress': return 'default';
      case 'resolved': return 'secondary';
      case 'rejected': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {profile.full_name}!
          </h1>
          <p className="text-muted-foreground">
            {profile.role === 'student' 
              ? 'Manage your tickets, permissions, and stay updated with announcements.' 
              : 'Monitor system activities and manage student requests.'
            }
          </p>
        </div>
        <div className="flex space-x-2">
          {profile.role === 'student' ? (
            <Button asChild>
              <Link to="/tickets/new">
                <Plus className="h-4 w-4 mr-2" />
                Raise Ticket
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to="/admin/announcements/new">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              {profile.role === 'student' ? 'Your tickets' : 'All system tickets'}
            </p>
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
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {profile.role === 'student' ? 'Pending Permissions' : 'Resolved Tickets'}
            </CardTitle>
            {profile.role === 'student' ? (
              <Clock className="h-4 w-4 text-blue-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile.role === 'student' ? stats.pendingPermissions : stats.resolvedTickets}
            </div>
            <p className="text-xs text-muted-foreground">
              {profile.role === 'student' ? 'Awaiting approval' : 'Successfully resolved'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Megaphone className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAnnouncements}</div>
            <p className="text-xs text-muted-foreground">
              {profile.role === 'student' ? 'Recent updates' : 'Total posted'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>
                {profile.role === 'student' ? 'Your latest support requests' : 'Latest system tickets'}
              </CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link to={profile.role === 'student' ? '/tickets' : '/admin/tickets'}>
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentTickets.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No tickets yet</p>
            ) : (
              <div className="space-y-3">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{ticket.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          style={{ backgroundColor: `${ticket.ticket_categories.color}20` }}
                        >
                          {ticket.ticket_categories.name}
                        </Badge>
                        {profile.role !== 'student' && ticket.profiles && (
                          <span className="text-xs text-muted-foreground">
                            by {ticket.profiles.full_name}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Latest Announcements</CardTitle>
              <CardDescription>Important updates and news</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link to="/announcements">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentAnnouncements.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No announcements yet</p>
            ) : (
              <div className="space-y-3">
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{announcement.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {announcement.content}
                        </p>
                      </div>
                      {announcement.is_pinned && (
                        <Badge variant="secondary" className="ml-2">Pinned</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge 
                        variant="outline"
                        style={{ borderColor: announcement.announcement_categories.color }}
                      >
                        {announcement.announcement_categories.name}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.role === 'student' ? (
              <>
                <Button variant="outline" className="h-24 flex-col" asChild>
                  <Link to="/tickets/new">
                    <Plus className="h-6 w-6 mb-2" />
                    Raise Ticket
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col" asChild>
                  <Link to="/permissions/new">
                    <FileText className="h-6 w-6 mb-2" />
                    Request Permission
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col" asChild>
                  <Link to="/announcements">
                    <Megaphone className="h-6 w-6 mb-2" />
                    View Announcements
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col" asChild>
                  <Link to="/ai-assistant">
                    <MessageCircle className="h-6 w-6 mb-2" />
                    AI Assistant
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="h-24 flex-col" asChild>
                  <Link to="/admin/tickets">
                    <Ticket className="h-6 w-6 mb-2" />
                    Manage Tickets
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col" asChild>
                  <Link to="/admin/announcements/new">
                    <Plus className="h-6 w-6 mb-2" />
                    New Announcement
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col" asChild>
                  <Link to="/admin/permissions">
                    <Users className="h-6 w-6 mb-2" />
                    Review Permissions
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col" asChild>
                  <Link to="/admin/analytics">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    View Analytics
                  </Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}