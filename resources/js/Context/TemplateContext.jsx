import { router } from "@inertiajs/react";
import { createContext } from "react";
import {  useState} from "react";

export const TemplateContext = createContext(null)

export const TemplateProvider = ({children}) => {
    const [editVisible, setEditVisible] = useState(false)

    const handleEdit = (id) => {
        router.get(route('template.index'), {template_id : id}, {
            onSuccess : () => {
                setEditVisible(true)
            }
        });
    }

    return (
        <TemplateContext.Provider value={{
            editVisible,
            setEditVisible,
            handleEdit
        }}
        >
            {children}
        </TemplateContext.Provider>
    )
}