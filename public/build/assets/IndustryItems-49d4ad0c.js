import{j as e,d as s}from"./app-8945b544.js";const l=({industries:r})=>e.jsx("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg mt-10",children:e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Variable Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:e.jsx("span",{className:"sr-only",children:"Edit"})})]})}),e.jsx("tbody",{children:r.length>0?r.map(a=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",children:[e.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e.jsx(s,{href:route("sub_industry.index",{industry_id:a.id}),children:a.name})}),e.jsx("td",{className:"px-6 py-4",children:a.value}),e.jsx("td",{className:"px-6 py-4 text-right",children:e.jsx("a",{href:"#",className:"font-medium text-blue-600 dark:text-blue-500 hover:underline",children:"Edit"})})]},a.id)):e.jsx("tr",{className:"text-center",style:{columnSpan:"100%"},children:e.jsx("th",{className:"",children:" No Data "})})})]})});export{l as default};