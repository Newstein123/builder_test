import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import FrontendLayout from "@/Layouts/FrontendLayout";

const Create = () => {
    const [variations, setVariation] = useState(false);
    const [count, setCount] = useState(1);
    const { data, setData } = useForm({
        name: "",
        website_id: 1,
        value: "category",
        variations: [],
    });

    const handleVariationChange = (e) => {
        var addVariation = e.target.value;
        if (addVariation == "yes") {
            setVariation(true);
        } else {
            setVariation(false);
            setData("variations", []);
        }
    };

    const addVariation = () => {
        setCount(count + 1);
    };

    function submit(e) {
        console.log(data);
        e.preventDefault();
        router.post(route("category.store"), data, {
            onSuccess: () => {
                alert("success");
            },
            onError: (e) => {
                console.log(e);
            },
        });
    }

    const deleteVariation = (index) => {
        setCount((prevCount) => prevCount - 1);
        const newVariations = [...data.variations];
        newVariations.splice(index, 1)
        setData("variations", newVariations)
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="max-w-sm mx-auto w-1/2" onSubmit={submit}>
                <h1 className="text-3xl font-bold text-center">
                    Add Category
                </h1>
                <div className="mb-5">
                    <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Category Name
                    </label>
                    <input type="hidden" name="website_id" />
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Category Name"
                        required=""
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <h1> Do you want to add varitions for this </h1> <br />
                    <div className="flex items-center mb-4">
                        <input
                            id="default-radio-1"
                            type="radio"
                            defaultValue="yes"
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => handleVariationChange(e)}
                        />
                        <label
                            htmlFor="default-radio-1"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Yes
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            defaultChecked=""
                            id="default-radio-2"
                            type="radio"
                            defaultValue="no"
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => handleVariationChange(e)}
                        />
                        <label
                            htmlFor="default-radio-2"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            No
                        </label>
                    </div>
                </div>
                {variations && (
                    <>
                        <button
                            type="button"
                            className="text-slate-200 bg-violet-700 p-2 rounded-md my-3 text-sm"
                            onClick={() => addVariation()}
                        >
                            Add Variations{" "}
                        </button>
                        {[...Array(count)].map((_, index) => (
                            <div key={index} className="my-3">
                                <label
                                    htmlFor={`variation_${index}`}
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Variation {index + 1}
                                </label>
                                <div className="flex justify-between">
                                    <input
                                        type="text"
                                        id={`variation_${index}`}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={`Enter Variation ${
                                            index + 1
                                        }`}
                                        required=""
                                        value={data.variations[index]}
                                        onChange={(e) => {
                                            // Update the variations array in data
                                            const newVariations = [
                                                ...data.variations,
                                            ];
                                            newVariations[index] =
                                                e.target.value;
                                            setData(
                                                "variations",
                                                newVariations
                                            );
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="text-slate-300 1/5 rounded-md px-3 py-2 bg-red-700"
                                        onClick={() => deleteVariation(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                <br />
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

Create.layout = page => <FrontendLayout children={page} title="Product" />
export default Create;
