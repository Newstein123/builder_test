import{r as e,q as m,j as g,y as E}from"./app-6e357656.js";const j=e.createContext(null),F=({children:s})=>{const[i,a]=e.useState(!1),[r,o]=e.useState(!1),[n,l]=e.useState(!1),[c,V]=e.useState(!1),[d,p]=e.useState(!1),[u,t]=e.useState(!1),[b,C]=e.useState([]),{cpt_id:f}=m().props,x=S=>{E.get(route("component.design.index"),{cpt_id:f,cpt_design_id:S},{onSuccess:()=>{t(!0)}})};return g.jsx(j.Provider,{value:{createFieldVisible:i,createCptDsgVisible:r,createVarVisible:n,fieldVisible:c,cptVarVisible:d,errors:b,setErrors:C,setCreateCptDsgVisible:o,setCreateFieldVisible:a,setCreateVarVisible:l,setFieldVisible:V,setCptVarVisible:p,editVisible:u,setEditVisible:t,handleEdit:x},children:s})};export{j as C,F as a};
