import { router, usePage} from "@inertiajs/react";
import { createContext } from "react";
import {  useState} from "react";

export const SectionContext = createContext(null)

export const SectionProvider = ({children}) => {
    const [editVisible, setEditVisible] = useState(false)
    const {template_id} = usePage().props;
    const handleEdit = (id) => {
        router.get(route('section.index'),  {template_id : template_id, section_id : id}, {
            onSuccess : () => {
                setEditVisible(true)
            }
        });
    }

    return (
        <SectionContext.Provider value={{
            editVisible,
            setEditVisible,
            handleEdit
        }}
        >
            {children}
        </SectionContext.Provider>
    )
}