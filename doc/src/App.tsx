import htmlToPPT from '@lib'
import { useEffect, useRef } from 'react'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      htmlToPPT.edit({
        boundary: containerRef.current,
      })
    }
  }, [containerRef.current])

  return (
    <div className="w-screen h-screen p-10">
      <div ref={containerRef} className="w-full h-full bg-[#F0F4F8] overflow-hidden">
        <h1 className="text-3xl font-bold inline-block py-5 text-center ml-[20%] mt-[200px]">
          2025现代医学前沿： 技术突破与临床应用
        </h1>
      </div>
    </div>
  )
}

export default App
