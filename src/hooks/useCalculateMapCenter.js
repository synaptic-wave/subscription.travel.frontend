import { useEffect, useState } from "react";

export default function useCalculateMapCenter({ coordinates, enabled }) {
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    if (coordinates?.length > 0 && enabled) {
      let totalLat = 0;
      let totalLong = 0;

      coordinates?.forEach((coord) => {
        totalLat += coord.lat;
        totalLong += coord.lng;
      });

      const centerLat = totalLat / coordinates?.length;
      const centerLong = totalLong / coordinates?.length;

      setMapCenter({
        lat: centerLat,
        lng: centerLong
      });
    }
  }, [coordinates, enabled]);

  return enabled
    ? mapCenter
    : {
        lat: coordinates?.[0]?.lat,
        lng: coordinates?.[0]?.lng
      };
}
