import "./NodePanel.css"

function NodePanel({clearFlow}: any) {
  return (
    <div className='nodepanel-container'>
        <div className="custom-message-button" draggable={true} >
            <span>💬</span>
            <p>Message</p>  
        </div>
        <div className='straight-line'></div>
        <button className='clear-flow-button' onClick={clearFlow}>Clear All Nodes</button>
    </div>
  )
}

export default NodePanel
