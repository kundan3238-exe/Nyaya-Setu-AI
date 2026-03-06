import React, { useEffect, useRef, useState } from 'react';

export default function LegalMapFinder() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({
    police: [],
    court: [],
    aid: [],
    lawyer: []
  });
  const userMarkerRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [nearestLocation, setNearestLocation] = useState(null);

  const locations = [
    { type: 'police', name: 'Sitabuldi Police Station', coords: [21.1430, 79.0820], address: 'Sitabuldi Main Rd, Sitabuldi, Nagpur, Maharashtra 440012', phone: '0712-2560588', hours: '24/7' },
    { type: 'police', name: 'Sadar Police Station', coords: [21.1605, 79.0835], address: 'Mount Road, Sadar, Nagpur, Maharashtra 440001', phone: '0712-2560577', hours: '24/7' },
    { type: 'police', name: 'Cyber Crime Police Station', coords: [21.1562, 79.0765], address: 'Police Bhavan, Civil Lines, Nagpur, Maharashtra 440001', phone: '0712-2566766', hours: '24/7' },
    { type: 'police', name: 'Ambazari Police Station', coords: [21.1375, 79.0580], address: 'Pandhrabodi, Ambazari, Nagpur, Maharashtra 440033', phone: '0712-2226608', hours: '24/7' },
    { type: 'police', name: 'Kotwali Police Station', coords: [21.1450, 79.0980], address: 'Mahal, Nagpur, Maharashtra 440032', phone: '0712-2722333', hours: '24/7' },
    { type: 'court', name: 'Bombay High Court - Nagpur Bench', coords: [21.1539, 79.0733], address: 'Civil Lines, Nagpur, Maharashtra 440001', phone: '0712-2562600', hours: 'Mon-Fri 10:30am-5pm' },
    { type: 'court', name: 'District and Sessions Court', coords: [21.1520, 79.0715], address: 'Nyay Mandir, Civil Lines, Nagpur, Maharashtra 440001', phone: '0712-2560755', hours: 'Mon-Sat 10:30am-5:30pm' },
    { type: 'court', name: 'Family Court Nagpur', coords: [21.1545, 79.0720], address: 'Suyog Building, Civil Lines, Nagpur, Maharashtra 440001', phone: '0712-2561380', hours: 'Mon-Sat 10:30am-5:30pm' },
    { type: 'court', name: 'District Consumer Disputes Redressal Commission', coords: [21.1550, 79.0740], address: 'Administrative Building, Civil Lines, Nagpur, Maharashtra 440001', phone: '0712-2562259', hours: 'Mon-Fri 10:30am-5:30pm' },
    { type: 'hospital', name: 'Govt. Medical College & Hospital (GMCH)', coords: [21.1305, 79.0960], address: 'Medical Square, Hanuman Nagar, Nagpur, Maharashtra 440003', phone: '0712-2701580', hours: '24/7' },
    { type: 'hospital', name: 'Mayo Hospital (IGGMC)', coords: [21.1525, 79.0930], address: 'CA Road, Mominpura, Nagpur, Maharashtra 440018', phone: '0712-2725423', hours: '24/7' },
    { type: 'hospital', name: 'AIIMS Nagpur', coords: [21.0667, 79.0372], address: 'Sector 20, MIHAN, Nagpur, Maharashtra 441108', phone: '0712-2352022', hours: '24/7' },
    { type: 'hospital', name: 'Daga Memorial Women Hospital', coords: [21.1470, 79.0880], address: 'Gandhibagh, Nagpur, Maharashtra 440002', phone: '0712-2728621', hours: '24/7' },
    { type: 'women_support', name: 'Bharosa Cell (Nagpur Police)', coords: [21.1580, 79.0755], address: 'Near CP Office, Civil Lines, Nagpur, Maharashtra 440001', phone: '1091', hours: '24/7' },
    { type: 'women_support', name: 'Sakhi One Stop Centre', coords: [21.1300, 79.0950], address: 'Near GMCH, Ganesh Nagar, Nagpur, Maharashtra 440009', phone: '0712-2745353', hours: '24/7' },
    { type: 'women_support', name: 'Women Police Station', coords: [21.1565, 79.0762], address: 'Police Gymkhana, Civil Lines, Nagpur, Maharashtra 440001', phone: '0712-2566770', hours: '24/7' },
  ];

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      initializeMap();
      setIsLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    if (!window.L || mapInstanceRef.current) return;

    const L = window.L;
    
    // Custom icons for different marker types
    const icons = {
      police: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      court: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      hospital: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      women_support: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    };

    const map = L.map(mapRef.current).setView([21.1525, 79.0830], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers with custom icons
    locations.forEach(loc => {
      const marker = L.marker(loc.coords, { icon: icons[loc.type] })
        .bindPopup(`
          <div style="min-width: 200px;">
            <b style="font-size: 16px;">${loc.name}</b><br><br>
            <b>📍 Address:</b> ${loc.address}<br>
            <b>📞 Phone:</b> <a href="tel:${loc.phone}">${loc.phone}</a><br>
            <b>🕒 Hours:</b> ${loc.hours}<br><br>
            <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${loc.coords[0]},${loc.coords[1]}', '_blank')" 
                    style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; width: 100%;">
              Get Directions
            </button>
          </div>
        `);
        if (!markersRef.current[loc.type]) {
          markersRef.current[loc.type] = [];
        }
        markersRef.current[loc.type].push(marker);
      marker.addTo(map);
    });

    // Location found handler
    map.on('locationfound', (e) => {
      if (userMarkerRef.current) {
        map.removeLayer(userMarkerRef.current);
      }
      userMarkerRef.current = L.marker(e.latlng).addTo(map)
        .bindPopup("You are here!").openPopup();
      
      // Find nearest location
      findNearestLocation(e.latlng);
    });

    // Location error handler
    map.on('locationerror', () => {
      alert("Location access denied or unavailable.");
    });

    mapInstanceRef.current = map;
  };

  const findNearestLocation = (userLatLng) => {
    const L = window.L;
    let minDistance = Infinity;
    let nearest = null;

    locations.forEach(loc => {
      const distance = L.latLng(userLatLng).distanceTo(L.latLng(loc.coords));
      if (distance < minDistance) {
        minDistance = distance;
        nearest = { ...loc, distance: (distance / 1000).toFixed(2) }; // Convert to km
      }
    });

    setNearestLocation(nearest);
  };

  const locateUser = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.locate({ setView: true, maxZoom: 20 });
    }
  };

  const filterMarkers = (category) => {
    if (!mapInstanceRef.current) return;
    
    const map = mapInstanceRef.current;
    
    // Remove all markers
    Object.keys(markersRef.current).forEach(cat => {
      markersRef.current[cat].forEach(m => map.removeLayer(m));
    });

    // Add back selected markers
    if (category === 'all') {
      Object.keys(markersRef.current).forEach(cat => {
        markersRef.current[cat].forEach(m => m.addTo(map));
      });
    } else {
      markersRef.current[category].forEach(m => m.addTo(map));
    }
    
    setSelectedFilter(category);
  };

  return (
    <div className="relative w-full h-screen">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-[10000]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">Loading Map...</p>
          </div>
        </div>
      )}

      <div className="absolute top-2 left-2 z-[9999] bg-white p-2 rounded-lg shadow-lg max-w-[200px]">
        <button
          onClick={locateUser}
          className="block w-full mb-1 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
        >
          📍 Locate Me
        </button>
        <button
          onClick={() => filterMarkers('all')}
          className={`block w-full mb-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Show All
        </button>
        <button
          onClick={() => filterMarkers('police')}
          className={`block w-full mb-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            selectedFilter === 'police' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Police Stations
        </button>
        <button
          onClick={() => filterMarkers('court')}
          className={`block w-full mb-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            selectedFilter === 'court' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Courts
        </button>
        <button
          onClick={() => filterMarkers('hospital')}
          className={`block w-full mb-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            selectedFilter === 'hospital' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Legal Aid
        </button>
        <button
          onClick={() => filterMarkers('women_support')}
          className={`block w-full px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            selectedFilter === 'women_support' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
        Women Support
        </button>
      </div>

      {nearestLocation && (
        <div className="absolute bottom-4 left-2 right-2 md:left-auto md:right-4 md:w-80 z-[9999] bg-white p-4 rounded-lg shadow-lg">
          <button 
            onClick={() => setNearestLocation(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-2 text-blue-600">Nearest Location</h3>
          <p className="font-semibold">{nearestLocation.name}</p>
          <p className="text-sm text-gray-600 mt-1">{nearestLocation.address}</p>
          <p className="text-sm text-gray-600">📞 {nearestLocation.phone}</p>
          <p className="text-sm font-medium text-green-600 mt-2">
            📍 {nearestLocation.distance} km away
          </p>
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}