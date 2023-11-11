import React, { useState } from 'react'

function CustomCell({value}) {
  const [isToggled, setToggle] = useState(!!value?.shortened)

  if(!value) {
    return <div></div>
  }

  if(!value.shortened) {
    return <div>{value.uri}</div>
  }
  
  return (
    <div onDoubleClick={() => setToggle(!isToggled)} className={isToggled && "font-medium"}>
      {isToggled ? value.shortened : value.uri}
    </div>
  )
}

export default CustomCell