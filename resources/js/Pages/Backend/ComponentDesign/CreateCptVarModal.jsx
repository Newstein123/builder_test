import { ComponentContext } from "@/Context/ComponentContext";
import React, { useContext } from "react";
import Rodal from 'rodal'

const CreateCptVarModal = ({data, setData, submit}) => {
    const {createVarVisible, setCreateVarVisible, errors, setCptVarVisible} = useContext(ComponentContext)

    const handleChangeField = () => {
        setCreateVarVisible(false)
        setCptVarVisible(true)
    }

    return (
        <div>
            <Rodal
                visible={createVarVisible}
                onClose={() => setCreateVarVisible(false)}
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

export default CreateCptVarModal;
