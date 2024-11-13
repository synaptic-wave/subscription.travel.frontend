import {
  LoadScript,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindow,
  StreetViewPanorama,
  OverlayView,
  Polygon
} from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useState } from "react";
import ShoppingMallIcon from "@/assets/icons/shopping-mall.svg";
import RestaurantIcon from "@/assets/icons/restaurant.svg";
import TouristAttractionIcon from "@/assets/icons/tourist-attraction.svg";
import { TikTokEmbed } from "react-social-media-embed";
import {
  PLACES_ENTERTAINMENTS,
  PLACES_MEALS,
  PLACES_SHOPPINGS
} from "@/consts/placesTypes";
import { CurrentPlace } from "./CurrentPlace";
import useCalculateMapCenter from "@/hooks/useCalculateMapCenter";
import { HotelPlaceCard } from "./HotelPlaceCard";
import { Checkbox } from "../Checkbox";
import { Dialog } from "..";
import { gTagGRequestEvents } from "@/utils/ga";

export function Map({
  coordinates,
  onClick = () => {},
  onNavigate,
  currentPlace,
  showCurrentPlace,
  isStreetViewMode,
  isCluster,
  zoom = 12,
  useMeridianToView = true
}) {
  const [isOpenTikTok, setIsOpenTikTok] = useState(false);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: Number(coordinates?.[0]?.lat),
    lng: Number(coordinates?.[0]?.lng)
  });
  const { isLoaded } = useJsApiLoader({
    language: "ko",
    id: "google-map-script",
    libraries: ["geometry", "drawing"],
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const mapCenter = useCalculateMapCenter({
    coordinates,
    enabled: !!useMeridianToView
  });

  useEffect(() => {
    if (mapCenter) setDefaultCenter(mapCenter);
  }, [mapCenter]);

  const [nearbies, setNearbies] = useState([]);
  const [placeId, setPlaceId] = useState();
  const [showCurrentPlaceDetail, setShowCurrentPlaceDetail] = useState(true);
  const [selectedType, setSelectedType] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerMouseOver = (marker, info) => {
    setActiveMarker({ position: marker.getPosition(), info });
  };

  const handleMarkerMouseOut = () => {
    setActiveMarker(null);
  };

  const onOpenTikTok = (e) => {
    e.stopPropagation();
    setIsOpenTikTok(true);
  };

  const onClickNearbyPlace = (placeId) => {
    const foundNearbyPlace = nearbies?.find((el) => el?.place_id === placeId);

    setSelectedType((prev) => [...prev, foundNearbyPlace?.type]);
    setPlaceId(placeId);
  };

  const onMapLoad = async (map) => {
    // const { PlacesService } = await google.maps.importLibrary("places");

    // coordinates?.forEach((coord) => {
    //   var pyrmont = new google.maps.LatLng(coord.lat, coord.lng);

    //   var restaurantRequest = {
    //     location: pyrmont,
    //     radius: "2500",
    //     type: PLACES_MEALS,
    //     includedPrimaryTypes: PLACES_MEALS,
    //     includedTypes: PLACES_MEALS
    //   };

    //   var shoppingRequest = {
    //     location: pyrmont,
    //     radius: "2500",
    //     type: PLACES_SHOPPINGS,
    //     includedTypes: PLACES_SHOPPINGS
    //   };

    //   var touristRequest = {
    //     location: pyrmont,
    //     radius: "2500",
    //     type: PLACES_ENTERTAINMENTS,
    //     includedTypes: PLACES_ENTERTAINMENTS
    //   };

    //   let service = new PlacesService(map);

    //   service.nearbySearch(restaurantRequest, (results, status) => {
    //     gTagGRequestEvents(`PLACES API: RESTAURANTS NEARBY SEARCH`);

    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //       for (var i = 0; i < results.length; i++) {
    //         const res = results[i];
    //         setNearbies((prev) => [
    //           ...prev,
    //           {
    //             ...res,
    //             type: "restaurant",
    //             name: res?.name,
    //             lat: res?.geometry?.location.lat(),
    //             lng: res?.geometry?.location.lng(),
    //             icon: RestaurantIcon
    //           }
    //         ]);
    //       }
    //     }
    //   });

    //   service.nearbySearch(shoppingRequest, (results, status) => {
    //     gTagGRequestEvents(`PLACES API: SHOPPING NEARBY SEARCH`);

    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //       for (var i = 0; i < results.length; i++) {
    //         const res = results[i];

    //         setNearbies((prev) => [
    //           ...prev,
    //           {
    //             ...res,
    //             type: "shopping",
    //             name: res?.name,
    //             lat: res?.geometry.location.lat(),
    //             lng: res?.geometry.location.lng(),
    //             icon: ShoppingMallIcon
    //           }
    //         ]);
    //       }
    //     }
    //   });

    //   service.nearbySearch(touristRequest, (results, status) => {
    //     gTagGRequestEvents(`PLACES API: ATTRACTIONS NEARBY SEARCH`);

    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //       for (var i = 0; i < results.length; i++) {
    //         const res = results[i];

    //         setNearbies((prev) => [
    //           ...prev,
    //           {
    //             ...res,
    //             type: "tourist",
    //             name: res?.name,
    //             lat: res?.geometry.location.lat(),
    //             lng: res?.geometry.location.lng(),
    //             icon: TouristAttractionIcon
    //           }
    //         ]);
    //       }
    //     }
    //   });
    // });

    if (isCluster) {
      const gMarkers = coordinates?.map((position) => {
        const marker = new google.maps.Marker({ position });

        marker.addListener("click", () =>
          handleMarkerMouseOver(marker, position.info)
        );
        marker.addListener("mouseover", () =>
          handleMarkerMouseOver(marker, position.info)
        );
        marker.addListener("mouseleave", () => handleMarkerMouseOut());

        return marker;
      });
      new MarkerClusterer({
        markers: gMarkers,
        map
      });
    }
  };

  if (!isLoaded) return <></>;

  return (
    <div
      key={coordinates?.length}
      className="sm:w-full h-full relative overflow-hidden w-[110%] sm:translate-x-0 translate-x-[-16px]"
    >
      {/*!isStreetViewMode && (
        <div className="absolute bottom-[20px] left-[17px] sm:h-[160px] sm:w-[200px] h-[150px] w-[130px] flex flex-col bg-white z-[8] justify-center items-center gap-4">
          <div className="flex sm:gap-3 gap-1 items-center justify-between w-full sm:pl-4 pl-2">
            <Checkbox
              isChecked={selectedType.includes("tourist")}
              onChange={() =>
                setSelectedType((prev) =>
                  prev.includes("tourist")
                    ? prev.filter((el) => el !== "tourist")
                    : [...prev, "tourist"]
                )
              }
              label={
                <div className="flex gap-3 items-center justify-start sm:text-base text-xs">
                  <img src={TouristAttractionIcon} />
                  관광지
                </div>
              }
            />
          </div>

          <div className="flex sm:gap-3 gap-1 items-center justify-between w-full sm:pl-4 pl-2">
            <Checkbox
              isChecked={selectedType.includes("shopping")}
              onChange={() =>
                setSelectedType((prev) =>
                  prev.includes("shopping")
                    ? prev.filter((el) => el !== "shopping")
                    : [...prev, "shopping"]
                )
              }
              label={
                <div className="flex gap-3 items-center justify-start sm:text-base text-xs">
                  <img src={ShoppingMallIcon} />
                  쇼핑몰
                </div>
              }
            />
          </div>

          <div className="flex sm:gap-3 gap-1 items-center justify-between w-full sm:pl-4 pl-2">
            <Checkbox
              isChecked={selectedType.includes("restaurant")}
              onChange={() =>
                setSelectedType((prev) =>
                  prev.includes("restaurant")
                    ? prev.filter((el) => el !== "restaurant")
                    : [...prev, "restaurant"]
                )
              }
              label={
                <div className="flex gap-3 items-center justify-start sm:text-base text-xs">
                  <img src={RestaurantIcon} />
                  레스토랑
                </div>
              }
            />
          </div>
        </div>
            )*/}

      <GoogleMap
        zoom={zoom}
        onLoad={onMapLoad}
        center={defaultCenter}
        mapContainerStyle={{
          width: "100%",
          height: "100%"
        }}
      >
        {isStreetViewMode && (
          <StreetViewPanorama
            position={defaultCenter}
            visible={isStreetViewMode}
          />
        )}

        {/* {showCurrentPlace && !isStreetViewMode && (
          <CurrentPlace
            currentPlace={currentPlace}
            onClickItem={onClickNearbyPlace}
            restaurants={nearbies?.filter((el) => el.type === "restaurant")}
            attractions={nearbies?.filter((el) => el.type === "tourist")}
            shoppings={nearbies?.filter((el) => el.type === "shopping")}
          />
        )} */}

        {isCluster && (
          <Polygon
            paths={coordinates}
            options={{
              fillColor: "lightblue",
              fillOpacity: 0.4,
              strokeColor: "transparent",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              clickable: false,
              draggable: false,
              editable: false,
              geodesic: true,
              zIndex: 1
            }}
          />
        )}

        {!isCluster &&
          coordinates?.map(({ lat, lng }, idx) => (
            <MarkerF
              position={{ lat: Number(lat), lng: Number(lng) }}
              key={idx}
              onClick={() => {
                onClick(lat, lng);
                setShowCurrentPlaceDetail(true);
              }}
            />
          ))}

        {/* {nearbies
          ?.filter((el) => selectedType.includes(el.type))
          ?.map(({ lat, lng, name, icon, place_id }, idx) => (
            <>
              <MarkerF
                position={{ lat: Number(lat), lng: Number(lng) }}
                key={idx}
                onClick={() => onClickNearbyPlace(place_id)}
                icon={icon}
              />

              {place_id === placeId && (
                <InfoWindow
                  position={{ lat: Number(lat), lng: Number(lng) }}
                  onCloseClick={() => setPlaceId()}
                >
                  <span>{name}</span>
                </InfoWindow>
              )}
            </>
          ))} */}

        {activeMarker && (
          <InfoWindow
            position={activeMarker.position}
            onCloseClick={() => setActiveMarker(null)}
          >
            <HotelPlaceCard
              onClose={() => setActiveMarker(null)}
              key={activeMarker.info?.JPCode}
              name={activeMarker.info?.HotelName || activeMarker.info?.Name}
              nameEn={activeMarker.info?.NameEn}
              address={
                activeMarker.info?.HotelAddress || activeMarker.info?.Address
              }
              image={activeMarker.info?.HotelImages}
              rating={activeMarker.info?.rating}
              reviewsCount={activeMarker.info?.reviewsCount}
              onClick={() =>
                onNavigate(
                  activeMarker.position?.lat(),
                  activeMarker.position?.lng(),
                  activeMarker?.info
                )
              }
              onOpenTikTok={onOpenTikTok}
            />
          </InfoWindow>
        )}

        {/* {showCurrentPlaceDetail && (
          <InfoWindow
            position={{
              lat: Number(currentPlace?.lat),
              lng: Number(currentPlace?.lng)
            }}
            onCloseClick={() => setPlaceId()}
          >
            <>
              <h1>{currentPlace?.name}</h1>
              <p>{currentPlace?.address}</p>
            </>
          </InfoWindow>
        )} */}
      </GoogleMap>
      <Dialog
        className="w-auto"
        onClose={() => setIsOpenTikTok(false)}
        isOpen={isOpenTikTok}
        withCloseButton={false}
      >
        <TikTokEmbed
          url="https://www.tiktok.com/@cafe1slife/video/7333661416534150402"
          width={320}
          // height={700}
        />
      </Dialog>
    </div>
  );
}
