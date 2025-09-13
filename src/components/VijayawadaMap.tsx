import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Zap } from "lucide-react";

const VijayawadaMap = ({ 
  showControls = true, 
  height = "400px",
  onLocationSelect = null 
}) => {
  const mapRef = useRef(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [map, setMap] = useState(null);

  // Vijayawada coordinates
  const vijayawadaCenter: [number, number] = [80.6480, 16.5062];

  // Major bus stops and landmarks in Vijayawada
  const busStops = [
    { name: "Pandit Nehru Bus Station", coords: [80.6204, 16.5073] as [number, number], type: "major" },
    { name: "Benz Circle", coords: [80.6298, 16.5108] as [number, number], type: "landmark" },
    { name: "Governorpet", coords: [80.6112, 16.5087] as [number, number], type: "stop" },
    { name: "MG Road", coords: [80.6234, 16.5045] as [number, number], type: "stop" },
    { name: "Krishna Lanka", coords: [80.6445, 16.5156] as [number, number], type: "stop" },
    { name: "Patamata", coords: [80.6789, 16.5234] as [number, number], type: "stop" },
    { name: "Gunadala", coords: [80.5987, 16.4987] as [number, number], type: "stop" },
    { name: "One Town", coords: [80.6156, 16.5023] as [number, number], type: "stop" },
    { name: "Railway Station", coords: [80.6181, 16.5161] as [number, number], type: "major" },
    { name: "Kaleswara Rao Market", coords: [80.6267, 16.5089] as [number, number], type: "landmark" }
  ];

  const initializeMapbox = async () => {
    if (!mapboxToken) return;

    try {
      // Dynamically import mapbox-gl
      const mapboxgl = await import('mapbox-gl');
      
      mapboxgl.default.accessToken = mapboxToken;

      const mapInstance = new mapboxgl.default.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: vijayawadaCenter,
        zoom: 13,
        bearing: 0,
        pitch: 30
      });

      // Add navigation controls
      mapInstance.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

      // Wait for map to load
      mapInstance.on('load', () => {
        // Add bus stops as markers
        busStops.forEach(stop => {
          const markerColor = stop.type === 'major' ? '#4F772D' : 
                            stop.type === 'landmark' ? '#90A955' : '#31572C';
          
          const marker = new mapboxgl.default.Marker({
            color: markerColor,
            scale: stop.type === 'major' ? 1.2 : 0.8
          })
          .setLngLat(stop.coords)
          .setPopup(
            new mapboxgl.default.Popup({ offset: 25 })
            .setHTML(`<div class="p-2"><strong>${stop.name}</strong></div>`)
          )
          .addTo(mapInstance);

          // Add click handler for location selection
          if (onLocationSelect) {
            marker.getElement().addEventListener('click', () => {
              onLocationSelect(stop.name, stop.coords);
            });
          }
        });

        // Add a sample bus route line
        mapInstance.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [80.6204, 16.5073], // Bus Station
                [80.6298, 16.5108], // Benz Circle
                [80.6445, 16.5156], // Krishna Lanka
                [80.6789, 16.5234]  // Patamata
              ]
            }
          }
        });

        mapInstance.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#4F772D',
            'line-width': 4,
            'line-opacity': 0.8
          }
        });

        // Animate a bus along the route
        const busMarker = new mapboxgl.default.Marker({
          element: createBusIcon(),
          anchor: 'center'
        })
        .setLngLat([80.6204, 16.5073] as [number, number])
        .addTo(mapInstance);

        animateBus(busMarker);
      });

      setMap(mapInstance);
      setShowTokenInput(false);

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const createBusIcon = () => {
    const div = document.createElement('div');
    div.innerHTML = '🚌';
    div.style.fontSize = '20px';
    div.style.cursor = 'pointer';
    return div;
  };

  const animateBus = (marker) => {
    const route: [number, number][] = [
      [80.6204, 16.5073],
      [80.6298, 16.5108],
      [80.6445, 16.5156],
      [80.6789, 16.5234]
    ];

    let counter = 0;
    const animate = () => {
      if (counter >= route.length) counter = 0;
      marker.setLngLat(route[counter]);
      counter++;
      setTimeout(animate, 3000);
    };
    
    setTimeout(animate, 2000);
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMapbox();
    }
  };

  useEffect(() => {
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  if (showTokenInput) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-foreground">Enable Vijayawada Map</h3>
              <p className="text-sm text-muted-foreground">
                Enter your Mapbox token to view interactive maps
              </p>
            </div>
            
            <div className="space-y-2">
              <Input
                placeholder="Enter Mapbox Public Token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="bg-input border-border"
              />
              <p className="text-xs text-muted-foreground">
                Get your free token from{' '}
                <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  mapbox.com
                </a>
              </p>
            </div>
            
            <Button 
              onClick={handleTokenSubmit}
              disabled={!mapboxToken.trim()}
              className="w-full bg-gradient-button hover:opacity-90"
            >
              <Zap className="w-4 h-4 mr-2" />
              Load Map
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {showControls && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => map?.flyTo({ center: vijayawadaCenter, zoom: 13 })}
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Navigation className="w-4 h-4 mr-1" />
            Center Map
          </Button>
        </div>
      )}
      
      <Card className="shadow-card overflow-hidden">
        <CardContent className="p-0">
          <div 
            ref={mapRef} 
            style={{ height }} 
            className="w-full rounded-lg"
          />
        </CardContent>
      </Card>
      
      {showControls && (
        <div className="text-xs text-muted-foreground text-center">
          🚌 Live bus tracking • 📍 Major stops and landmarks
        </div>
      )}
    </div>
  );
};

export default VijayawadaMap;