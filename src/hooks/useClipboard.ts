import { useEffect } from 'react'

const useClipboard = (
  notification: () => void,
  convert?: (text: string) => string,
) => {
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()
      const text = selection?.toString().trim()

      if (text) {
        navigator.clipboard
          .writeText(convert ? convert(text) : text)
          .then(() => {
            notification()
          })
      }
    }

    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [notification])
}

export default useClipboard
