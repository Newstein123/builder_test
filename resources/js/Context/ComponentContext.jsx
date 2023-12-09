import { router, usePage} from "@inertiajs/react";
import {createContext } from "react";
import { useState } from "react";

export const ComponentContext = createContext(null)

export const ComponentProvider = ({children}) => {
    const [createFieldVisible, setCreateFieldVisible] = useState(false);
    const [createCptDsgVisible, setCreateCptDsgVisible] = useState(false);
    const [createVarVisible, setCreateVarVisible] = useState(false);
    const [fieldVisible, setFieldVisible] = useState(false);
    const [cptVarVisible, setCptVarVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false)
    const [errors, setErrors] = useState([])
    const {cpt_id} = usePage().props;

    const handleEdit =  (id) => {
        router.get(route('component.design.index'),  {cpt_id : cpt_id, cpt_design_id : id}, {
            onSuccess : () => {
                setEditVisible(true)
            }
        });
    }

    return (
        <ComponentContext.Provider value={{
            createFieldVisible,
            createCptDsgVisible,
            createVarVisible,
            fieldVisible,
            cptVarVisible,
            errors,
            setErrors,
            setCreateCptDsgVisible,
            setCreateFieldVisible,
            setCreateVarVisible,
            setFieldVisible,
            setCptVarVisible,
            editVisible, 
            setEditVisible,
            handleEdit
        }}>
            {children}
        </ComponentContext.Provider>
    )
}