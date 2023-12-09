import React, { useContext } from "react";
import { router } from "@inertiajs/react";
import { Link, useForm } from "@inertiajs/react";
import Rodal from "rodal";
import { useState } from "react";
import { ComponentContext } from "@/Context/ComponentContext";
import CreateFieldModal from "./CreateFieldModal";

const CreateModal = ({cpt_id}) => {
    const {createCptDsgVisible, setCreateCptDsgVisible} = useContext(ComponentContext)
    const [errors, setErrors] = useState([]);
    const { data, setData } = useForm({
        name: "",
        isShow: "no",
        isPremium: "no",
        component_id : cpt_id
    });

    function submit(e) {
        e.preventDefault();
        router.post(route("component.design.store"), data, {
            onSuccess: () => {
                setCreateCptDsgVisible(false);
                toast.success("Component Design Created Successfully");
            },
            onError: (err) => {
                setErrors(err);
            },
        });
    }
    return (
        <div>
            <Rodal
                visible={createCptDsgVisible}
                width={400}
                height={400}
                onClose={() => setCreateCptDsgVisible(false)}
            >
                <form onSubmit={submit}>
                    <h1 className="text-2xl font-bold"> Create Component Design</h1>
                    {/* name  */}
                    <div className="my-3">
                        <div className="my-3">
                            <label htmlFor=""> Enter Component Design Name </label>
                        </div>
                        <input
                            className="p-2 rounded-md w-full"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    {errors.name && (
                        <div className="text-red-700 my-3"> {errors.name} </div>
                    )}
                    {/* isShow  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Show this section in template?
                        </p>
                        <div className="my-3">
                            <label htmlFor="yes"> Yes </label>
                            <input
                                type="radio"
                                name="isShow"
                                value="yes"
                                className="me-3"
                                onChange={(e) =>
                                    setData("isShow", e.target.value)
                                }
                            />
                            <label htmlFor="no"> No </label>
                            <input
                                type="radio"
                                name="isShow"
                                value="no"
                                defaultChecked={true}
                                onChange={(e) =>
                                    setData("isShow", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    {/* isPremium  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Is this a premium component?
                        </p>
                        <div className="my-3">
                            <label htmlFor="yes"> Yes </label>
                            <input
                                type="radio"
                                name="isPremium"
                                value="yes"
                                className="me-3"
                                onChange={(e) =>
                                    setData("isPremium", e.target.value)
                                }
                            />
                            <label htmlFor="no"> No </label>
                            <input
                                type="radio"
                                name="isPremium"
                                value="no"
                                defaultChecked={true}
                                onChange={(e) =>
                                    setData("isPremium", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="my-3 text-end">
                        <button className="bg-slate-800 text-white p-2 rounded-md">
                            Submit
                        </button>
                    </div>
                </form>
            </Rodal>

        </div>
    );
};

export default CreateModal;
