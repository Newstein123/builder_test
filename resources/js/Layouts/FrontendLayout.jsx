import React from 'react'
import SideBar from './Frontend/Parts/SideBar'

const FrontendLayout = ({children}) => {
  return (
    <div className="relative">
      <div className='flex'>
        <div className="w-1/5 sticky top-0 left-0">
            <SideBar />
        </div>
        <div className="w-4/5">
            {children}
        </div>
    </div>
    </div>
  )
}

export default FrontendLayout
