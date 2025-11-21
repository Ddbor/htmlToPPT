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
      <div className="mb-5">
        <button
          className="bg-[#0078D4] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#005A9E]"
          onClick={() =>
            htmlToPPT.generateSlide({
              boundary: containerRef.current!,
            })
          }
        >
          导出PPT
        </button>
      </div>

      <div ref={containerRef} className="w-[80%] h-[80%] bg-[#F0F4F8] overflow-hidden">
        <h1 className="text-3xl font-bold inline-block py-5 text-center ml-[20%] mt-[200px]">
          2025现代医学前沿： 技术突破与临床应用
        </h1>
      </div>
    </div>
  )
}

export default App
