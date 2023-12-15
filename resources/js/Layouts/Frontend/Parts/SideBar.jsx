import { Link } from '@inertiajs/react'
import React from 'react'

const SideBar = () => {
  return (
    <div className='flex flex-col p-3 bg-black text-white min-h-screen'>
      <div className='p-3'>
        <Link href={route('home')}> Home  </Link>
      </div>
      <div className='p-3'>
        <Link href={route('product.create')}> Create Product  </Link>
      </div>
      <div className='p-3'>
        <Link href={route('category.create')}> Create Category  </Link>
      </div>
      <div className='p-3'>
        <a href={route('product.index')}> Products  </a>
      </div>
      <div className='p-3'>
        <Link href={route('template.index')}> Template  </Link>
      </div>
      <div className='p-3'>
        <Link href={route('component.index')}>  Component  </Link>
      </div>
      <div className='p-3'>
        <Link href={route('industry.index')}>  Industry  </Link>
      </div>
    </div>
  )
}

export default SideBar
