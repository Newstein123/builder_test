import{r as o,q as u,W as x,j as e,y as p}from"./app-6e357656.js";import{a as h}from"./SectionContext-5bc09601.js";import{R as f}from"./rodal.esm-d2914f86.js";import{M as j}from"./MyCodeEditor-a08b0bc4.js";import{_ as v}from"./index-f7f45ee6.js";import"./index-f0c49e0f.js";const w=()=>{const{editVisible:r,setEditVisible:l}=o.useContext(h),{section:t}=u().props,[b,d]=o.useState([]),{data:a,setData:n,reset:i}=x({content:t==null?void 0:t.content,value:t==null?void 0:t.value,name:t==null?void 0:t.name});function m(s){s.preventDefault(),p.put(route("section.update",t.id),a,{onSuccess:()=>{v.success("Section Updated Successfully"),l(!1),i()},onError:c=>{d(c)}})}return e.jsx("div",{children:e.jsxs(f,{visible:r,onClose:()=>l(!1),width:1200,height:600,children:[e.jsx("h2",{className:"text-2xl font-bold",children:" Edit Section Data "}),t&&e.jsx("div",{children:e.jsxs("form",{onSubmit:m,children:[e.jsxs("div",{className:"my-3",children:[e.jsx("p",{className:"text-xl font-bold",children:" Name "}),e.jsx("input",{value:a.name,type:"text",className:"p-2 rounded-md w-full",onChange:s=>n("name",s.target.value)})]}),e.jsxs("div",{className:"my-3",children:[e.jsx("p",{className:"text-xl font-bold",children:" Variable Name "}),e.jsx("input",{value:a.value,type:"text",className:"p-2 rounded-md w-full",onChange:s=>n("value",s.target.value)})]}),e.jsx("div",{className:"my-3",children:e.jsx(j,{value:a.content,setData:n,data:"content",lang:"html",name:"Add Content"})}),e.jsx("div",{className:"text-end",children:e.jsx("button",{type:"submit",className:"p-2 bg-black text-white rounded-md",children:"Update"})})]})})]})})};export{w as default};
