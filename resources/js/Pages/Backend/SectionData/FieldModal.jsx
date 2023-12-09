import React, { useContext } from 'react'
import Rodal from 'rodal'
import { SectionDataContext } from '@/Context/SectionDataContext'

const FieldModal = () => {
    const{visibleField, setVisibleField, setVisibleCreateModal, fieldData, setData} = useContext(SectionDataContext)
    const handleClick = (id) => {
        const filteredResults = fieldData.filter(item => item.id == id);
        const type = filteredResults[0].type;
        setData(prevData => ({
            ...prevData,
            type: type,
            option: type === 'file' ? 'one' : '',
        }));
    
        setVisibleField(false)
        setVisibleCreateModal(true)
    }
  return (
    <Rodal visible={visibleField} width={800} height={400} onClose={() => setVisibleField(false)}>
        <div className='flex flex-wrap mt-10'>
        { 
            fieldData.map(item => (
                <div className="w-1/3 cursor-pointer"  key={item.id} onClick={() => handleClick(item.id)}>
                    <div className="m-3 border-2 border-slate-900 p-5">
                        <h3 className="text-slate-600">
                            {item.name}
                        </h3>
                    </div>
                </div>
            ))
        }
        </div>
    </Rodal>
  )
}

export default FieldModal
