import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import GoogleMap from '@/components/GoogleMap';
import ContactForm from '@/components/ContactForm';
import ParallaxSection from '@/components/ParallaxSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
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
  CheckCircle,
  Building2,
  GraduationCap,
  Trophy,
  Globe,
  Zap,
  Heart,
  Star,
  TrendingUp,
  BookOpen,
  Smartphone
} from 'lucide-react';
import campusHero from '@/assets/campus-hero.jpg';
import libraryImg from '@/assets/library.jpg';
import computerLabImg from '@/assets/computer-lab.jpg';
import hostelImg from '@/assets/hostel.jpg';
import studentsImg from '@/assets/students.jpg';
import sportsImg from '@/assets/sports.jpg';

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

  const stats = [
    { icon: Users, label: "Students Enrolled", value: "5000+", color: "from-niat-blue to-niat-cyan" },
    { icon: GraduationCap, label: "Expert Faculty", value: "200+", color: "from-niat-purple to-niat-pink" },
    { icon: Trophy, label: "Awards Won", value: "50+", color: "from-niat-orange to-niat-warning" },
    { icon: Globe, label: "Placement Rate", value: "95%", color: "from-niat-success to-niat-teal" }
  ];

  const gallery = [
    { image: libraryImg, title: "Modern Library", description: "State-of-the-art learning resources" },
    { image: computerLabImg, title: "Computer Labs", description: "Advanced technology infrastructure" },
    { image: hostelImg, title: "Hostel Facilities", description: "Comfortable accommodation" },
    { image: studentsImg, title: "Student Life", description: "Vibrant campus community" },
    { image: sportsImg, title: "Sports Complex", description: "World-class athletic facilities" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      image: studentsImg,
      content: "NIAT has transformed my learning experience. The faculty is exceptional and the facilities are world-class.",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Engineering Graduate",
      image: studentsImg,
      content: "The hostel management system and overall infrastructure made my stay comfortable and productive.",
      rating: 5
    },
    {
      name: "Dr. Anita Desai",
      role: "Faculty Member",
      image: studentsImg,
      content: "Teaching at NIAT is rewarding. The institute provides excellent support for both faculty and students.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary rounded-full p-2.5 shadow-primary">
                <School className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">NIAT BITS Chevella</h1>
                <p className="text-xs text-muted-foreground">Nxtwave Institute of Advanced Technologies</p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#home" className="text-sm font-medium text-foreground hover:text-niat-blue transition-colors">Home</a>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-niat-blue transition-colors">About</a>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-niat-blue transition-colors">Features</a>
              <a href="#portfolio" className="text-sm font-medium text-muted-foreground hover:text-niat-blue transition-colors">Portfolio</a>
              <a href="#gallery" className="text-sm font-medium text-muted-foreground hover:text-niat-blue transition-colors">Gallery</a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-niat-blue transition-colors">Testimonials</a>
              <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-niat-blue transition-colors">Contact</a>
            </nav>
            <Button asChild className="bg-gradient-primary text-white hover-scale shadow-primary">
              <Link to="/auth">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={campusHero} 
            alt="NIAT Campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-niat-blue text-white animate-bounce-in">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered University Management
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6 leading-tight animate-fade-in">
              Welcome to
              <span className="block text-gradient gradient-primary bg-clip-text text-transparent">
                NIAT BITS Chevella
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-slide-up">
              Experience the future of education with our comprehensive University Management System. 
              Streamline academics, hostel life, and administration with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Button size="lg" asChild className="bg-gradient-primary text-white hover-scale shadow-primary text-lg px-8">
                <Link to="/auth">
                  <Users className="mr-2 h-5 w-5" />
                  Student Portal
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-2 hover-lift text-lg px-8">
                <Link to="/auth">
                  <School className="mr-2 h-5 w-5" />
                  Faculty Login
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-niat-blue rounded-full flex justify-center">
            <div className="w-1 h-3 bg-niat-blue rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2">{stat.value}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-niat-purple text-white">
              <Heart className="h-3 w-3 mr-1" />
              About NIAT
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Empowering Future Innovators
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At Nxtwave Institute of Advanced Technologies, we blend cutting-edge education 
              with practical experience to create tomorrow's technology leaders.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-niat-blue/10 to-niat-cyan/10 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-niat-blue to-niat-cyan flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Industry-aligned curriculum designed by experts, ensuring students gain relevant skills for the modern workplace.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-niat-purple/10 to-niat-pink/10 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-niat-purple to-niat-pink flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  AI-powered management system streamlining every aspect of campus life from academics to hostel management.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-niat-success/10 to-niat-teal/10 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-niat-success to-niat-teal flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Career Success</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  95% placement rate with top companies. Our graduates are making waves in the tech industry worldwide.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-niat-orange text-white">
              <Zap className="h-3 w-3 mr-1" />
              Platform Features
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Comprehensive Management Suite
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage university life efficiently in one powerful platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`${feature.bgColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in hover-glow cursor-pointer group`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => window.location.href = '/auth'}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:scale-110`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                  <Button asChild className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <Link to="/auth">
                      Access Feature
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-niat-teal text-white">
              <Building2 className="h-3 w-3 mr-1" />
              Campus Tour
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore Our Campus
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take a virtual tour of our state-of-the-art facilities and vibrant campus life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <Card 
                key={index} 
                className="overflow-hidden shadow-xl border-0 hover-lift group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection 
        backgroundImage={computerLabImg}
        title="Innovation Meets Education"
        subtitle="Experience cutting-edge learning in state-of-the-art facilities"
        ctaText="Explore Programs"
        ctaLink="/auth"
      />

      {/* Portfolio/Projects Section */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-niat-orange text-white">
              <Trophy className="h-3 w-3 mr-1" />
              Student Projects
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Innovation Showcase
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover groundbreaking projects developed by our talented students
            </p>
          </div>
          <PortfolioSection />
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-niat-pink text-white">
              <Star className="h-3 w-3 mr-1" />
              Testimonials
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Community Says
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real feedback from students, faculty, and alumni
            </p>
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-primary text-white p-12 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Why Choose NIAT?</h3>
                <p className="text-white/90 text-lg mb-8">
                  Experience a modern, efficient, and user-friendly university management system designed 
                  specifically for the needs of NIAT BITS Chevella Campus.
                </p>
                <Button size="lg" variant="secondary" asChild className="w-fit hover-scale">
                  <Link to="/auth">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="p-12 bg-muted/30">
                <div className="grid gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3 animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-niat-success to-niat-teal flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-niat-cyan text-white">
              <Globe className="h-3 w-3 mr-1" />
              Visit Us
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find Our Campus
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Located in the heart of Chevella, our campus is easily accessible and surrounded by natural beauty
            </p>
          </div>
          <GoogleMap />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-niat-indigo text-white">
              <MessageCircle className="h-3 w-3 mr-1" />
              Get in Touch
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-sunset text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Education?</h3>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students and faculty members who are already using our University Management System 
              to streamline their academic and administrative tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="hover-scale shadow-intense text-lg px-8">
                <Link to="/auth">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-niat-blue hover-scale text-lg px-8" asChild>
                <Link to="/auth">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-primary rounded-full p-2">
                  <School className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">NIAT</h4>
                  <p className="text-xs text-gray-400">BITS Chevella</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Empowering future innovators with cutting-edge technology education.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Student Portal</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">Faculty Login</Link></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Chevella, Telangana 501503</li>
                <li>+91 123 456 7890</li>
                <li>
                  <a href="mailto:info@niat.ac.in" className="hover:text-white transition-colors">
                    info@niat.ac.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2025 NIAT BITS Chevella. All rights reserved. | Developed with ❤️ for Excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
