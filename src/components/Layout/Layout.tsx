import type { PropsWithChildren } from 'react'
import React from 'react'

const Layout: React.FC<PropsWithChildren> = ({ children, ...rest }) => {
  return (
    <div className="pt-4 h-full dark:bg-[#282c34] bg-neutral-100 text-black dark:text-white">
      {children}
    </div>
  )
}

export default Layout
