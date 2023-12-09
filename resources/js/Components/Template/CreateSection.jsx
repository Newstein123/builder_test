import React, { useState } from "react";
import "rodal/lib/rodal.css";
import Rodal from "rodal";

const CreateSection = ({ data, setData }) => {
    const [visible, setVisible] = useState(false);
    const [section, setSection] = useState({
        name: "",
        value: "",
        isShow: true,
        content: null,
    });

    const [errors, setErrors] = useState({
        name: "",
        value: "",
    });

    const handleAddSection = () => {
        if (errors.name == "") {
            setErrors({ ...errors, name: "Name field is required" });
        }

        if (errors.value == "") {
            setErrors({ ...errors, value: "Value field is required" });
        }
        setData((prevData) => ({
            ...prevData,
            sections: [...prevData.sections, section],
        }));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">
                Add Section
                <span
                    className="px-2 border-slate-800 border-2 cursor-pointer"
                    onClick={() => setVisible(true)}
                >
                    +
                </span>
            </h1>
            {/* Section Data  */}
            <div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Name 
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Value 
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    isShow
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.sections.length > 0 && 
                            data.sections.map((item) => (
                                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            Hero
                                        </th>
                                        <td class="px-6 py-4"> hero </td>
                                        <td class="px-6 py-4"> false </td>
                                        <td class="px-6 py-4">
                                            <a
                                                href="#"
                                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <Rodal
                visible={visible}
                onClose={() => setVisible(false)}
                closeOnEsc={true}
                width={500}
                height={350}
            >
                <h3 className="text-2xl font-bold"> Add Section </h3>
                {/* name  */}
                <div className="flex my-3">
                    <div className="w-1/3">
                        <label htmlFor="name" className="font-bold">
                            Name
                        </label>
                    </div>
                    <div className="w-2/3">
                        <input
                            type="text"
                            className="w-full rounded-md"
                            onChange={(e) =>
                                setSection({ ...section, name: e.target.value })
                            }
                        />
                    </div>
                </div>
                {errors.name && (
                    <div className="text-red-700 my-3"> {errors.name} </div>
                )}
                {/* value  */}
                <div className="flex my-3">
                    <div className="w-1/3">
                        <label htmlFor="value" className="font-bold">
                            Value
                        </label>
                    </div>
                    <div className="w-2/3">
                        <input
                            type="text"
                            className="w-full rounded-md"
                            onChange={(e) =>
                                setSection({
                                    ...section,
                                    value: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                {errors.value && (
                    <div className="text-red-700 my-3"> {errors.value} </div>
                )}
                {/* isShow  */}
                <div className="flex my-3">
                    <div className="w-1/5">
                        <input
                            type="checkbox"
                            className=""
                            defaultChecked={true}
                            onChange={(e) =>
                                setSection({
                                    ...section,
                                    isShow: e.target.checked,
                                })
                            }
                        />
                    </div>
                    <div className="w-4/5">
                        <label htmlFor="isShow" className="font-bold">
                            isShow
                        </label>
                    </div>
                </div>
                <div className="text-end">
                    <button
                        type="button"
                        className="bg-slate-900 text-white p-2 rounded-md"
                        onClick={handleAddSection}
                    >
                        Add
                    </button>
                </div>
            </Rodal>
        </div>
    );
};

export default CreateSection;
