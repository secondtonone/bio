import React, {
  Suspense,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react'

import colorDetect from '@/lib/colorDetect'
import interleaveChunks from '@/lib/interleaveChunks'

interface Props {
  upper: string
  lower: string
}

const CHAR_WIDTH = 28.29

const Grid: React.FC<Props> = ({ upper, lower }) => {
  const [width, setWidth] = useState(0)

  const refContainer = useRef<HTMLDivElement | null>(null)

  const total = useDeferredValue(interleaveChunks(upper, lower, width))

  useEffect(() => {
    const listener = () => {
      if (refContainer.current) {
        setWidth(Math.floor(refContainer.current.clientWidth / CHAR_WIDTH))
      }
    }

    listener()

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  return (
    <div
      ref={refContainer}
      className="font-mono cursor-text w-full tracking-widest break-all text-[42px] font-bold *:rounded-md *:border-1 *:dark:border-[#282c34] transition-all duration-200"
      style={{ letterSpacing: '1px' }}
    >
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        {total.map((acid, index) => {
          if (acid.value === '') return <br key={index + 'br'} />

          return (
            <span
              style={{
                background: acid?.colored ? colorDetect(acid.value) : 'inherit',
                color: acid?.colored ? 'black' : 'inherit',
                outline: acid.value === ' ' ? '1px solid red' : 'none',
                whiteSpace: 'pre',
              }}
              key={acid.value + index}
            >
              {acid.value}
            </span>
          )
        })}
      </Suspense>
    </div>
  )
}

export default Grid
