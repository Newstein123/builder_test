import{r as i,q as g,W as f,j as e,y as v}from"./app-6e357656.js";import{R as b}from"./rodal.esm-d2914f86.js";import{a as N}from"./SectionDataContext-162d67fc.js";const y=()=>{const{visibleComponent:l,setVisibleComponent:n,section_id:d,setErrors:r,errors:o}=i.useContext(N),{components:a}=g().props,[c,m]=i.useState([]),{data:p,setData:x,reset:h}=f({component_design_id:"",section_id:d}),u=s=>{const t=a.filter(C=>C.id==s);m(t[0].designs)},j=s=>{s.preventDefault(),v.post(route("section.data.component.store"),p,{onSuccess:()=>{n(!1),h()},onError:t=>{r(t)}})};return e.jsx("div",{children:e.jsx(b,{visible:l,onClose:()=>n(!1),width:450,height:350,children:e.jsxs("form",{onSubmit:j,children:[e.jsxs("div",{className:"my-3",children:[e.jsx("p",{className:"text-slate-800 font-bold text-xl",children:"Select Components"}),e.jsxs("select",{className:"w-full p-2 rounded-md",onChange:s=>u(s.target.value),children:[e.jsx("option",{value:"",children:" Choose Component "}),a.map(s=>e.jsxs("option",{value:s.id,children:[" ",s.name," "]},s.id))]})]}),e.jsxs("div",{className:"my-3",children:[e.jsx("p",{className:"text-slate-800 font-bold text-xl",children:"Select Component Designs"}),e.jsxs("select",{className:"w-full p-2 rounded-md",onChange:s=>x("component_design_id",s.target.value),children:[e.jsx("option",{value:"",children:" Choose Component Design "}),c.map(s=>e.jsxs("option",{value:s.id,children:[" ",s.name," "]},s.id))]})]}),o.component_design_id&&e.jsx("div",{className:"my-3",children:e.jsxs("span",{className:"text-red-700",children:[" ",o.component_design_id," "]})}),e.jsx("div",{className:"text-end",children:e.jsx("button",{type:"submit",className:"p-2 bg-black text-white rounded-md",children:"Use Component"})})]})})})};export{y as default};
