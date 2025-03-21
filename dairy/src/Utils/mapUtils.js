export const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding request failed');
      }
      
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };
 
  export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  
  
  export const getStaticMapUrl = (center, zoom, markers, size = '400x400') => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    let url = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=${size}&key=${apiKey}`;
    
    if (markers && markers.length > 0) {
      markers.forEach(marker => {
        url += `&markers=color:${marker.color || 'red'}|${marker.lat},${marker.lng}`;
      });
    }
    
    return url;
  };
  
  export const getNearbyPlaces = async (lat, lng, type, radius = 1000) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Places request failed');
      }
      
      const data = await response.json();
      
      if (data.status === 'OK') {
        return data.results;
      } else {
        throw new Error(`Places request error: ${data.status}`);
      }
    } catch (error) {
      console.error('Places API error:', error);
      return [];
    }
  };
  
 
  export const getDirections = async (origin, destination, travelMode = 'driving') => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const originStr = typeof origin === 'string' ? origin : `${origin.lat},${origin.lng}`;
      const destStr = typeof destination === 'string' ? destination : `${destination.lat},${destination.lng}`;
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destStr}&mode=${travelMode}&key=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Directions request failed');
      }
      
      const data = await response.json();
      
      if (data.status === 'OK') {
        return data.routes[0];
      } else {
        throw new Error(`Directions request error: ${data.status}`);
      }
    } catch (error) {
      console.error('Directions API error:', error);
      return null;
    }
  };