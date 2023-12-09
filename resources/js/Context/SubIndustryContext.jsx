import {createContext, useState} from 'react';

export const SubIndustryContext = createContext(null)

export const SubIndustryProvider = ({children}) => {
    const [fieldVisible, setFieldVisible] = useState(false)
    const [createFieldVisible, setCreateFieldVisible] = useState(false)
    const [errors, setErrors] = useState([])
    return (
        <SubIndustryContext.Provider value={{
            fieldVisible,
            createFieldVisible,
            setFieldVisible,
            setCreateFieldVisible,
            errors,
            setErrors
        }}
        >
            {children}
        </SubIndustryContext.Provider>
    )
}