import{r as c,j as s}from"./app-8945b544.js";import{R as x}from"./rodal.esm-e9de0cc2.js";import{a as f}from"./SectionDataContext-6a34eaf6.js";const j=()=>{const{visibleDesign:r,setVisibleDesign:i,setVisibleCreateDesignModal:o,fieldData:a,setData:n}=c.useContext(f),d=e=>{const l=a.filter(t=>t.id==e)[0].type;n(t=>({...t,type:l,option:l==="file"?"one":""})),i(!1),o(!0)};return s.jsx(x,{visible:r,width:800,height:400,onClose:()=>i(!1),children:s.jsx("div",{className:"flex flex-wrap mt-10",children:a.map(e=>s.jsx("div",{className:"w-1/3 cursor-pointer",onClick:()=>d(e.id),children:s.jsx("div",{className:"m-3 border-2 border-slate-900 p-5",children:s.jsx("h3",{className:"text-slate-600",children:e.name})})},e.id))})})};export{j as default};
