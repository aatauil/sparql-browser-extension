import React, { useState } from 'react'

function CustomCell({value}) {
  const [isToggled, setToggle] = useState(!!value.shortened)
  return (
    <div onDoubleClick={() => setToggle(!isToggled)}>
      {isToggled ? value.shortened : value.uri}
    </div>
  )
}

export default CustomCell