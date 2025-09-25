import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Megaphone, 
  Pin, 
  Search, 
  Calendar,
  Filter,
  Eye
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  expires_at?: string;
  announcement_categories: {
    name: string;
    color: string;
    icon: string;
  };
  profiles?: {
    full_name: string;
  };
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAnnouncements();
  }, [announcements, searchQuery, selectedCategory]);

  const fetchData = async () => {
    try {
      const [announcementsResult, categoriesResult] = await Promise.all([
        supabase
          .from('announcements')
          .select(`
            *,
            announcement_categories (name, color, icon)
          `)
          .order('is_pinned', { ascending: false })
          .order('created_at', { ascending: false }),
        supabase
          .from('announcement_categories')
          .select('*')
      ]);

      if (announcementsResult.error) throw announcementsResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      const announcements = announcementsResult.data || [];
      
      // Fetch profile data for each announcement
      const announcementsWithProfiles = await Promise.all(
        announcements.map(async (announcement: any) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('user_id', announcement.user_id)
            .single();
          
          return {
            ...announcement,
            profiles: profile
          };
        })
      );

      setAnnouncements(announcementsWithProfiles || []);
      setCategories(categoriesResult.data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast({
        title: "Error",
        description: "Failed to load announcements. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAnnouncements = () => {
    let filtered = announcements;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(announcement =>
        announcement.announcement_categories.name === selectedCategory
      );
    }

    setFilteredAnnouncements(filtered);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center">
            <Megaphone className="h-6 w-6 mr-2" />
            Announcements
          </h1>
          <p className="text-muted-foreground">
            Stay updated with the latest college news, events, and important notices
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search announcements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No announcements found</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Try adjusting your filters to see more results.'
                  : 'There are no announcements to display at this time.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={`${
              announcement.is_pinned ? 'ring-2 ring-yellow-200 bg-yellow-50/50' : ''
            } hover:shadow-md transition-shadow`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {announcement.is_pinned && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Pin className="h-3 w-3 mr-1" />
                          Pinned
                        </Badge>
                      )}
                      <Badge 
                        variant="outline"
                        style={{ 
                          borderColor: announcement.announcement_categories.color,
                          color: announcement.announcement_categories.color 
                        }}
                      >
                        {announcement.announcement_categories.name}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-2">
                      <span>by {announcement.profiles?.full_name || 'Unknown'}</span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground whitespace-pre-wrap">
                    {announcement.content.length > 300 
                      ? `${announcement.content.substring(0, 300)}...`
                      : announcement.content
                    }
                  </p>
                </div>
                {announcement.content.length > 300 && (
                  <Button variant="link" className="mt-2 p-0 h-auto">
                    <Eye className="h-3 w-3 mr-1" />
                    Read more
                  </Button>
                )}
                {announcement.expires_at && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm text-amber-700">
                      ⏰ This announcement expires on{' '}
                      {new Date(announcement.expires_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}