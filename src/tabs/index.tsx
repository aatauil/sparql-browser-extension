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