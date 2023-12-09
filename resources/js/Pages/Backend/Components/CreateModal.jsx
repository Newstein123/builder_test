import React, { useState } from "react";
import Rodal from "rodal";
import { router, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

const CreateModal = ({ cModalVisible, setCModalVisible }) => {
    const [errors, setErrors] = useState([]);
    const { data, setData, reset} = useForm({
        name: "",
        value: "",
        loopable: false,
        max_no_loop: 0,
    });

    function submit(e) {
        e.preventDefault();
        router.post(route("component.store"), data, {
            onSuccess: () => {
                setCModalVisible(false);
                toast.success("Component Created Successfully");
                reset()
            },
            onError: (err) => {
                setErrors(err);
            },
        });
    }
    return (
        <div>
            <Rodal
                visible={cModalVisible}
                width={600}
                height={500}
                onClose={() => setCModalVisible(false)}
            >
                <form onSubmit={submit}>
                    <h1 className="text-2xl font-bold"> Create Component</h1>
                    {/* name  */}
                    <div className="my-3">
                        <div className="my-3">
                            <label htmlFor=""> Enter Component Name </label>
                        </div>
                        <input
                            className="p-2 rounded-md w-full"
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                        />
                    </div>
                    {errors.name && (
                        <div className="text-red-700 my-3"> {errors.name} </div>
                    )}
                    {/* component  */}
                    <div className="my-3">
                        <div className="my-3">
                            <label htmlFor="">
                                Enter varibale name used in template.
                            </label>
                        </div>
                        <input
                            className="p-2 rounded-md w-full"
                            onChange={(e) => setData("value", e.target.value)}
                            value={data.value}
                        />
                    </div>
                    {errors.value && (
                        <div className="text-red-700 my-3">
                            {errors.value}
                        </div>
                    )}
                    {/* isLoopable  */}
                    <div className="my-3">
                        <div className="my-3">
                            <label htmlFor="">
                                This component can be loopable
                            </label>
                        </div>
                        <input
                            type="checkbox"
                            className="p-2 rounded-md"
                            defaultChecked={data.loopable}
                            onChange={(e) =>
                                setData("loopable", e.target.checked)
                            }
                        />
                    </div>
                    {/* Max no of loop  */}
                    <div className="my-3">
                        <div className="my-3">
                            <label htmlFor=""> Max no of loop </label>
                        </div>
                        <input
                            type="number"
                            className="p-2 rounded-md w-full"
                            value={data.max_no_loop}
                            onChange={(e) =>
                                setData("max_no_loop", e.target.value)
                            }
                        />
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
