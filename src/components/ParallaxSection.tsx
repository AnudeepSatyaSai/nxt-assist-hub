import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';

interface ParallaxSectionProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

const ParallaxSection = ({ backgroundImage, title, subtitle, ctaText, ctaLink }: ParallaxSectionProps) => {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const offset = (scrolled - rect.top) * 0.5;
        setOffsetY(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative h-[500px] overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-4 animate-fade-in">
            {title}
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up">
            {subtitle}
          </p>
          {ctaText && ctaLink && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Button size="lg" asChild className="bg-white text-niat-blue hover:bg-gray-100 hover-scale shadow-intense">
                <Link to={ctaLink}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-niat-blue hover-scale">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Video
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;
