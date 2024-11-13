import { useState } from 'react'

const initial = {
  adults: 2,
  child: 0,
  childAges: [],
  id: new Date().getTime()
}

export const useOccupancy = ({ defaulRooms } = {}) => {
  const [rooms, setRooms] = useState(defaulRooms || [{ ...initial }])

  const onChange = (action, obj) => {
    const items = JSON.parse(JSON.stringify(rooms))
    if (action === 'amount') {
      items.forEach((item) => {
        if (item.id === obj.id) {
          item[obj.age] =
            obj.key === 'inc' ? item[obj.age] + 1 : item[obj.age] - 1
          if (obj.age === 'child' && obj.key === 'inc') {
            item.childAges.push('0')
          }
          if (obj.age === 'child' && obj.key === 'dec') {
            item.childAges.pop()
          }
        }
      })
    }
    if (action === 'childAge') {
      items.forEach((item) => {
        if (item.id === obj.id) {
          item.childAges[obj.index] = obj.age
        }
      })
    }
    if (action === 'addRoom') {
      if (rooms.length < 10)
        items.push({
          ...initial,
          id: new Date().getTime()
        })
    }
    if (action === 'removeRoom') {
      setRooms(items.filter((item) => item.id !== obj.id))
      return
    }
    if (action === 'reset') {
      setRooms(obj.value)
      return
    }
    setRooms(items)
  }

  return {
    onChange,
    rooms
  }
}
