import FrontendLayout from "@/Layouts/FrontendLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Create = ({ cats }) => {
    const { data, setData } = useForm({
        name: "",
        price: 0,
        quantity: 0,
        currency: "mmk",
        category_id : "",
        variations: {},
        description: "hello world",
    });
    const [variations, setVariations] = useState([]);

    function submit(e) {
        e.preventDefault();
        router.post(route('product.store'), data, {
            onSuccess : () => {
                alert('success');
            },
            onError: (e) => {
                console.log(e)
            }
        });
    }

    const handleCategoryChange = (e) => {
        var id = e.target.value;
        setData('category_id', id)
        const filteredItems = cats.filter((item) => item.id == id);
        if(filteredItems.length > 0) {
            setVariations(JSON.parse(filteredItems[0].variations));
        } else {
            setVariations([])
        }
    };

    const handleVariationChange = (item, e) => {
        setData((prevData) => ({
            ...prevData,
            variations: {...prevData.variations, [item]: e.target.value }
        }));
    }

    return (
        <div className="flex justify-center overflow-auto" style={{
            height : '100vh',
        }}>
            <form className="max-w-sm mx-auto w-1/2" onSubmit={submit}>
                <h1 className="text-center fw-bold text-3xl"> Add Product </h1>
                {/* Product Name  */}
                <div className="my-3">
                    <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Product Name"
                        required=""
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>
                {/* Price  */}
                <div className="my-3">
                    <label
                        htmlFor="number"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Price
                    </label>
                    <input
                        type="number"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Product Price"
                        required=""
                        onChange={(e) => setData("price", e.target.value)}
                    />
                </div>
                <div className="my-3">
                    <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Price
                    </label>
                    <input
                        type="number"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Product Quantity"
                        required=""
                        onChange={(e) => setData("quantity", e.target.value)}
                    />
                </div>
                {/* Currency  */}
                <div>
                    <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Select Currency
                    </label>
                    <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option
                            selected=""
                            onChange={(e) =>
                                setData("currency", e.target.value)
                            }
                        >
                            Choose Currency
                        </option>
                        <option value="mmk"> MMK </option>
                        <option value="usd"> USD </option>
                    </select>
                </div>
                {/* Category  */}
                <div>
                    <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Select Category
                    </label>
                    <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => handleCategoryChange(e)}
                    >
                        <option selected="">Choose Category</option>
                        {cats.map((item) => (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Product Details  */}
                <div className="my-3">
                    <h1> Add Details Description </h1>
                    {variations.length > 0 ? (
                        <div>
                            <div className="my-2">
                                {variations.map((item, index) => (
                                    <div key={index}>
                                        <label
                                            htmlFor="text"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {item}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={"Enter " + item}
                                            required=""
                                            onChange={(e) =>
                                                handleVariationChange(item ,e)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <>
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Detail Description
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Add Description"
                                    defaultValue={""}
                                />
                            </>
                        </div>
                    )}
                </div>
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

Create.layout = (page) => <FrontendLayout children={page} title="Product" />
export default Create;
