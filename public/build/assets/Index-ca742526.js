import{r as m,j as e,d as x}from"./app-8945b544.js";import{F as c}from"./FrontendLayout-365e4934.js";import{I as p}from"./index-f85fabbe.js";import j from"./Items-79a7fc9d.js";import h from"./CreateModal-67e1f3c3.js";import f from"./FieldModal-87be3d71.js";import{C,a as u}from"./ComponentContext-ffa80ff9.js";import b from"./FieldItem-29e3dad9.js";import g from"./CptVarModal-3dbc4677.js";import N from"./Edit-4f9b0d02.js";import"./rodal.esm-e9de0cc2.js";import"./CreateFieldModal-e62d9e07.js";import"./CreateCptVarModal-f9061984.js";import"./MyCodeEditor-2a05645c.js";import"./index-aed679ba.js";const v=({cpt_designs:t,cpt_id:s,cpt_fields:o,cpt_vars:D})=>{const{setCreateCptDsgVisible:r,setFieldVisible:n,setCptVarVisible:d}=m.useContext(C),i=()=>{r(!0)},l=()=>{n(!0)},a=()=>{d(!0)};return e.jsxs("div",{className:"m-10",children:[e.jsx(p,{}),e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold",children:" Component Design "}),e.jsx("button",{className:"text-red-700",children:e.jsx(x,{href:route("component.index"),children:"Back"})})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("button",{className:"text-green-800 bg-slate-200 p-2 rounded-md",onClick:i,children:"Create Component Design"}),e.jsxs("div",{className:"flex mt-3",children:[e.jsx("button",{className:"text-green-800 bg-slate-200 p-2 rounded-md me-2",onClick:l,children:"Add Design Data"}),e.jsx("button",{className:"text-green-800  bg-slate-200 p-2 rounded-md",onClick:a,children:"Add Content Data"})]})]})]}),e.jsx(h,{cpt_id:s}),e.jsx(j,{cpt_designs:t}),e.jsx("h2",{className:"text-2xl font-bold mt-5",children:" Component Fields "}),e.jsx(b,{cpt_fields:o}),e.jsx(f,{}),e.jsx(g,{}),e.jsx(N,{})]})};v.layout=t=>e.jsx(u,{children:e.jsx(c,{children:t})});export{v as default};