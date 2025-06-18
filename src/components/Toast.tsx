import React from 'react'

interface Props {
  isVisible: boolean
}

const Toast: React.FC<Props> = ({ isVisible }) => {
  return isVisible ? (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#282c34] dark:text-white text-black text-lg p-4 rounded-lg shadow border-2  dark:border-white border-black">
      Скопировано!
    </div>
  ) : null
}

export default Toast
