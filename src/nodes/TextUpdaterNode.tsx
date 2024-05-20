import { Handle, Position } from 'reactflow';
import "./TextUpdaterNode.css"
export function TextUpdaterNode({ data }: any) {
 
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className='node-main-section'>
        <div className="header">
            💬 Send Message
        </div>
        <div className="content">
            {data?.value}
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}