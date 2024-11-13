export function calculateOccupancy({ paxesWithAge, relPaxesDist }) {
  const _roomPaxes = relPaxesDist.map((item, index) => {
    const relPaxes = Array.isArray(item.RelPaxes.RelPax)
      ? item.RelPaxes.RelPax
      : [item.RelPaxes.RelPax]
    const passangers = relPaxes.map((pax) => ({
      idPax: pax.attributes.IdPax,
      // age: paxesWithAge[pax.attributes.IdPax].age,
      ...paxesWithAge[pax.attributes.IdPax]
    }))

    return {
      roomId: index + 1,
      passangers
    }
  })

  return _roomPaxes
}
