import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const GoogleMap = () => {
  const { toast } = useToast();
  const [mapKey, setMapKey] = useState('');
  const [showInput, setShowInput] = useState(false);

  // NIAT BITS Chevella location (approximate)
  const location = {
    lat: 17.3850,
    lng: 77.9333,
    name: "NIAT BITS Chevella Campus",
    address: "Chevella, Telangana 501503, India"
  };

  const handleSaveKey = () => {
    if (mapKey.trim()) {
      localStorage.setItem('google_maps_key', mapKey);
      toast({
        title: "Success",
        description: "Google Maps API key saved successfully",
      });
      setShowInput(false);
    }
  };

  const savedKey = localStorage.getItem('google_maps_key');
  const mapUrl = savedKey 
    ? `https://www.google.com/maps/embed/v1/place?key=${savedKey}&q=${location.lat},${location.lng}&zoom=15`
    : null;

  return (
    <Card className="overflow-hidden shadow-xl border-0 bg-white">
      <div className="aspect-video relative bg-gradient-to-br from-niat-blue/10 to-niat-indigo/10">
        {mapUrl ? (
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
            className="absolute inset-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <MapPin className="h-16 w-16 text-niat-blue mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Campus Location</h3>
              <p className="text-muted-foreground mb-4">
                {location.name}<br />
                {location.address}
              </p>
              {!showInput ? (
                <Button 
                  onClick={() => setShowInput(true)}
                  className="bg-gradient-primary text-white"
                >
                  Load Interactive Map
                </Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Enter your Google Maps API key to display the map
                  </p>
                  <Input
                    type="text"
                    placeholder="Google Maps API Key"
                    value={mapKey}
                    onChange={(e) => setMapKey(e.target.value)}
                    className="bg-white"
                  />
                  <Button onClick={handleSaveKey} className="w-full bg-gradient-primary">
                    Save & Load Map
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Get your API key from{' '}
                    <a 
                      href="https://console.cloud.google.com/google/maps-apis" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-niat-blue hover:underline"
                    >
                      Google Cloud Console
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 bg-gradient-to-r from-niat-blue to-niat-indigo text-white">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-1">{location.name}</h4>
            <p className="text-sm opacity-90">{location.address}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GoogleMap;
