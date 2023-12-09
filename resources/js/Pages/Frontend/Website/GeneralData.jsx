import React, { useState } from "react";
import { usePage } from "@inertiajs/react";

const GeneralData = ({formData, setFormData}) => {
    const { general_data } = usePage().props;

    const handleChange = (e, item) => {
        const value = item.type == "file" ? e.target.files[0] : e.target.value;
        setFormData({
            ...formData,
            [item.value] : value
        })
    }

    return (
        <div className="m-10">
            <h3 className="text-2xl font-bold"> Add General Data </h3>
            {general_data && (
                <div>
                    {general_data.map((item) => (
                        <div key={item.id}>
                            {/* text and file  */}
                            {item.type !== "file" ? (
                                <>
                                    <label htmlFor={item.value}>
                                        {item.name}
                                    </label>
                                    <input
                                        type={item.type}
                                        className="w-full p-2 rounded-md my-3"
                                        placeholder={`Enter your ${item.name}`}
                                        onChange={(e) => handleChange(e, item)}
                                    />
                                </>
                            ) : (
                                <div>
                                    <label htmlFor={item.value}>
                                        {item.name}
                                    </label>
                                    <input
                                        type={item.type}
                                        className="w-full p-2 rounded-md my-3"
                                        onChange={(e) => handleChange(e, item)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        className="p-2 bg-slate-800 text-white rounded-md"
                    >
                        Create Website 
                    </button>
                </div>
            )}
        </div>
    );
};

export default GeneralData;
