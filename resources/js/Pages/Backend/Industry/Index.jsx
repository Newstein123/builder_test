import FrontendLayout from '@/Layouts/FrontendLayout'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import IndustryItems from './IndustryItems'

const Index = ({industries}) => {

    const hanldeAddIndustry = () => {
        // do something 
    }

  return (
    <div className="m-10">
        <Toaster />
        <div className="flex justify-between">
            <div>
                <h2 className="text-2xl font-bold"> All Industries </h2>
            </div>
            <button className="text-green-800" onClick={hanldeAddIndustry}>
                Create Industry
            </button>
        </div>

        {/* Industry Items  */}
        <IndustryItems 
            industries={industries}
        />
    </div>
  )
}


Index.layout = page => <FrontendLayout children={page} />
export default Index
