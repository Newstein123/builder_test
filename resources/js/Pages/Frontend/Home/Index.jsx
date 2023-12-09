import FrontendLayout from '@/Layouts/FrontendLayout'
import { Link } from '@inertiajs/react'
import React from 'react'
import Websites from './Websites'

const Index = ({websites}) => {
  return (
    <div className='mx-10 my-5'>
        <div className="text-end">
            <button className='p-3 bg-slate-700 text-slate-300 rounded-md text-sm'> 
                <Link href={route('website.create')}> Create Website + </Link>
            </button>
        </div>
        {/* Websites  */}
        <Websites 
          websites={websites}
        />
    </div>
  )
}

Index.layout = page => <FrontendLayout children={page} title="Home Page" />
export default Index
