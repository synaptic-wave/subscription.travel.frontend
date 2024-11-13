import { normalizedHotelOption } from "@/modules/SearchResult/Sections/Output/View";
import { combineDuplicates, getRoomName } from "@/utils/hotelFunctions";
import { useMemo } from "react";

export const fetchRoomNames = (_rooms) => {
  const jrCodes = _rooms;
};

export default function useHotelRooms({ data }) {
  const rooms = useMemo(() => {
    if (!data) return [];

    const extractedOptions = Array.isArray(
      data?.results?.HotelResult?.HotelOptions?.HotelOption
    )
      ? data?.results.HotelResult.HotelOptions.HotelOption
      : [data?.results?.HotelResult?.HotelOptions?.HotelOption];

    return extractedOptions.map((option) => normalizedHotelOption(option));
  }, [data]);

  const roomWithMinPrice = useMemo(() => {
    if (rooms.length === 0) return null;

    return rooms.reduce((minItem, currentItem) => {
      return +currentItem.price < +minItem.price ? currentItem : minItem;
    });
  }, [rooms]);

  const hotelOptions = useMemo(() => {
    if (!data) return [];
    const options = {};
    const images = {};
    (Array.isArray(data?.results?.HotelResult?.HotelOptions?.HotelOption)
      ? data?.results?.HotelResult?.HotelOptions?.HotelOption
      : [data?.results?.HotelResult?.HotelOptions?.HotelOption]
    )?.forEach((item) => {
      const { roomName: _name, roomImages } = getRoomName(
        item?.HotelRooms?.HotelRoom
      );

      images[_name] = roomImages;

      if (options[_name]) {
        options[_name] = [...options[_name], item];
      } else {
        options[_name] = [item];
      }
    });

    const groupedRooms = Object.keys(options).map((name) => ({
      name,
      options: options[name],
      images: images[name]
    }));

    return groupedRooms;
  }, [data]);

  return {
    rooms,
    hotelOptions,
    roomWithMinPrice
  };
}
