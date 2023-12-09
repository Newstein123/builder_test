import React, { useState } from "react";
import Rodal from "rodal";
import { useContext } from "react";
import { SectionDataContext } from "@/Context/SectionDataContext";
import { router, useForm, usePage } from "@inertiajs/react";

const CreateCptModal = () => {
    const {visibleComponent, setVisibleComponent, section_id, setErrors, errors} = useContext(SectionDataContext)
    const {components} = usePage().props;
    const [designs, setDesigns] = useState([])

    const {data, setData, reset} = useForm({
        'component_design_id': '',
        'section_id' : section_id
    })

    const handleCptChange  = (id) => {
        const filteredDesigns = components.filter(item => item.id == id)
        setDesigns(filteredDesigns[0].designs)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('section.data.component.store'), data, {
            onSuccess : () => {
                setVisibleComponent(false)
                reset()
            },
            onError : (err) => {
                setErrors(err)
            }
        })
    }
    return (
        <div>
            <Rodal
                visible={visibleComponent}
                onClose={() => setVisibleComponent(false)}
                width={450}
                height={350}
            >
                <form onSubmit={handleSubmit}>
                    {/* Select From Existing Components  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Select Components
                        </p>
                        <select className="w-full p-2 rounded-md" onChange={(e) => handleCptChange(e.target.value)}>
                            <option value=""> Choose Component </option>
                            {
                                components.map(item => (
                                    <option value={item.id} key={item.id}> {item.name} </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Component Designs */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Select Component Designs
                        </p>
                        <select className="w-full p-2 rounded-md" onChange={(e) => setData('component_design_id', e.target.value)}>
                            <option value=""> Choose Component Design </option>
                            {
                                designs.map(item => (
                                    <option value={item.id} key={item.id}> {item.name} </option>
                                ))
                            }
                        </select>
                    </div>
                    {
                        errors.component_design_id && 
                        <div className="my-3"> 
                            <span className="text-red-700"> {errors.component_design_id} </span> 
                        </div>
                    }
                    
                    <div className="text-end">
                        <button
                            type="submit"
                            className="p-2 bg-black text-white rounded-md"
                        >
                            Use Component
                        </button>
                    </div>
                </form>
            </Rodal>
        </div>
    );
};

export default CreateCptModal;
