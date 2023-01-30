import "~style.css"

import Directory from '~components/Directory'
import Editor from '~components/Editor'
import Output from '~components/Output'
import SideBar from '~components/Sidebar'
import Toolbar from '~components/Toolbar'

function index() {
  return (
    <div>
      <div className="bg-white h-screen w-screen max-h-screen max-w-screen overflow-hidden">
        <div className="flex w-full h-full">
          <SideBar/>
          <div className="flex-1 flex flex-col overflow-hidden">
            <Toolbar/>
            <Editor/>
            <Output/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index