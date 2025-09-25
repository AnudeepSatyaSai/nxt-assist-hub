import { useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { 
  School, 
  Ticket, 
  Megaphone, 
  FileText, 
  BarChart3, 
  MessageCircle,
  Users,
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      title: "Ticket Management System",
      description: "Raise tickets for water supply, hostel problems, food quality, cleanliness, repairs, and academic issues. Track status and get updates in real-time.",
      icon: Ticket,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
    },
    {
      title: "Announcements & News",
      description: "Stay updated with college updates, events, club activities, competitions, and important notices from faculty and administration.",
      icon: Megaphone,
      color: "from-green-500 to-emerald-500", 
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
    },
    {
      title: "Permission Requests",
      description: "Request permissions for outings, casual leave, sick leave, and special permissions with easy approval tracking system.",
      icon: FileText,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50"
    },
    {
      title: "Analytics Dashboard",
      description: "Faculty can view ticket analytics, track resolution times, monitor system usage, and generate reports for better management.",
      icon: BarChart3,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50"
    },
    {
      title: "AI Assistant",
      description: "Get instant help with our intelligent AI assistant. Ask questions about raising tickets, permissions, announcements, and system navigation.",
      icon: MessageCircle,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50"
    },
    {
      title: "Role-based Access",
      description: "Secure access control for students, faculty, and administrators with appropriate permissions and privacy protection.",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-50"
    }
  ];

  const benefits = [
    "Real-time ticket tracking and status updates",
    "Organized announcement filtering and categorization",
    "Quick permission approval workflow",
    "Mobile-responsive design for all devices",
    "Secure authentication and data protection",
    "AI-powered assistance and guidance"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3">
              <School className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NIAT BITS Chevella</h1>
              <p className="text-gray-600">Nxtwave Institute of Advanced Technologies</p>
            </div>
          </div>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Link to="/auth">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            University Management System
            <span className="block text-gradient bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              (UMS)
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A smart, comprehensive web-based solution to handle all academic and administrative tasks. 
            Offers a wide range of features for Students, Faculty, and Administrators with an integrated AI assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link to="/auth">
                <Users className="mr-2 h-5 w-5" />
                Student Login
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth">
                <School className="mr-2 h-5 w-5" />
                Faculty Login
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className={`${feature.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <CardHeader>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our UMS?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience a modern, efficient, and user-friendly university management system designed specifically for the needs of NIAT BITS Chevella Campus.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students and faculty members who are already using our University Management System 
            to streamline their academic and administrative tasks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/auth">
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-gray-600 text-sm">
            Need help? Contact{' '}
            <a href="mailto:support@niat.ac.in" className="text-blue-600 hover:underline">
              support@niat.ac.in
            </a>
            {' '}| Developed for NIAT BITS Chevella Campus
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
