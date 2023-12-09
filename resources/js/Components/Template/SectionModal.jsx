import React from "react";
import Rodal from "rodal";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import {usePage} from "@inertiajs/react";
import toast, { Toaster } from 'react-hot-toast';

const SectionModal = ({ visible, setVisible, sub_industries }) => {
    const { data, setData, reset} = useForm({
        name: "",
        value: "",
        sub_industry_id : "",
    });
    const { flash } = usePage().props
    const [errors, setErrors] = useState([]);

    function submit(e) {
        e.preventDefault();
        console.log(data)
        router.post(route('category.create'), data, {
            onSuccess : () => {
                toast.success("Category Created Successfully", {
                    duration: 4000,
                    position: 'top-center',
                });
                reset()
                setVisible(false)
            },
            onError : (err) =>  {
                setErrors(err)
            }
        })
    }

    return (
        <div>
            <Toaster />
            <Rodal visible={visible} onClose={() => setVisible(false)} width={600} height={500}>
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
                            Add Value
                        </p>
                        <input
                            type="text"
                            className="p-2 w-full rounded-md"
                            value={data.value}
                            onChange={(e) => setData("value", e.target.value)}
                        />
                    </div>
                    {errors.value && (
                        <div className="text-red-700 my-3"> {errors.value} </div>
                    )}
                    {/* Categories  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Select Sub Industry 
                        </p>
                        <select
                            type="text"
                            className="p-2 w-full rounded-md me-3"
                            onChange={(e) =>
                                setData("sub_industry_id", e.target.value)
                            }
                            value={data.sub_industry_id}
                        >
                            <option value=""> Choose Sub Industry </option>
                            {sub_industries.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.sub_industry_id && (
                        <div className="text-red-700 my-3"> {errors.sub_industry_id} </div>
                    )}
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

export default SectionModal;
