import{r as a,j as e,d}from"./app-6e357656.js";import{T as l}from"./TemplateContext-0c34052b.js";const o=({templates:t})=>{const{handleEdit:r}=a.useContext(l);return e.jsx("div",{children:e.jsx("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg mt-10",children:e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Category"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Published"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:e.jsx("span",{className:"sr-only",children:"Edit"})})]})}),e.jsx("tbody",{children:t.length>0?t.map(s=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",children:[e.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e.jsxs(d,{href:route("section.index",{template_id:s.id}),children:[" ",s.name]})}),e.jsxs("td",{className:"px-6 py-4",children:[s.category.name," "]}),e.jsxs("td",{className:"px-6 py-4",children:[s.isShow==0?"No":"Yes"," "]}),e.jsx("td",{className:"px-6 py-4 text-right",children:e.jsx("button",{className:"font-medium text-blue-600 dark:text-blue-500 hover:underline",onClick:()=>r(s.id),children:"Edit"})})]},s.id)):e.jsx("tr",{children:e.jsx("th",{children:" No Data "})})})]})})})};export{o as default};
