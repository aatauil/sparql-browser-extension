import cssText from "data-text:~style.css"
import type { PlasmoContentScript } from "plasmo"


import "~style.css"

export const config: PlasmoContentScript = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className=" flex fixed top-32 right-8">

    </div>
  )
}

export default PlasmoOverlay
