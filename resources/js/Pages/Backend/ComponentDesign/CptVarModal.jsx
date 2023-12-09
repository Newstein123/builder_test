import { ComponentContext } from "@/Context/ComponentContext";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useContext } from "react";
import Rodal from "rodal";
import CreateCptVarModal from "./CreateCptVarModal";
import toast from "react-hot-toast";
const fieldData = [
    {
        id : 1,
        name : "Rich Text",
        type : "textarea",
    },
    {
        id : 2,
        name : "Text",
        type : "text",
    },
    {
        id : 3,
        name : "Number",
        type : "number",
    },
    {
        id : 4,
        name : "Date Time",
        type : "datetime",
    },
    {
        id : 5,
        name : "Media",
        type : "file",
    },
    {
        id : 6,
        name : "Boolean",
        type : "boolean",
    },
  ]

const CptVarModal = () => {
    const { cptVarVisible, setCptVarVisible, setCreateVarVisible, setErrors} = useContext(ComponentContext);
    const {cpt_id} = usePage().props;
    const {data, setData, reset}  = useForm({
        'name' : '',
        'value' : '',
        'type' : '',
        'option' : '',
        'cpt_id' : cpt_id,
    })

    function submit(e) {
        e.preventDefault()
        router.post(route('component.variable.store'), data, {
            onSuccess : () => {
                toast.success("Component Variable Created Successfully");
                setCreateVarVisible(false);
                reset()
            },
            onError : (err) => {
                setErrors(err)
            }
        })
    }

    const handleClick  = (id) => {
        const filteredResults = fieldData.filter((item) => item.id == id);
        const type = filteredResults[0].type;
        setData((prevData) => ({
            ...prevData,
            type: type,
            option: type === "file" ? "one" : "",
        }));
        setCreateVarVisible(true)
        setCptVarVisible(false)
    }

    return (
        <div>
            <Rodal
                visible={cptVarVisible}
                width={800}
                height={400}
                onClose={() => setCptVarVisible(false)}
            >
                <div className="flex flex-wrap mt-10">
                    {fieldData.map((item) => (
                        <div
                            className="w-1/3 cursor-pointer"
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                        >
                            <div className="m-3 border-2 border-slate-900 p-5">
                                <h3 className="text-slate-600">{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </Rodal>

            {/* create var modal  */}
            <CreateCptVarModal  
                data={data}
                setData={setData}
                submit={submit}
            />
        </div>
    );
};

export default CptVarModal;
