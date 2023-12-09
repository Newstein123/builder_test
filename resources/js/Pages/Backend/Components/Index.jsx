import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Link } from '@inertiajs/react'
import Rodal from 'rodal'
import CreateModal from './CreateModal'

const Index = ({components}) => {

  const [cModalVisible, setCModalVisible] = useState(false);

  const handleAddComponent = () => {
    setCModalVisible(true)
  }
  return (
    <div className='m-10'>
            <Toaster />
          <div className="flex justify-between">
              <div>
                  <h2 className="text-2xl font-bold"> All Components </h2>
              </div>
              <button className="text-green-800" onClick={handleAddComponent}>
                  Create Component
              </button>
          </div>

          {/* Create modal  */}
          <CreateModal 
            cModalVisible={cModalVisible}
            setCModalVisible={setCModalVisible}
          />
          
          {/* Components  */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Variable Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {components.length > 0 ?
                           components.map(item => <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={item.id}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <Link
                                        href={route("component.design.index", {
                                            cpt_id: item.id,
                                        })}
                                    >
                                        {item.name}
                                    </Link>
                                </th>
                                <td className="px-6 py-4">
                                    {item.value}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </a>
                                </td>
                            </tr>) : 
                            <tr className="text-center" style={{columnSpan : "100%"}}>
                               <th className="">  No Data </th>
                            </tr>
                        }
                    </tbody>
                </table>
          </div>
    </div>
  )
}

Index.layout = page => <FrontendLayout children={page} />
export default Index