import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Send, MapPin } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Contact Form */}
      <Card className="shadow-xl border-0 bg-white hover-lift">
        <CardHeader>
          <CardTitle className="text-2xl">Send us a Message</CardTitle>
          <CardDescription>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background"
                />
              </div>
              <div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background"
                />
              </div>
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-background resize-none"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-primary text-white hover-scale"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card className="shadow-xl border-0 bg-gradient-primary text-white hover-lift">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Information</CardTitle>
            <CardDescription className="text-white/80">
              Reach out to us through any of these channels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Campus Address</h4>
                <p className="text-white/90 text-sm">
                  NIAT BITS Chevella Campus<br />
                  Chevella, Telangara 501503<br />
                  India
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Phone Numbers</h4>
                <p className="text-white/90 text-sm">
                  Admissions: +91 123 456 7890<br />
                  Support: +91 098 765 4321
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Email Address</h4>
                <p className="text-white/90 text-sm">
                  General: info@niat.ac.in<br />
                  Support: support@niat.ac.in<br />
                  Admissions: admissions@niat.ac.in
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-secondary text-white hover-lift">
          <CardContent className="p-6">
            <h4 className="font-semibold text-lg mb-2">Office Hours</h4>
            <div className="space-y-1 text-sm text-white/90">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
