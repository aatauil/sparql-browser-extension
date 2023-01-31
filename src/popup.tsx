import "~style.css"

function IndexPopup() {
  function createTab() {
    chrome.tabs.create({
      url: './tabs/index.html'
    })
  }
  return (
    <div className="border w-64 p-2">
      <div className='flex items-center space-x-2 p-2 text-sm'>
        <i className="ri-bubble-chart-fill text-blue-600"></i>
        <h1 className='font-extrabold text-zinc-800'>Sparql browser extension</h1>
      </div> 
      <div className="w-full">
        <button onClick={() => createTab()} className="w-full p-2 text-center font-medium bg-blue-600 text-white rounded hover:bg-blue-700">open editor</button>
      </div>
    </div>
  )
}

export default IndexPopup
