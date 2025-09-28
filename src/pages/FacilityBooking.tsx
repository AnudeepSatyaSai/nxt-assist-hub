import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Projector, 
  Mic, 
  Wifi, 
  Car, 
  Building,
  Book,
  Play,
  Plus,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock3
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const FacilityBooking = () => {
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const facilities = [
    {
      id: 1,
      name: 'Main Auditorium',
      type: 'auditorium',
      capacity: 500,
      location: 'Academic Block A',
      hourlyRate: 2000,
      equipment: ['Projector', 'Sound System', 'Microphones', 'AC', 'WiFi'],
      availability: 'Available',
      image: '/api/placeholder/300/200',
      description: 'State-of-the-art auditorium with modern AV equipment and comfortable seating.'
    },
    {
      id: 2,
      name: 'Computer Lab 1',
      type: 'lab',
      capacity: 60,
      location: 'Tech Building, 2nd Floor',
      hourlyRate: 800,
      equipment: ['60 Computers', 'Projector', 'Whiteboard', 'AC', 'WiFi'],
      availability: 'Occupied',
      image: '/api/placeholder/300/200',
      description: 'Fully equipped computer laboratory with latest software and high-speed internet.'
    },
    {
      id: 3,
      name: 'Conference Room A',
      type: 'conference',
      capacity: 25,
      location: 'Admin Building, 3rd Floor',
      hourlyRate: 500,
      equipment: ['Video Conferencing', 'Projector', 'Whiteboard', 'AC', 'WiFi'],
      availability: 'Available',
      image: '/api/placeholder/300/200',
      description: 'Professional conference room ideal for meetings and presentations.'
    },
    {
      id: 4,
      name: 'Sports Complex',
      type: 'sports',
      capacity: 200,
      location: 'Sports Ground',
      hourlyRate: 1500,
      equipment: ['Basketball Court', 'Volleyball Court', 'Changing Rooms', 'Lighting'],
      availability: 'Available',
      image: '/api/placeholder/300/200',
      description: 'Multi-purpose sports facility with indoor and outdoor courts.'
    },
    {
      id: 5,
      name: 'Library Study Hall',
      type: 'library_room',
      capacity: 100,
      location: 'Central Library, Ground Floor',
      hourlyRate: 300,
      equipment: ['Study Tables', 'WiFi', 'Charging Points', 'AC', 'Silent Zone'],
      availability: 'Available',
      image: '/api/placeholder/300/200',
      description: 'Quiet study environment with dedicated seating and research facilities.'
    },
    {
      id: 6,
      name: 'Seminar Hall B',
      type: 'classroom',
      capacity: 80,
      location: 'Academic Block B, 1st Floor',
      hourlyRate: 600,
      equipment: ['Smart Board', 'Projector', 'Microphone', 'AC', 'WiFi'],
      availability: 'Available',
      image: '/api/placeholder/300/200',
      description: 'Modern classroom with smart board and multimedia capabilities.'
    }
  ];

  const bookings = [
    {
      id: 1,
      facilityName: 'Main Auditorium',
      studentName: 'Rahul Kumar',
      purpose: 'Tech Talk Event',
      date: '2024-01-20',
      time: '10:00 AM - 2:00 PM',
      status: 'Approved',
      attendees: 150
    },
    {
      id: 2,
      facilityName: 'Conference Room A',
      studentName: 'Priya Sharma',
      purpose: 'Project Presentation',
      date: '2024-01-18',
      time: '2:00 PM - 4:00 PM',
      status: 'Pending',
      attendees: 20
    },
    {
      id: 3,
      facilityName: 'Sports Complex',
      studentName: 'Vikram Singh',
      purpose: 'Inter-College Tournament',
      date: '2024-01-22',
      time: '9:00 AM - 6:00 PM',
      status: 'Rejected',
      attendees: 100
    }
  ];

  const getFacilityIcon = (type: string) => {
    switch (type) {
      case 'auditorium': return <Building className="w-5 h-5" />;
      case 'lab': return <Projector className="w-5 h-5" />;
      case 'conference': return <Users className="w-5 h-5" />;
      case 'sports': return <Play className="w-5 h-5" />;
      case 'library_room': return <Book className="w-5 h-5" />;
      case 'classroom': return <Calendar className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'occupied': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'maintenance': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'approved': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'pending': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'rejected': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getEquipmentIcon = (equipment: string) => {
    if (equipment.toLowerCase().includes('projector')) return <Projector className="w-4 h-4" />;
    if (equipment.toLowerCase().includes('microphone') || equipment.toLowerCase().includes('sound')) return <Mic className="w-4 h-4" />;
    if (equipment.toLowerCase().includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (equipment.toLowerCase().includes('car') || equipment.toLowerCase().includes('parking')) return <Car className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Facility Booking
          </h1>
          <p className="text-muted-foreground mt-2">
            Reserve campus facilities for events, meetings, and academic activities
          </p>
        </div>
        <div className="flex space-x-3">
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-purple hover:shadow-purple">
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Book Facility</DialogTitle>
                <DialogDescription>
                  Fill in the details to book a campus facility
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Facility</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a facility" />
                    </SelectTrigger>
                    <SelectContent>
                      {facilities.filter(f => f.availability === 'Available').map(facility => (
                        <SelectItem key={facility.id} value={facility.id.toString()}>
                          {facility.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Duration (hours)</Label>
                  <Input type="number" placeholder="Number of hours" />
                </div>
                <div className="space-y-2">
                  <Label>Purpose</Label>
                  <Input placeholder="Event/meeting purpose" />
                </div>
                <div className="space-y-2">
                  <Label>Expected Attendees</Label>
                  <Input type="number" placeholder="Number of attendees" />
                </div>
                <div className="space-y-2">
                  <Label>Special Requirements</Label>
                  <Textarea placeholder="Any special equipment or setup needed..." />
                </div>
                <Button className="w-full gradient-purple">
                  Submit Booking Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="hover-lift">
            <Eye className="w-4 h-4 mr-2" />
            My Bookings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-ocean hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Facilities</p>
                <p className="text-3xl font-bold">{facilities.length}</p>
              </div>
              <Building className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-teal hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Available Now</p>
                <p className="text-3xl font-bold">
                  {facilities.filter(f => f.availability === 'Available').length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-orange hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Occupied</p>
                <p className="text-3xl font-bold">
                  {facilities.filter(f => f.availability === 'Occupied').length}
                </p>
              </div>
              <XCircle className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-purple hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">My Bookings</p>
                <p className="text-3xl font-bold">{bookings.length}</p>
              </div>
              <Calendar className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search facilities..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Facility Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="auditorium">Auditorium</SelectItem>
            <SelectItem value="lab">Laboratory</SelectItem>
            <SelectItem value="conference">Conference Room</SelectItem>
            <SelectItem value="sports">Sports Facility</SelectItem>
            <SelectItem value="library_room">Library Room</SelectItem>
            <SelectItem value="classroom">Classroom</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility, index) => (
          <Card 
            key={facility.id} 
            className="hover-lift animate-fade-in overflow-hidden" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                {getFacilityIcon(facility.type)}
                <p className="text-sm text-muted-foreground mt-2">Facility Image</p>
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold text-primary flex items-center">
                    {getFacilityIcon(facility.type)}
                    <span className="ml-2">{facility.name}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {facility.location}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(facility.availability)}>
                  {facility.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{facility.description}</p>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span>{facility.capacity} capacity</span>
                </div>
                <div className="font-semibold text-primary">
                  ₹{facility.hourlyRate}/hour
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Equipment & Amenities</p>
                <div className="flex flex-wrap gap-1">
                  {facility.equipment.slice(0, 4).map((equipment, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs flex items-center">
                      {getEquipmentIcon(equipment)}
                      <span className="ml-1">{equipment}</span>
                    </Badge>
                  ))}
                  {facility.equipment.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{facility.equipment.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 hover-glow"
                  onClick={() => setSelectedFacility(facility)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button 
                  className={`flex-1 ${
                    facility.availability === 'Available' 
                      ? 'gradient-purple' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  disabled={facility.availability !== 'Available'}
                  onClick={() => {
                    setSelectedFacility(facility);
                    setIsBookingOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* My Bookings Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">My Recent Bookings</h3>
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <Card key={booking.id} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="font-semibold text-primary">{booking.facilityName}</p>
                      <p className="text-sm text-muted-foreground">{booking.purpose}</p>
                    </div>
                    <div>
                      <p className="font-medium flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {booking.date}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock3 className="w-4 h-4 mr-1" />
                        {booking.time}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {booking.attendees} attendees
                      </p>
                      <p className="text-sm text-muted-foreground">Expected</p>
                    </div>
                    <div className="flex items-center">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hover-glow">
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                    {booking.status === 'Approved' && (
                      <Button size="sm" className="gradient-teal">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Check-in
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilityBooking;