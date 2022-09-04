import React, { useState } from 'react'

const NewRoom = () => {
  const [options, setOptions] = useState([
    {
      adult: 1,
      children: 0,
      room: 1,
    },
  ]);
  return (
    <div>NewRoom</div>
  )
}

export default NewRoom