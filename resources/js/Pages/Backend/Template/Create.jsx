import React, { useState } from "react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import { router, useForm } from "@inertiajs/react";
import SectionModal from "@/Components/Template/SectionModal";
import {Link} from "@inertiajs/react";

const Create = ({ categories, sub_industries }) => {
    const { data, setData } = useForm({
        name: "",
        category_id: "",
        isShow: "no",
    });
    const [errors, setErrors] = useState([]);
    const [visible, setVisible] = useState(false);

    function submit(e) {
        e.preventDefault();
        router.post(route("template.store"), data, {
            onSuccess: () => {},
            onError: (err) => {
                setErrors(err);
            },
        });
    }

    const handleAddCategory = () => {
        setVisible(true);
    };

    return (
        <div>
            <div className="mx-10 my-10">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold"> All Templates </h2>
                    <button className="text-red-800">
                        <Link href={route("template.index")}>
                            Back
                        </Link>
                    </button>
                </div>
                <form onSubmit={submit}>
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Add Name
                        </p>
                        <input
                            type="text"
                            className="p-2 w-full rounded-md"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    {errors.name && (
                        <div className="text-red-700 my-3"> {errors.name} </div>
                    )}
                    {/* Categories  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Add Name
                        </p>
                        <div className="flex">
                            <div className="w-2/3 me-5">
                                <select
                                    type="text"
                                    className="p-2 w-full rounded-md me-3"
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                >
                                    <option value=""> Select Category </option>
                                    {categories.map((item) => (
                                        <option value={item.id} key={item.id}>
                                            {" "}
                                            {item.name}{" "}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/3">
                                <button
                                    type="button"
                                    className="p-2 bg-red-800 text-white rounded-md"
                                    onClick={handleAddCategory}
                                >
                                    {" "}
                                    Create Category +{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                    {errors.category_id && (
                        <div className="text-red-700 my-3">
                            {" "}
                            {errors.category_id}{" "}
                        </div>
                    )}
                    {/* isShow  */}
                    <div className="my-3">
                        <p className="text-slate-800 font-bold text-xl">
                            Publish the template Now?
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
                    <div className="text-end">
                        <button
                            type="submit"
                            className="p-2 bg-black text-white rounded-md"
                        >
                            {" "}
                            Submit{" "}
                        </button>
                    </div>
                </form>
                <SectionModal
                    visible={visible}
                    setVisible={setVisible}
                    sub_industries={sub_industries}
                />
            </div>
        </div>
    );
};

Create.layout = (page) => (
    <FrontendLayout children={page} title="Template Creator" />
);
export default Create;
