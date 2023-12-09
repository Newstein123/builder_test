import FrontendLayout from "@/Layouts/FrontendLayout";
import React, { useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import Rodal from "rodal";
import { Toaster, toast } from "react-hot-toast";
import DuplicateSection from "./DuplicateSection";
import Edit from "./Edit";
import { SectionProvider } from "@/Context/SectionContext";
import SectionItems from "./SectionItems";

const Index = ({ sections, template_id, templates}) => {
    const [visible, setVisible] = useState(false);
    const [dupSecVisible, setDupSecVisible] = useState(false);
    const [errors, setErrors] = useState([]);
    const { data, setData, reset} = useForm({
        name: "",
        template_id: template_id,
        isShow: "yes",
        value : "",
    });

    const handleAddSection = () => {
        setVisible(true);
    };

    const handleDuplicateSection = () => {
        setDupSecVisible(true)
    }

    function submit(e) {
        e.preventDefault();
        router.post(route("section.store"), data, {
            onSuccess: () => {
                toast.success("Section Created Successfully");
                reset();
                setVisible(false)
            },
            onError: (err) => {
                setErrors(err);
            },
        });
    }

    return (
        <div className="m-10">
            <Toaster />
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold"> All Sections </h2>
                    <button className="text-red-700">
                        <Link href={route("template.index")}>Back</Link>
                    </button>
                </div>
                <div className="flex">
                <button className="text-red-800 me-3" onClick={handleDuplicateSection}>
                    Duplicate Sections
                </button>
                <button className="text-green-800" onClick={handleAddSection}>
                    Create Sections
                </button>
                </div>
            </div>

            {/* Create Section Modal  */}
            <Rodal
                visible={visible}
                onClose={() => setVisible(false)}
                width={600}
                height={500}
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
                        <div className="text-red-700 my-3"> {errors.value} </div>
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

            {/* Duplicate Section Modal  */}
            <DuplicateSection 
                setDupSecVisible={setDupSecVisible}
                dupSecVisible={dupSecVisible}
            />

            {/* Sections  */}
            <SectionItems 
                sections={sections}
            />

            {/* Edit  */}
            <Edit />
        </div>
    );
};

Index.layout = (page) => 
<SectionProvider>
    <FrontendLayout children={page} />;
</SectionProvider>
export default Index;
