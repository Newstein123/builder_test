import FrontendLayout from '@/Layouts/FrontendLayout'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import SubIndustryItems from './SubIndustryItems'
import { Link } from '@inertiajs/react'
import FieldModal from './FieldModal'
import { SubIndustryContext, SubIndustryProvider } from '@/Context/SubIndustryContext'
import { useContext } from 'react'
import FieldItems from './FieldItems'

const Index = ({sub_industries, idy_fields}) => {
    const {setFieldVisible} = useContext(SubIndustryContext)
    const hanldeAddSubIndustry = () => {
        // do something 
    }
  return (
      <div className="m-10">
        <Toaster />
        <div className="flex justify-between">
            <div>
                <h2 className="text-2xl font-bold"> All Sub Industries </h2>
                <button className="text-red-700">
                    <Link href={route('industry.index')}>  Back   </Link>
                </button>
            </div>
            <div className="flex">
                <button className="text-red-800 me-3" onClick={() => setFieldVisible(true)}>
                    Create General Field
                </button>
                <button className="text-green-800" onClick={hanldeAddSubIndustry}>
                    Create Sub Industry
                </button>
            </div>
        </div>

        {/* SubIndustry Items  */}
        <h2 className="text-xl font-bold"> Sub Industries </h2>
        <SubIndustryItems 
            sub_industries={sub_industries}
        />

        {/* field items  */}
        <h2 className="text-xl font-bold"> General Data </h2>
        <FieldItems 
            idy_fields={idy_fields}
        />

        <FieldModal />
    </div>
  )
}

Index.layout = page => 
<SubIndustryProvider>
    <FrontendLayout children={page} />
</SubIndustryProvider>
export default Index
