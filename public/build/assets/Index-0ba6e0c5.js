import{j as e,d as l,y as d}from"./app-6e357656.js";import{F as c}from"./FrontendLayout-00f3f7bc.js";import{I as o,n}from"./index-f7f45ee6.js";import{S as i}from"./SectionDataContext-162d67fc.js";import{S as x}from"./SectionDataLayout-58666971.js";import"./FieldModal-3ba05dda.js";import"./rodal.esm-d2914f86.js";import"./CreateFieldModal-a95eeb8a.js";import"./CreateCptModal-58891775.js";const h=({section_fields:t})=>{const r=s=>{d.delete(route("field.delete",{id:s}),{onSuccess:()=>{n.success("Field Deleted Successfully")},onError:a=>{console.log(a)}})};return e.jsx("div",{children:e.jsxs("div",{className:"m-10",children:[e.jsx(o,{}),e.jsx("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg mt-10",children:e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Variable Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Type"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:e.jsx("span",{className:"sr-only",children:"Edit"})})]})}),e.jsx("tbody",{children:t.length>0?t.map(s=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",children:[e.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e.jsx(l,{href:route("section.data.index",{section_id:s.id}),children:s.name})}),e.jsx("td",{className:"px-6 py-4",children:s.value}),e.jsx("td",{className:"px-6 py-4",children:s.type}),e.jsxs("td",{className:"px-6 py-4 text-right",children:[e.jsx("a",{href:"#",className:"font-medium text-blue-600 dark:text-blue-500 hover:underline me-3",children:"Edit"}),e.jsx("button",{type:"button",className:"font-medium text-red-600 dark:text-red-500 hover:underline",onClick:()=>r(s.id),children:"Delete"})]})]},s.id)):e.jsx("tr",{className:"text-center",style:{columnSpan:"100%"},children:e.jsx("th",{className:"",children:" No Data "})})})]})})]})})};h.layout=t=>e.jsx(c,{children:e.jsx(i,{children:e.jsx(x,{children:t})})});export{h as default};