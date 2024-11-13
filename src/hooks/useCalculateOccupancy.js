import { useEffect, useState } from "react";

export default function useCalculateOccupancy({ hotelRooms, paxes }) {
  const [state, setState] = useState({
    adults: 0,
    children: 0,
    maxOccupancy: 0,
    occupancy: 0,
    roomAmount: 0
  });

  useEffect(() => {
    let adults = 0;
    let children = 0;
    let maxOccupancy = 0;
    let occupancy = 0;
    let roomAmount = 0;

    if (hotelRooms) {
      const rooms = Array.isArray(hotelRooms) ? hotelRooms : [hotelRooms];
      const _rooms = [];

      rooms.forEach((room) => {
        for (let i = 0; i < +room?.attributes?.Units; i++) {
          _rooms.push(room);
          roomAmount++;
        }
      });

      _rooms.forEach((room) => {
        adults = adults + +(room?.RoomOccupancy?.attributes?.Adults || 0);
        children = children + +(room?.RoomOccupancy?.attributes?.Children || 0);
        occupancy =
          occupancy + +(room?.RoomOccupancy?.attributes?.Occupancy || 0);
        maxOccupancy =
          maxOccupancy + +(room?.RoomOccupancy?.attributes?.MaxOccupancy || 0);
      });
    }

    if (adults === 0 && paxes) {
      const _adults = paxes
        .map((item) => item.passangers)
        .flat()
        .filter((item) => item.age > 17).length;
      adults = _adults;
    }

    if (children === 0 && paxes) {
      const _children = paxes
        .map((item) => item.passangers)
        .flat()
        .filter((item) => item.age < 18).length;
      children = _children;
    }

    if (maxOccupancy === 0 && paxes) {
      const paxesSize = paxes.map((item) => item.passangers).flat().length;
      maxOccupancy = paxesSize;
    }

    if (occupancy === 0 && paxes) {
      const paxesSize = paxes.map((item) => item.passangers).flat().length;
      occupancy = paxesSize;
    }

    setState({
      adults,
      children,
      maxOccupancy,
      occupancy,
      roomAmount
    });
  }, [hotelRooms, paxes]);

  return {
    ...state
  };
}
