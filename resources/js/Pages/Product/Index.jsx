import FrontendLayout from '@/Layouts/FrontendLayout'
import { list } from 'postcss'
import React, { useState } from 'react'

const Index = ({data}) => {
  const [listView, setListView] = useState(false)
  const handleView = () => {
    setListView(!listView)
  }
  return (
    <div>
        <h1 className="text-2xl font-bold"> My Products </h1>
        <div className="text-end my-5">
          <button className='px-3 py-2 bg-sky-500 rounded-md' onClick={handleView}> {!listView ? "List View" : "Grid View"} </button>
        </div>
        <hr />
        <div className={listView ? "mx-5" : "flex flex-wrap mx-5"}>
          {
            data.data.map(item => (
              <div className={listView ? "w-full" : "w-full md:w-1/4 lg:w-1/4"}>
              <div className={`wrapper p-2 bg-slate-700 m-2 text-slate-200 rounded-md flex ${listView ? "" : "flex-col"}`}>
                  <div className={listView ? "w-1/3" : ""}>
                    <img src="https://paymentcloudinc.com/blog/wp-content/uploads/2021/08/product-ideas-to-sell.jpg" alt="product-img" />
                  </div>
                  <div className={listView ? "w-2/3 ms-5" : ""}>
                    <p> Name : {item.name} </p>
                    <p> Price : {item.price} {item.currency} </p>
                    <p> Stock : {item.quantity} </p>
                    <p>  Description : {item.desc}  </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

Index.layout = page => <FrontendLayout children={page} title="Product" />
export default Index
