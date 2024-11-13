import moment from "moment";

export function combineDuplicates(arr) {
  let countMap = {};
  let result = [];

  for (let item of arr) {
    if (countMap[item]) {
      countMap[item]++;
    } else {
      countMap[item] = 1;
    }
  }

  for (let key in countMap) {
    if (countMap[key] > 1) {
      result.push(`${countMap[key]} x ${key}`);
    } else {
      result.push(key);
    }
  }

  return result;
}

export function getRoomName(hotelRooms) {
  const rooms = Array.isArray(hotelRooms) ? hotelRooms : [hotelRooms];
  let roomImages = [];
  let _rooms = [];
  rooms.forEach((room) => {
    for (let i = 0; i < +room?.attributes?.Units; i++) {
      _rooms.push(room);
    }
    const _images = room?.Images
      ? Array(room?.Images?.Image)
        ? room?.Images?.Image
        : [room?.Images?.Image]
      : [];
    roomImages = [
      ...roomImages,
      ..._images
        .filter((image) => image?.attributes?.Type === "BIG")
        .map((image) => image?.FileName)
    ];
  });

  _rooms = _rooms
    .sort((a, b) =>
      [a.Name, a?.RoomCategory?.value].join(" ").toLocaleLowerCase() >
      [b.Name, b?.RoomCategory?.value].join(" ").toLocaleLowerCase()
        ? -1
        : 1
    )
    .map((room) => [room.Name, room?.RoomCategory?.value].join(" "));
  const filteredRooms = combineDuplicates(_rooms);
  const roomName =
    filteredRooms.length === 1 ? filteredRooms[0] : filteredRooms.join(", ");
  return {
    roomName,
    roomAmount: _rooms.length,
    roomImages
  };
}

export function getRoomNameFromResponse(hotelRooms) {
  let _rooms = hotelRooms
    .sort((a, b) =>
      [a.name, a.roomCategory.value].join(" ").toLocaleLowerCase() >
      [b.name, b.roomCategory.value].join(" ").toLocaleLowerCase()
        ? -1
        : 1
    )
    .map((room) => [room.name, room.roomCategory.value].join(" "));
  const filteredRooms = combineDuplicates(_rooms);
  const roomName =
    filteredRooms.length === 1 ? filteredRooms[0] : filteredRooms.join(", ");
  return roomName;
}

export function getCancelationExpiredDate(selectedVariant) {
  if (selectedVariant?.attributes?.NonRefundable === "true") return null;

  const firstDayCostCancellation =
    selectedVariant?.CancellationPolicy?.FirstDayCostCancellation?.value;

  if (
    firstDayCostCancellation &&
    moment(firstDayCostCancellation)
      .subtract(1, "days")
      .isAfter(moment().format("YYYY-MM-DD"))
  ) {
    return moment(firstDayCostCancellation)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
  }

  return null;
}

export const shortcutAddress = (addr) => {
  if (!addr) return "";

  const arrs = addr.split(",");

  if (arrs?.length > 2) {
    return [arrs[arrs.length - 2], arrs[arrs.length - 1]].join(",");
  }

  return addr;
};

function getExcelColumnName(n) {
  let columnName = "";
  while (n >= 0) {
    columnName = String.fromCharCode((n % 26) + 65) + columnName;
    n = Math.floor(n / 26) - 1;
  }
  return columnName;
}

export const getRoomPaxes = (hotelOption) => {
  const _comments = [
    hotelOption?.commentSelects?.join(". "),
    hotelOption?.commentText
  ]
    .filter((el) => el)
    ?.join(". ");

  const _roomPaxes = hotelOption.roomPaxes.map((item, index) => ({
    hotelCode: hotelOption.hotelCode,
    checkInDate: hotelOption.checkIn,
    checkOutDate: hotelOption.checkOut,
    roomId: item.roomId,
    comment: _comments,
    bookingCode: hotelOption.bookingCode,
    lanuage: "ko",
    passangers: item.passangers.map((value, j) =>
      index === 0 && j === 0
        ? {
            ...value,
            nationality: "KR"
          }
        : {
            ...value,
            name:
              value.nameIsRequired && !value.name
                ? `Synaptic${getExcelColumnName(
                    +value.idPax - 1
                  ).toLowerCase()}`
                : value.name,
            surname:
              value.surnameIsRequired && !value.surname
                ? `Wave${getExcelColumnName(+value.idPax - 1).toLowerCase()}`
                : value.surname
          }
    )
  }));
  return _roomPaxes;
};
