import { useState } from 'react';
import { Outlet, Navigate, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import NotificationDropdown from '@/components/NotificationDropdown';
import { 
  Menu, 
  Home, 
  Ticket, 
  Megaphone, 
  FileText, 
  BarChart3, 
  User, 
  LogOut, 
  School,
  MessageCircle
} from 'lucide-react';

export default function Layout() {
  const { user, profile, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/auth" replace />;
  }

  // Check if profile needs completion
  if (profile && (!profile.student_id || !profile.department || !profile.role)) {
    return <Navigate to="/complete-profile" replace />;
  }

  const isActive = (path: string) => location.pathname === path;

  const studentNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Raise Ticket', href: '/tickets/new', icon: Ticket },
    { name: 'My Tickets', href: '/tickets', icon: FileText },
    { name: 'Announcements', href: '/announcements', icon: Megaphone },
    { name: 'Permissions', href: '/permissions', icon: FileText },
    { name: 'AI Assistant', href: '/ai-assistant', icon: MessageCircle },
  ];

  const facultyNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'All Tickets', href: '/admin/tickets', icon: Ticket },
    { name: 'Manage Announcements', href: '/admin/announcements', icon: Megaphone },
    { name: 'Permission Requests', href: '/admin/permissions', icon: FileText },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'AI Assistant', href: '/ai-assistant', icon: MessageCircle },
  ];

  const navigation = profile.role === 'student' ? studentNavigation : facultyNavigation;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="bg-primary rounded-full p-2">
            <School className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold truncate">NIAT BITS</h1>
            <p className="text-xs text-muted-foreground truncate">University Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="px-6 py-4 border-t">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {profile.full_name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{profile.full_name}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {profile.role}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="h-8 w-8 p-0"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <div className="flex flex-col flex-grow bg-card border-r shadow-sm">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <NotificationDropdown
                notifications={[]}
                unreadCount={0}
                markAsRead={() => {}}
                markAllAsRead={() => {}}
              />
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" />
              <NavLink
                to="/profile"
                className="flex items-center space-x-2 hover:bg-accent rounded-md p-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {profile.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline-block text-sm font-medium">
                  {profile.full_name}
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}