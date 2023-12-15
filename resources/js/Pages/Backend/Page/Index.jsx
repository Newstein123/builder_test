import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link } from '@inertiajs/react'
import FrontendLayout from '@/Layouts/FrontendLayout'
import Items from './Items'
import Create from './Create'
import { PageContext, PageProvider } from '@/Context/PageContext'
import Edit from './Edit'

const Index = ({pages}) => {
    const {setCreateVisible} = useContext(PageContext)

    const handleAddPage = () => {
        setCreateVisible(true)
    }

  return (
    <div>
      <div className="m-10">
            <Toaster />
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold"> All Pages </h2>
                    <button className="text-red-700">
                        <Link href={route("template.index")}>Back</Link>
                    </button>
                </div>
                <div className="flex">

                <button className="text-green-800" onClick={handleAddPage}>
                    Create Page
                </button>
                </div>
            </div>

            {/* Page items  */}
            <Items pages={pages} />

            <Create />
            <Edit />
        </div>
    </div>
  )
}

Index.layout = page => 
<PageProvider>
    <FrontendLayout children={page} />
</PageProvider>
export default Index
