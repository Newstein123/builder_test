import{r as e,q as f,W as D,j as M}from"./app-8945b544.js";const V=e.createContext(null),g=[{id:1,name:"Rich Text",type:"textarea",options:[]},{id:2,name:"Text",type:"text",options:[]},{id:3,name:"Number",type:"number",options:[]},{id:4,name:"Date Time",type:"datetime",options:[]},{id:5,name:"Media",type:"file",options:[{label:"One File",value:"one"},{label:"Many File",value:"many"}]},{id:6,name:"Boolean",type:"boolean",options:[]},{id:7,name:"Color",type:"color",options:[]}],j=({children:s})=>{const[a,o]=e.useState(!1),[i,n]=e.useState(!1),[l,r]=e.useState(!1),[p,d]=e.useState(!1),[c,m]=e.useState(!1),[b,u]=e.useState(!1),[C,v]=e.useState([]),{section_id:t}=f().props,{data:x,setData:S,reset:y}=D({name:"",value:"",type:"",option:"",section_id:t,isShow:"no"});return M.jsx(V.Provider,{value:{setVisibleComponent:r,setVisibleField:o,setVisibleCreateModal:d,setVisbileCreateCptModal:m,setVisibleCreateDesignModal:u,setVisibleDesign:n,setErrors:v,setData:S,reset:y,errors:C,visibleField:a,visibleComponent:l,visibleCreateModal:p,visibleCreateCptModal:c,visibleCreateDesignModal:b,visibleDesign:i,fieldData:g,data:x,section_id:t},children:s})};export{j as S,V as a};