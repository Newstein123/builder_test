import { SubIndustryContext } from '@/Context/SubIndustryContext'
import { router, useForm, usePage } from '@inertiajs/react'
import React from 'react'
import { useContext, useState } from 'react'
import Rodal from 'rodal'
import CreateField from './CreateField'
import toast from 'react-hot-toast'


const fieldData = [
    {
        id : 1,
        name : "Rich Text",
        type : "textarea",
        options : [],
    },
    {
        id : 2,
        name : "Text",
        type : "text",
        options : [],
    },
    {
        id : 3,
        name : "Number",
        type : "number",
        options : [],
    },
    {
        id : 4,
        name : "Date Time",
        type : "datetime",
        options : [],
    },
    {
        id : 5,
        name : "Media",
        type : "file",
        options : [
            {
                'label' : "One File",
                'value' : 'one'
            },
            {
                'label' : "Many File",
                'value' : 'many'
            },
        ],
    },
    {
        id : 6,
        name : "Boolean",
        type : "boolean",
        options : [],
    },
  ]

const FieldModal = () => {
    const {fieldVisible, setFieldVisible, setCreateFieldVisible, setErrors} = useContext(SubIndustryContext)
    const {industry_id} = usePage().props;

    const {data, setData, reset} = useForm({
        'name' : "",
        'value' : "",
        'type' : "",
        'option' : "",
        'industry_id' : industry_id
    })

    function submit(e) {
        e.preventDefault();
        router.post(route('industry.field.store'), data, {
            onSuccess : () => {
                setCreateFieldVisible(false)
                toast.success('General Data Field Created Successfully');
                reset()
            },
            onError : (err) => {
                setErrors(err)
            }
        })
    }

    const handleClick = (id) => {
        const filteredResults = fieldData.filter(item => item.id == id);
        const type = filteredResults[0].type;
        setData(prevData => ({
            ...prevData,
            type: type,
            option: type === 'file' ? 'one' : '',
        }));
    
        setFieldVisible(false)
        setCreateFieldVisible(true)
    }
  return (
    <div>
       <Rodal visible={fieldVisible} width={800} height={400} onClose={() => setFieldVisible(false)}>
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

        {/* Create Field  */}

        <CreateField 
            data={data}
            setData={setData}
            submit={submit}
        />
    </div>
  )
}

export default FieldModal
