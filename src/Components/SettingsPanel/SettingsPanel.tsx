import { useEffect, useState } from 'react'
import "./SettingsPanel.css"

interface settingsPanelArgs{
    node: any,
    updateVal: (val:String)=>void,
    backClicked: ()=>void,
}

function SettingsPanel({node, updateVal, backClicked}: settingsPanelArgs) {
    const [editNodeVal, setEditNodeVal] = useState("");

    useEffect(()=>{
        setEditNodeVal(node?.data?.value)
    },[node])

  return (
    <div className='right-panel-main'>
      <header className='settings-panel-header'>
        <button className='back-button' onClick={backClicked}>←</button>
        <span className='message'>Message</span>
      </header>
      <div className="text-container">
        <span>Text</span>
        <textarea name="node-text" id="" value={editNodeVal} onChange={(e)=> {
            updateVal(e.target.value)
            setEditNodeVal(e.target.value)
        }}></textarea>
      </div>
    </div>
  )
}

export default SettingsPanel
