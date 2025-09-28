import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Bed, 
  Users, 
  Wrench, 
  Eye, 
  MapPin, 
  Calendar,
  DollarSign,
  Plus,
  Filter,
  Search,
  Bell
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HostelManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const hostels = [
    {
      id: 1,
      name: 'Garuda Hostel',
      totalRooms: 150,
      occupiedRooms: 142,
      availableRooms: 8,
      warden: 'Dr. Rajesh Kumar',
      address: 'Block A, NIAT Campus',
      facilities: ['WiFi', 'Laundry', 'Gym', 'Mess', 'Library'],
    },
    {
      id: 2,
      name: 'Hamsa Hostel',
      totalRooms: 120,
      occupiedRooms: 115,
      availableRooms: 5,
      warden: 'Mrs. Priya Sharma',
      address: 'Block B, NIAT Campus',
      facilities: ['WiFi', 'Laundry', 'Sports Room', 'Mess', 'Study Hall'],
    },
    {
      id: 3,
      name: 'Peacock Hostel',
      totalRooms: 100,
      occupiedRooms: 85,
      availableRooms: 15,
      warden: 'Mr. Suresh Patel',
      address: 'Block C, NIAT Campus',
      facilities: ['WiFi', 'Laundry', 'Recreation Room', 'Mess'],
    }
  ];

  const maintenanceRequests = [
    {
      id: 1,
      type: 'Electrical',
      room: 'G-201',
      hostel: 'Garuda Hostel',
      priority: 'High',
      status: 'In Progress',
      reportedBy: 'Rahul Kumar',
      date: '2024-01-15',
    },
    {
      id: 2,
      type: 'Plumbing',
      room: 'H-105',
      hostel: 'Hamsa Hostel',
      priority: 'Medium',
      status: 'Reported',
      reportedBy: 'Anita Singh',
      date: '2024-01-14',
    },
    {
      id: 3,
      type: 'Furniture',
      room: 'P-301',
      hostel: 'Peacock Hostel',
      priority: 'Low',
      status: 'Completed',
      reportedBy: 'Vikram Joshi',
      date: '2024-01-12',
    }
  ];

  const roomAllocations = [
    {
      id: 1,
      studentName: 'Arjun Reddy',
      studentId: 'NIAT2024001',
      room: 'G-201',
      hostel: 'Garuda Hostel',
      allocatedDate: '2024-01-01',
      expiryDate: '2024-12-31',
      rent: 8000,
      status: 'Active',
    },
    {
      id: 2,
      studentName: 'Sneha Patel',
      studentId: 'NIAT2024002',
      room: 'H-105',
      hostel: 'Hamsa Hostel',
      allocatedDate: '2024-01-01',
      expiryDate: '2024-12-31',
      rent: 7500,
      status: 'Active',
    },
    {
      id: 3,
      studentName: 'Ravi Kumar',
      studentId: 'NIAT2024003',
      room: 'P-301',
      hostel: 'Peacock Hostel',
      allocatedDate: '2024-01-01',
      expiryDate: '2024-06-30',
      rent: 7000,
      status: 'Expiring Soon',
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'expiring soon': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'expired': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'in progress': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'completed': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'reported': return 'bg-gradient-to-r from-orange-500 to-amber-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'medium': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'low': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Hostel Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive hostel administration and student accommodation management
          </p>
        </div>
        <div className="flex space-x-3">
          <Button className="gradient-primary hover:shadow-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add New Room
          </Button>
          <Button variant="outline" className="hover-lift">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-ocean hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Hostels</p>
                <p className="text-3xl font-bold">{hostels.length}</p>
              </div>
              <Building2 className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-purple hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Rooms</p>
                <p className="text-3xl font-bold">
                  {hostels.reduce((acc, hostel) => acc + hostel.totalRooms, 0)}
                </p>
              </div>
              <Bed className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-teal hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Occupied</p>
                <p className="text-3xl font-bold">
                  {hostels.reduce((acc, hostel) => acc + hostel.occupiedRooms, 0)}
                </p>
              </div>
              <Users className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-orange hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Available</p>
                <p className="text-3xl font-bold">
                  {hostels.reduce((acc, hostel) => acc + hostel.availableRooms, 0)}
                </p>
              </div>
              <Bed className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="overview" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
            <Building2 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="allocations" className="data-[state=active]:gradient-purple data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            Allocations
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:gradient-teal data-[state=active]:text-white">
            <Wrench className="w-4 h-4 mr-2" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="rooms" className="data-[state=active]:gradient-orange data-[state=active]:text-white">
            <Bed className="w-4 h-4 mr-2" />
            Rooms
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {hostels.map((hostel, index) => (
              <Card key={hostel.id} className="hover-lift shadow-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-primary">
                        {hostel.name}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hostel.address}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="hover-glow">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-primary">{hostel.totalRooms}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-green-600">{hostel.occupiedRooms}</p>
                      <p className="text-xs text-muted-foreground">Occupied</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-orange-600">{hostel.availableRooms}</p>
                      <p className="text-xs text-muted-foreground">Available</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Warden</span>
                      <span className="font-medium">{hostel.warden}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Facilities</p>
                      <div className="flex flex-wrap gap-1">
                        {hostel.facilities.map((facility, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className="text-xs hover-scale"
                          >
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Occupancy Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Occupancy</span>
                      <span>{Math.round((hostel.occupiedRooms / hostel.totalRooms) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="gradient-primary h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${(hostel.occupiedRooms / hostel.totalRooms) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Room Allocations Tab */}
        <TabsContent value="allocations" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by student name, ID, or room..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by hostel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hostels</SelectItem>
                {hostels.map(hostel => (
                  <SelectItem key={hostel.id} value={hostel.id.toString()}>
                    {hostel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {roomAllocations.map((allocation, index) => (
              <Card key={allocation.id} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-semibold text-primary">{allocation.studentName}</p>
                        <p className="text-sm text-muted-foreground">{allocation.studentId}</p>
                      </div>
                      <div>
                        <p className="font-medium">{allocation.room}</p>
                        <p className="text-sm text-muted-foreground">{allocation.hostel}</p>
                      </div>
                      <div>
                        <p className="font-medium flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ₹{allocation.rent}/month
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {allocation.allocatedDate} - {allocation.expiryDate}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Badge className={getStatusColor(allocation.status)}>
                          {allocation.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hover-glow">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="gradient-primary">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Maintenance Requests</h3>
            <Button className="gradient-teal">
              <Plus className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>

          <div className="grid gap-4">
            {maintenanceRequests.map((request, index) => (
              <Card key={request.id} className="hover-lift animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-semibold text-primary">{request.type}</p>
                        <p className="text-sm text-muted-foreground">Room {request.room}</p>
                      </div>
                      <div>
                        <p className="font-medium">{request.hostel}</p>
                        <p className="text-sm text-muted-foreground">Reported by {request.reportedBy}</p>
                      </div>
                      <div>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority} Priority
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="hover-glow">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" className="gradient-teal">
                        Update
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Rooms Tab */}
        <TabsContent value="rooms" className="space-y-6">
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Room Management</h3>
            <p className="text-muted-foreground mb-6">
              Detailed room management interface coming soon
            </p>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add New Room
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostelManagement;