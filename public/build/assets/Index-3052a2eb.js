import{r as l,j as e,d as n}from"./app-6e357656.js";import{F as a}from"./FrontendLayout-00f3f7bc.js";import{I as i}from"./index-f7f45ee6.js";import o from"./SubIndustryItems-79d9e99e.js";import x from"./FieldModal-55b6de54.js";import{S as c,a as m}from"./CreateField-0a9cbafd.js";import u from"./FieldItems-9aada2ac.js";import"./rodal.esm-d2914f86.js";const j=({sub_industries:s,idy_fields:t})=>{const{setFieldVisible:r}=l.useContext(c),d=()=>{};return e.jsxs("div",{className:"m-10",children:[e.jsx(i,{}),e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold",children:" All Sub Industries "}),e.jsx("button",{className:"text-red-700",children:e.jsx(n,{href:route("industry.index"),children:"  Back   "})})]}),e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"text-red-800 me-3",onClick:()=>r(!0),children:"Create General Field"}),e.jsx("button",{className:"text-green-800",onClick:d,children:"Create Sub Industry"})]})]}),e.jsx("h2",{className:"text-xl font-bold",children:" Sub Industries "}),e.jsx(o,{sub_industries:s}),e.jsx("h2",{className:"text-xl font-bold",children:" General Data "}),e.jsx(u,{idy_fields:t}),e.jsx(x,{})]})};j.layout=s=>e.jsx(m,{children:e.jsx(a,{children:s})});export{j as default};
