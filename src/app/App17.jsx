import { useRef, useImperativeHandle } from 'react'

const tooltipStyle = {
  display: 'none',
  position: 'fixed',
  background: 'rgba(0,0,0, .7)',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '4px solid',
  fontSize: '14px',
  transition: 'opacity 0.5s ease',
  zIndex: 9900,
}
const spanStyle = {
  display: "inline-block",
  width: '100px', 
  height: '100px', 
  border: '1px solid #333', 
  background: 'yellow'
}
function Tooltip({ ref }) {
  const myRef = useRef(null)

  // 暴露两个方法给父组件
  useImperativeHandle(ref, () => ({
    show(e) {
        // console.log(e.clientX, e.clientY)
        const x = e.clientX;
        const y = e.clientY;
        myRef.current.style.display = 'block'
        myRef.current.style.opacity = '1';
        myRef.current.style.left = `${x}px`
        myRef.current.style.top = `${y}px`
    },
    hide() {
      myRef.current.style.opacity = '0';
    }
  }))


  return (
    <div style={tooltipStyle} ref={myRef}>秀爱一生推</div>
  )
}

export default function App() {
  const toolTipRef = useRef(null)

  const handleMouseEnter = (e) => {
    console.log('enter')
    toolTipRef.current.show(e)
  }
  const handleMouseLeave = (e) => {
    console.log('leave')
    toolTipRef.current.hide(e)
  }


  return (
    <div>
      <span onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={spanStyle}
      >鼠标悬停</span>
      <Tooltip ref={toolTipRef} />
    </div>
  )
}