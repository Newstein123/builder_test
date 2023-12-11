import React, { useContext } from "react";
import Rodal from "rodal";
import { SectionDataContext } from "@/Context/SectionDataContext";
import { router } from "@inertiajs/react";
import {toast} from 'react-hot-toast'

const CreateDesignModal = () => {
    const {visibleCreateDesignModal,setVisibleCreateDesignModal,setVisibleDesign,  errors, data, setData, setErrors, reset} = useContext(SectionDataContext)
    
    const handleChangeField =() => {
        setVisibleCreateDesignModal(false)
        setVisibleDesign(true)
    }

    function submit(e) {
        e.preventDefault();
        router.post(route('section.design.data.store'), data, {
            onSuccess : () => {
                toast.success("Design Data Created Successfully");
                setVisibleCreateDesignModal(false)
                reset();
            },
            onError : (err) => {
                setErrors(err)
            }
        })
    }
    return (
        
        <div>
            <Rodal
                visible={visibleCreateDesignModal}
                onClose={() => setVisibleCreateDesignModal(false)}
                width={600}
                height={500}
            >
                <form onSubmit={submit}>
                    {/* Name  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Add Name
                        </p>
                        <input
                            type="text"
                            className="p-2 w-full rounded-md"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    {errors.name && (
                        <div className="text-red-700 my-3"> {errors.name} </div>
                    )}
                    {/* Value  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Variable Name to use in template
                        </p>
                        <input
                            type="text"
                            className="p-2 w-full rounded-md"
                            value={data.value}
                            onChange={(e) => setData("value", e.target.value)}
                        />
                    </div>
                    {errors.value && (
                        <div className="text-red-700 my-3">{errors.value}</div>
                    )}
                    {/* For Image  */}
                    {data.type == "file" && (
                        <div>
                            {/* isShow  */}
                            <div className="my-3">
                                <p className="text-slate-800 font-bold text-xl">
                                    Choose File Type
                                </p>
                                <div className="my-3">
                                    <label htmlFor="yes"> One </label>
                                    <input
                                        type="radio"
                                        name="fileType"
                                        value="one"
                                        className="me-3"
                                        defaultChecked={true}
                                        onChange={(e) =>
                                            setData("option", e.target.value)
                                        }
                                    />
                                    <label htmlFor="no"> Multiple </label>
                                    <input
                                        type="radio"
                                        name="fileType"
                                        value="multiple"
                                        onChange={(e) =>
                                            setData("option", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* For Number  */}
                    {data.type == "number" && (
                        <div>
                            {/* isShow  */}
                            <div className="my-3">
                                <p className="text-slate-800 font-bold text-xl">
                                    Choose Number Type
                                </p>
                                <div className="my-3">
                                    <label htmlFor="yes"> Integer </label>
                                    <input
                                        type="radio"
                                        name="fileType"
                                        value="integer"
                                        className="me-3"
                                        defaultChecked={true}
                                        onChange={(e) =>
                                            setData("option", e.target.value)
                                        }
                                    />
                                    <label htmlFor="no"> Float </label>
                                    <input
                                        type="radio"
                                        name="fileType"
                                        value="float"
                                        onChange={(e) =>
                                            setData("option", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <button  
                        type="button"
                        className="text-yellow-700"
                        onClick={handleChangeField}
                    > 
                        Change Field Type 
                    </button>
                    <div className="text-end">
                        <button
                            type="submit"
                            className="p-2 bg-black text-white rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Rodal>
        </div>
    );
};

export default CreateDesignModal;
