import { PageContext } from "@/Context/PageContext";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useContext, useState } from "react";
import {toast} from "react-hot-toast";
import Rodal from "rodal";

const Create = () => {
    const {setCreateVisible, createVisible} = useContext(PageContext)
    const {template_id} = usePage().props;
    const {data, setData, reset} = useForm({
        'template_id' : template_id,
        'name' : '',
        'value' : '',
        'isPremium' : 'no',
    })
    const [errors, setErrors] = useState([]);

    function submit (e) {
        e.preventDefault();
        router.post(route('page.store'), data, {
            onSuccess : () => {
                setCreateVisible(false)
                reset();
                toast.success('Page Created Successfully');
            },
            onError : (err) => {
                setErrors(err)
            }
        });
    }
    return (
        <div>
            <Rodal
                visible={createVisible}
                onClose={() => setCreateVisible(false)}
                width={600}
                height={400}
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
                        <div className="text-red-700 my-3">
                            {errors.value}
                        </div>
                    )}
                    {/* isShow  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Premium Page 
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

export default Create;
