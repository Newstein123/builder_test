import { createContext, useState } from "react";

export const PageContext = createContext(null)

export const PageProvider = ({children}) => {
    const [createVisible, setCreateVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    return (
        <PageContext.Provider
            value={{
                createVisible,
                setCreateVisible,
                editVisible,
                setEditVisible
            }}
        >
            {children}
        </PageContext.Provider>
    )
}