import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Code, Smartphone, Globe, Brain, Database } from 'lucide-react';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'data', label: 'Data Science' }
  ];

  const projects = [
    {
      id: 1,
      title: "Smart Campus Management",
      category: 'web',
      description: "AI-powered university management system with real-time analytics",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["React", "Node.js", "AI"],
      icon: Globe
    },
    {
      id: 2,
      title: "Mobile Learning Platform",
      category: 'mobile',
      description: "Cross-platform educational app with offline capabilities",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      tags: ["React Native", "Firebase"],
      icon: Smartphone
    },
    {
      id: 3,
      title: "Student Performance Predictor",
      category: 'ai',
      description: "Machine learning model for academic performance analysis",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["Python", "TensorFlow", "ML"],
      icon: Brain
    },
    {
      id: 4,
      title: "Campus IoT Network",
      category: 'data',
      description: "IoT-based smart campus infrastructure monitoring",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      tags: ["IoT", "Python", "Analytics"],
      icon: Database
    },
    {
      id: 5,
      title: "Virtual Lab Simulator",
      category: 'web',
      description: "Interactive 3D laboratory experiments platform",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&q=80",
      tags: ["Three.js", "WebGL", "React"],
      icon: Code
    },
    {
      id: 6,
      title: "Placement Analytics Dashboard",
      category: 'data',
      description: "Real-time recruitment and placement tracking system",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["D3.js", "PostgreSQL", "Analytics"],
      icon: Database
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeFilter === category.id ? "default" : "outline"}
            onClick={() => setActiveFilter(category.id)}
            className={`transition-all duration-300 ${
              activeFilter === category.id 
                ? 'bg-gradient-primary text-white shadow-primary' 
                : 'hover-scale'
            }`}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <Card 
            key={project.id}
            className="group overflow-hidden shadow-xl border-0 hover-lift animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button size="lg" variant="secondary" className="hover-scale">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View Project
                </Button>
              </div>
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <project.icon className="h-5 w-5 text-niat-blue" />
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-niat-blue transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
