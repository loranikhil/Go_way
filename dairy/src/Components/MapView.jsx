import React, { useState, useEffect, useRef } from 'react';
import './MapView.css';

const MapView = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const googleMapsApiKey = "AIzaSyAR48xvSIg-LyBrk2Ndh0zLXyqrfVEP_YQ";

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      const googleScript = document.querySelector(`script[src*="${googleMapsApiKey}"]`);
      if (googleScript) document.head.removeChild(googleScript);
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) {
      console.error("❌ Map container not found!");
      return;
    }

    if (!window.google) {
      console.error("❌ Google Maps API not loaded!");
      return;
    }

    console.log("✅ Initializing Google Map...");

    
   
    const mapOptions = {
    
      zoom: 15,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    console.log("✅ Map initialized successfully!");

    addExampleMarkers(newMap);
    getUserLocation(newMap);
  };

  const addExampleMarkers = (mapInstance) => {
    console.log("📍 Adding example markers...");

    const locations = [
      { lat: 17.384800, lng: 78.485100, title: "Vegetables", icon: "shopping_cart" },
    ];

    const newMarkers = locations.map((location) => 
      new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstance,
        title: location.title,
        icon: {
          url: `https://maps.google.com/mapfiles/ms/icons/${getIconColor(location.icon)}.png`,
          scaledSize: new window.google.maps.Size(32, 32),
        },
      })
    );

    setMarkers(newMarkers);
  };

  const getIconColor = (type) => {
    switch (type) {
      case "restaurant": return "orange";
      case "shopping_cart": return "yellow";
      case "local_bar": return "orange";
      default: return "red";
    }
  };

  const getUserLocation = (mapInstance) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(userPos);

          new window.google.maps.Marker({
            position: userPos,
            map: mapInstance,
            icon: {
              url: "https://i.ibb.co/tTR2w3KG/pin-removebg-preview.png",
              scaledSize: new window.google.maps.Size(32, 32),
            },
            zIndex: 1000,
          });

          mapInstance.setCenter(userPos);
          console.log("📍 User location detected!", userPos);
        },
        (error) => console.error("⚠️ Error getting location:", error.message)
      );
    } else {
      console.error("❌ Geolocation is not supported in this browser.");
    }
  };


  return (
    <div className="map-container">
      <div ref={mapRef} className="google-map"></div>

      
    </div>
  );
};

export default MapView;
