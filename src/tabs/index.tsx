import "~style.css"

import Directory from '~components/Directory'
import Editor from '~components/Editor'
import Output from '~components/Output'
import TabList from '~components/TabList'
import Toolbar from '~components/Toolbar'

function index() {
  return (
    <div>
      <div className="bg-white h-screen max-h-screen w-screen max-w-screen overflow-hidden">
        <div className="flex w-full h-full">
          <div className="w-72 h-full border-r">
            <TabList/>
          </div>
          <div className="flex-1 flex flex-col">
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