import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface NotificationContextType {
  notifications: any[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user || !profile) return;

    // Set up real-time subscription for ticket status updates
    const channel = supabase
      .channel('ticket-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tickets',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const ticket = payload.new;
          if (payload.old?.status !== ticket.status) {
            const statusMessages = {
              in_progress: 'Your ticket is now being processed',
              resolved: 'Your ticket has been resolved',
              rejected: 'Your ticket has been rejected'
            };

            const message = statusMessages[ticket.status as keyof typeof statusMessages];
            if (message) {
              toast({
                title: 'Ticket Status Update',
                description: `${ticket.title}: ${message}`,
              });

              // Add to notifications list
              const newNotification = {
                id: `ticket-${ticket.id}-${Date.now()}`,
                type: 'ticket_update',
                title: 'Ticket Status Update',
                message: `${ticket.title}: ${message}`,
                read: false,
                created_at: new Date().toISOString(),
                ticket_id: ticket.id
              };

              setNotifications(prev => [newNotification, ...prev]);
              setUnreadCount(prev => prev + 1);
            }
          }
        }
      )
      .subscribe();

    // Set up real-time subscription for new announcements
    const announcementChannel = supabase
      .channel('announcement-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'announcements'
        },
        (payload) => {
          const announcement = payload.new;
          
          toast({
            title: 'New Announcement',
            description: announcement.title,
          });

          // Add to notifications list
          const newNotification = {
            id: `announcement-${announcement.id}-${Date.now()}`,
            type: 'new_announcement',
            title: 'New Announcement',
            message: announcement.title,
            read: false,
            created_at: new Date().toISOString(),
            announcement_id: announcement.id
          };

          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(announcementChannel);
    };
  }, [user, profile, toast]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};