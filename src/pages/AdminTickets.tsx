import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, XCircle, User, Calendar } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  user_id: string;
  ticket_categories: { name: string; color: string };
}

interface Profile {
  full_name: string;
  email: string;
}

export default function AdminTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data: ticketsData, error: ticketsError } = await supabase
        .from('tickets')
        .select(`
          *,
          ticket_categories!inner (name, color)
        `)
        .order('created_at', { ascending: false });

      if (ticketsError) throw ticketsError;

      // Fetch profiles separately
      const userIds = [...new Set(ticketsData?.map(t => t.user_id) || [])];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, full_name, email')
        .in('user_id', userIds);

      // Create profiles lookup
      const profilesMap: Record<string, Profile> = {};
      profilesData?.forEach(p => {
        profilesMap[p.user_id] = { full_name: p.full_name, email: p.email };
      });

      setTickets(ticketsData || []);
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

  const updateTicketStatus = async (ticketId: string, newStatus: 'open' | 'in_progress' | 'resolved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ 
          status: newStatus,
          resolved_at: newStatus === 'resolved' ? new Date().toISOString() : null
        })
        .eq('id', ticketId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Ticket status updated successfully.',
      });
      fetchTickets();
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
      open: 'destructive',
      in_progress: 'default',
      resolved: 'secondary',
      rejected: 'outline',
    };
    return variants[status] || 'secondary';
  };

  const getPriorityColor = (priority: string) => {
    const colors: any = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-orange-600',
      urgent: 'text-red-600',
    };
    return colors[priority] || 'text-gray-600';
  };

  const filteredTickets = filter === 'all' 
    ? tickets 
    : tickets.filter(t => t.status === filter);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Tickets</h1>
          <p className="text-muted-foreground">Review and respond to student tickets</p>
        </div>
      </div>

      <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4 mt-6">
          {filteredTickets.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No tickets found
              </CardContent>
            </Card>
          ) : (
            filteredTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{ticket.title}</CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {profiles[ticket.user_id]?.full_name || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        style={{ backgroundColor: `${ticket.ticket_categories.color}20`, color: ticket.ticket_categories.color }}
                      >
                        {ticket.ticket_categories.name}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge variant={getStatusBadge(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{ticket.description}</p>
                  <div className="flex gap-2">
                    {ticket.status !== 'in_progress' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Mark In Progress
                      </Button>
                    )}
                    {ticket.status !== 'resolved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark Resolved
                      </Button>
                    )}
                    {ticket.status !== 'rejected' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateTicketStatus(ticket.id, 'rejected')}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
