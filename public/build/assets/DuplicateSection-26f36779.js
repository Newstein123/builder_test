import{r as c,q as v,W as S,j as e,y as N}from"./app-6e357656.js";import{_}from"./index-f7f45ee6.js";import{R as b}from"./rodal.esm-d2914f86.js";const w=({setDupSecVisible:l,dupSecVisible:d})=>{const[a,r]=c.useState([]),[n,m]=c.useState([]),{templates:o,template_id:u}=v().props,{data:i,setData:p,reset:x}=S({template_id:u,section_id:""}),h=s=>{const t=o.filter(f=>f.id==s);m(t[0].sections)};function j(s){s.preventDefault(),N.post(route("section.duplicate"),i,{onSuccess:()=>{_.success("Section Duplicate Successfully"),l(!1),x()},onError:t=>{r(t)}})}return e.jsx("div",{children:e.jsx(b,{visible:d,onClose:()=>l(!1),width:400,height:300,children:e.jsxs("form",{onSubmit:j,children:[e.jsxs("div",{className:"my-3",children:[e.jsx("p",{className:"text-slate-800 font-bold text-xl",children:"Select Template"}),e.jsxs("select",{onChange:s=>h(s.target.value),className:"w-full p-2 rounded-md ",children:[e.jsx("option",{value:"",children:" Choose Template "}),o.map(s=>e.jsxs("option",{value:s.id,children:[" ",s.name," "]},s.id))]})]}),e.jsxs("div",{className:"my-3",children:[e.jsx("p",{className:"text-slate-800 font-bold text-xl",children:"Select Sections"}),e.jsxs("select",{onChange:s=>p("section_id",s.target.value),className:"w-full p-2 rounded-md ",value:i.section_id,children:[e.jsx("option",{value:"",children:" Choose Section "}),n.length>0&&n.map(s=>e.jsxs("option",{value:s.id,children:[" ",s.name," "]},s.id))]})]}),a.section_id&&e.jsxs("div",{className:"text-red-700 my-3",children:[" ",a.section_id," "]}),e.jsx("div",{className:"text-end",children:e.jsx("button",{type:"submit",className:"p-2 bg-black text-white rounded-md",children:"Duplicate"})})]})})})};export{w as default};
