import{q as r,r as a,j as e,d as m}from"./app-6e357656.js";import{F as o}from"./FrontendLayout-00f3f7bc.js";import{n as l,I as i}from"./index-f7f45ee6.js";import c from"./TemplateItems-62919fe4.js";import p from"./Edit-a865e519.js";import{a as x}from"./TemplateContext-0c34052b.js";import"./rodal.esm-d2914f86.js";import"./index-f0c49e0f.js";import"./MyCodeEditor-a08b0bc4.js";const n=({templates:s})=>{const{flash:t}=r().props;return a.useEffect(()=>{t.message&&l.success("Template Created Successfully")},[]),e.jsxs("div",{className:"mx-10 my-10",children:[e.jsx(i,{}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h2",{className:"text-2xl font-bold",children:" All Templates "}),e.jsx("button",{className:"text-green-800",children:e.jsx(m,{href:route("template.create"),children:"Create Template"})})]}),e.jsx(c,{templates:s}),e.jsx(p,{})]})};n.layout=s=>e.jsxs(x,{children:[e.jsx(o,{children:s}),";"]});export{n as default};
