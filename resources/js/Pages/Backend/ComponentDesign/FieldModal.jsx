import { ComponentContext } from "@/Context/ComponentContext";
import React, { useContext } from "react";
import Rodal from "rodal";
import CreateFieldModal from "./CreateFieldModal";
import { router, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

const fieldData = [
    {
        id: 1,
        name: "Color Wheel",
        type: "color",
    },
    {
        id: 2,
        name: "Text Field",
        type: "text",
    },
];

const FieldModal = () => {
    const { fieldVisible, setFieldVisible, setCreateFieldVisible, setErrors } =
        useContext(ComponentContext);
    const {cpt_id} = usePage().props;
    const { data, setData, reset } = useForm({
        name: "",
        value: "",
        type: "",
        option: "",
        cpt_id : cpt_id,
    });

    function submit(e) {
        e.preventDefault();
        router.post(route("component.design.data.store"), data, {
            onSuccess: () => {
                toast.success('Design Created Successfully')
                setCreateFieldVisible(false)
                reset()
            },
            onError: (err) => {
                setErrors(err);
            },
        });
    }

    const handleClick = (id) => {
        const filteredResults = fieldData.filter((item) => item.id == id);
        const type = filteredResults[0].type;
        setData((prevData) => ({
            ...prevData,
            type: type,
            option: type === "file" ? "one" : "",
        }));
        setFieldVisible(false);
        setCreateFieldVisible(true);
    };

    return (
        <div>
            <Rodal
                visible={fieldVisible}
                width={800}
                height={400}
                onClose={() => setFieldVisible(false)}
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

            {/* Create Field Modal  */}
            <CreateFieldModal submit={submit} data={data} setData={setData} />
        </div>
    );
};

export default FieldModal;
