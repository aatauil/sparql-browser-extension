import "~style.css"

import Directory from '~components/Directory'
import Editor from '~components/Editor'
import Output from '~components/Output'
import SideBar from '~components/Sidebar'
import Toolbar from '~components/Toolbar'
import Split from "react-split"

function index() {
  return (
    <div>
      <div className="bg-white h-screen w-screen max-h-screen max-w-screen overflow-hidden">
        <div className="flex h-full w-full">
          <div className="flex flex-col h-full border-r border-slate-400">
            <div className="flex items-center justify-center w-10 h-10 border-b border-slate-400">
              <i className="ri-bubble-chart-line text-blue-600 text-lg"></i>
            </div>
          </div>
          <SideBar/>
          <div className="flex-1 flex flex-col overflow-hidden h-full relative">
            <Split
              className="split h-full"
              direction="vertical"
              minSize={0}
              snapOffset={10}
              gutterSize={5}
              gutterAlign="start"
              dragInterval={1} >
              <div>
                <Toolbar/>  
                <Editor/>
              </div>
              <div className="relative z-40">
                <Output/>
              </div>
            </Split>
          </div>
        </div>
      </div>
    </div>
  )
}
export default index