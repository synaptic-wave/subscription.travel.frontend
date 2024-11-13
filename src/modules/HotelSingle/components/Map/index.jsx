import Location from "@/assets/icons/location.svg?react";
import { AddressRow, Button, Map, PegmanRow } from "@/components/index";
import { useEffect, useRef, useState } from "react";
import PegmetImage from "@/assets/images/pegmet.png";
import useOnScreen from "@/hooks/useOnScreen";

export function MapInfo({ coordinate, address, currentPlace }) {
  const mapRef = useRef();
  const [isStreetView, setIsStreetView] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const isVisible = useOnScreen(mapRef);

  useEffect(() => {
    if (!isVisible) return;

    setIsRendered(true);
  }, [isVisible]);

  return (
    <div className="mt-[50px]" id="map">
      <div className="rounded-t-[10px] sm:p-[30px] p-[12px] border border-gray-100 border-solid">
        <p className="text-lg">위치</p>
        <AddressRow address={address} className="mt-[20px] mb-2" />
        <PegmanRow
          onClick={() => setIsStreetView((prev) => !prev)}
          isActive={isStreetView}
        />
      </div>

      <div className="sm:h-[672px] h-[596px]" ref={mapRef}>
        {isRendered && (
          <Map
            isStreetViewMode={isStreetView}
            coordinates={[coordinate]}
            currentPlace={currentPlace}
            showCurrentPlace={true}
            isCluster={true}
          />
        )}
      </div>
    </div>
  );
}
