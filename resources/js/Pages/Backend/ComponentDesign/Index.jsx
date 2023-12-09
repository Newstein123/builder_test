import FrontendLayout from "@/Layouts/FrontendLayout";
import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Items from "./Items";
import { Link } from "@inertiajs/react";
import CreateModal from "./CreateModal";
import FieldModal from "./FieldModal";
import { ComponentContext, ComponentProvider } from "@/Context/ComponentContext";
import FieldItem from "./FieldItem";
import CptVarItems from "./CptVarItems";
import CptVarModal from "./CptVarModal";
import Edit from "./Edit";

const Index = ({cpt_designs, cpt_id, cpt_fields, cpt_vars}) => {
    
    const {setCreateCptDsgVisible, setFieldVisible, setCptVarVisible} = useContext(ComponentContext)

    const handleAddCptDesign = () => {
        setCreateCptDsgVisible(true)
    }

    const handleAddField = () => {
        setFieldVisible(true)
    }

    const handleAddVariables = () => {
        setCptVarVisible(true)
    }

  return (
    <div className="m-10">
    <Toaster />
    <div className="flex justify-between">
        <div>
            <h2 className="text-2xl font-bold"> Component Design </h2>
            <button className="text-red-700">
                <Link href={route("component.index")}>Back</Link>
            </button>
        </div>
        <div className="flex flex-col">
            <button className="text-green-800 bg-slate-200 p-2 rounded-md" onClick={handleAddCptDesign}>
                Create Component Design
            </button>
            <div className="flex mt-3">
                <button className="text-green-800 bg-slate-200 p-2 rounded-md me-2" onClick={handleAddField}>
                    Add Fields
                </button>
                <button className="text-green-800  bg-slate-200 p-2 rounded-md" onClick={handleAddVariables}>
                    Make Variables
                </button>
            </div>
        </div>
    </div>

    {/* Create Component Design Modal  */}
    <CreateModal  
        cpt_id={cpt_id}
    />

    {/* Component Design Items  */}
    <Items 
        cpt_designs={cpt_designs}
    />

    <h2 className="text-2xl font-bold mt-5"> Component Fields </h2>
    {/* Field Items  */}
    <FieldItem cpt_fields={cpt_fields} />

    <h2 className="text-2xl font-bold mt-5"> Component Variables  </h2>
    <CptVarItems cpt_vars={cpt_vars} />

    {/* To show availiable field  */}
    <FieldModal />

    {/* To show avabiliable field for variables  */}

    <CptVarModal />

    {/* Edit  */}

    <Edit />
    
</div>
  )
}

Index.layout = page => 
<ComponentProvider>
    <FrontendLayout children={page} />
</ComponentProvider>
export default Index
