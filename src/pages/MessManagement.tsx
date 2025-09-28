import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  UtensilsCrossed, 
  Calendar, 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Users,
  ChefHat,
  Apple,
  Coffee,
  Plus,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MessManagement = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [rating, setRating] = useState(0);

  const weeklyMenu = {
    monday: {
      breakfast: ['Idli', 'Sambhar', 'Coconut Chutney', 'Tea/Coffee'],
      lunch: ['Rice', 'Dal', 'Sabzi', 'Roti', 'Pickle', 'Curd'],
      dinner: ['Chapati', 'Paneer Curry', 'Rice', 'Dal', 'Salad']
    },
    tuesday: {
      breakfast: ['Upma', 'Chana Dal', 'Green Chutney', 'Tea/Coffee'],
      lunch: ['Pulao', 'Rajma', 'Roti', 'Raita', 'Papad'],
      dinner: ['Rice', 'Chicken Curry', 'Chapati', 'Dal', 'Pickle']
    },
    wednesday: {
      breakfast: ['Poha', 'Boiled Eggs', 'Bread', 'Tea/Coffee'],
      lunch: ['Jeera Rice', 'Chole', 'Roti', 'Salad', 'Buttermilk'],
      dinner: ['Chapati', 'Fish Curry', 'Rice', 'Dal', 'Vegetables']
    },
    thursday: {
      breakfast: ['Paratha', 'Aloo Sabzi', 'Curd', 'Tea/Coffee'],
      lunch: ['Rice', 'Sambar', 'Dry Sabzi', 'Roti', 'Pickle'],
      dinner: ['Pulao', 'Mutton Curry', 'Roti', 'Raita', 'Salad']
    },
    friday: {
      breakfast: ['Dosa', 'Sambhar', 'Tomato Chutney', 'Tea/Coffee'],
      lunch: ['Biryani', 'Raita', 'Shorba', 'Boiled Egg', 'Pickle'],
      dinner: ['Chapati', 'Dal Makhani', 'Rice', 'Sabzi', 'Salad']
    },
    saturday: {
      breakfast: ['Chole Bhature', 'Pickle', 'Lassi', 'Tea/Coffee'],
      lunch: ['Rice', 'Chicken Curry', 'Roti', 'Dal', 'Salad'],
      dinner: ['Fried Rice', 'Manchurian', 'Soup', 'Noodles']
    },
    sunday: {
      breakfast: ['Puri Sabzi', 'Halwa', 'Pickle', 'Tea/Coffee'],
      lunch: ['Special Thali', 'Sweets', 'Lassi'],
      dinner: ['Pizza', 'Pasta', 'Garlic Bread', 'Cold Drink']
    }
  };

  const feedbacks = [
    {
      id: 1,
      student: 'Rahul Kumar',
      meal: 'Lunch',
      date: '2024-01-15',
      rating: 4,
      feedback: 'Food was good, but could be a bit more spicy.',
      category: 'Taste'
    },
    {
      id: 2,
      student: 'Priya Sharma',
      meal: 'Dinner',
      date: '2024-01-14',
      rating: 5,
      feedback: 'Excellent variety and taste. Keep it up!',
      category: 'Quality'
    },
    {
      id: 3,
      student: 'Vikram Singh',
      meal: 'Breakfast',
      date: '2024-01-14',
      rating: 3,
      feedback: 'Average quality. Could improve the presentation.',
      category: 'Presentation'
    }
  ];

  const messStats = {
    totalStudents: 1250,
    todayAttendance: 1180,
    averageRating: 4.2,
    totalFeedbacks: 456,
    monthlyBudget: 850000,
    dailyCost: 28000
  };

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  const getMealIcon = (meal: string) => {
    switch (meal) {
      case 'breakfast': return <Coffee className="w-4 h-4" />;
      case 'lunch': return <UtensilsCrossed className="w-4 h-4" />;
      case 'dinner': return <ChefHat className="w-4 h-4" />;
      default: return <Apple className="w-4 h-4" />;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Mess Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Daily menu planning, feedback collection, and mess administration
          </p>
        </div>
        <div className="flex space-x-3">
          <Button className="gradient-orange hover:shadow-orange">
            <Plus className="w-4 h-4 mr-2" />
            Update Menu
          </Button>
          <Button variant="outline" className="hover-lift">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="gradient-sunset hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Today's Attendance</p>
                <p className="text-3xl font-bold">{messStats.todayAttendance}</p>
                <p className="text-white/60 text-xs">of {messStats.totalStudents} students</p>
              </div>
              <Users className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-teal hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Average Rating</p>
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold">{messStats.averageRating}</p>
                  <div className="flex">
                    {renderStars(messStats.averageRating)}
                  </div>
                </div>
                <p className="text-white/60 text-xs">From {messStats.totalFeedbacks} reviews</p>
              </div>
              <Star className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-purple hover-lift shadow-elevated">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Daily Cost</p>
                <p className="text-3xl font-bold">₹{messStats.dailyCost.toLocaleString()}</p>
                <p className="text-white/60 text-xs">Monthly: ₹{messStats.monthlyBudget.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-white/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="menu" className="data-[state=active]:gradient-orange data-[state=active]:text-white">
            <UtensilsCrossed className="w-4 h-4 mr-2" />
            Menu
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:gradient-teal data-[state=active]:text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:gradient-purple data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:gradient-pink data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Weekly Menu Tab */}
        <TabsContent value="menu" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Weekly Menu</h3>
            <div className="flex space-x-2">
              <Select value={selectedMeal} onValueChange={setSelectedMeal}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select meal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">
                    <div className="flex items-center">
                      <Coffee className="w-4 h-4 mr-2" />
                      Breakfast
                    </div>
                  </SelectItem>
                  <SelectItem value="lunch">
                    <div className="flex items-center">
                      <UtensilsCrossed className="w-4 h-4 mr-2" />
                      Lunch
                    </div>
                  </SelectItem>
                  <SelectItem value="dinner">
                    <div className="flex items-center">
                      <ChefHat className="w-4 h-4 mr-2" />
                      Dinner
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {Object.entries(weeklyMenu).map(([day, meals], index) => (
              <Card 
                key={day} 
                className={`hover-lift animate-fade-in ${
                  day === getCurrentDay() ? 'ring-2 ring-primary shadow-primary' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg capitalize flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {day}
                    {day === getCurrentDay() && (
                      <Badge className="ml-2 gradient-primary text-white text-xs">Today</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(meals).map(([mealType, items]) => {
                    if (selectedMeal === 'all' || mealType === selectedMeal) {
                      return (
                        <div key={mealType} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            {getMealIcon(mealType)}
                            <span className="font-semibold capitalize text-sm">
                              {mealType}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {(items as string[]).map((item, idx) => (
                              <div
                                key={idx}
                                className="text-sm text-muted-foreground bg-muted/50 rounded px-2 py-1"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Feedback Form */}
            <Card className="lg:w-1/3 hover-lift">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Submit Feedback</CardTitle>
                <CardDescription>
                  Help us improve our mess service with your valuable feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Overall Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= rating 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <Textarea
                  placeholder="Share your feedback about food quality, taste, variety, service..."
                  className="min-h-24"
                />

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Feedback category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quality">Food Quality</SelectItem>
                    <SelectItem value="taste">Taste</SelectItem>
                    <SelectItem value="variety">Variety</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="hygiene">Hygiene</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full gradient-teal">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Recent Feedbacks */}
            <div className="lg:w-2/3 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Recent Feedbacks</h3>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {feedbacks.map((feedback, index) => (
                  <Card key={feedback.id} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                            {feedback.student.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold">{feedback.student}</p>
                            <p className="text-sm text-muted-foreground">
                              {feedback.meal} • {feedback.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {renderStars(feedback.rating)}
                          </div>
                          <Badge variant="outline">{feedback.category}</Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{feedback.feedback}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <ThumbsDown className="w-4 h-4 mr-1" />
                            Not Helpful
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Attendance Tracking</h3>
            <p className="text-muted-foreground mb-6">
              Daily mess attendance and meal consumption analytics
            </p>
            <Button className="gradient-purple">
              <Clock className="w-4 h-4 mr-2" />
              View Attendance Reports
            </Button>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mess Analytics</h3>
            <p className="text-muted-foreground mb-6">
              Detailed analytics on food consumption, costs, and satisfaction ratings
            </p>
            <Button className="gradient-pink">
              <TrendingUp className="w-4 h-4 mr-2" />
              Generate Reports
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessManagement;