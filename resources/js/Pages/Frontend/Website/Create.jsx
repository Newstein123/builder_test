import FrontendLayout from "@/Layouts/FrontendLayout";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import GeneralData from "./GeneralData";

const Create = ({ industries }) => {
    const [subIndustries, setSubIndustries] = useState([]);
    const [categories, setCategories] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showTemplateForm, setShowTemplateForm] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({});

    const { data, setData } = useForm({
        user_id: "",
        template_id: "",
        name : "",
    });

    function submit(e) {
        e.preventDefault();
        router.post(
            route("website.store"),
            { data: data, formData: formData },
            {
                forceFormData: true,
                onSuccess: () => {
                    alert("success");
                },
                onError: (err) => {
                    console.log(err);
                },
            }
        );
    }

    const handleIndustryChange = (e) => {
        const id = e.target.value;
        const filteredResults = industries.filter((item) => item.id == id);
        setSubIndustries(filteredResults[0].sub_industries);
    };

    const handleSubIndustryChange = (e) => {
        const id = e.target.value;
        const filteredResults = subIndustries.filter((item) => item.id == id);
        setCategories(filteredResults[0].categories);
    };

    const handleCategoryChange = (e) => {
        const id = e.target.value;
        const filteredResults = categories.filter((item) => item.id == id);
        setTemplates(filteredResults[0].templates);
    };

    const handleTemplateChange = (id) => {
        if (id === selectedTemplate) {
            setSelectedTemplate(null);
            setData("template_id", "");
        } else {
            setSelectedTemplate(id);
            setData("template_id", id);
        }
    };

    const handleCreateTemplate = () => {
        if (data.template_id !== "") {
            router.get(
                route("website.create"),
                { template_id: data.template_id },
                {
                    preserveState: true,
                    onSuccess: () => {
                        // do something
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                }
            );
            setShowTemplateForm(true);
        } else {
            setError("Choose Template");
            console.log(error);
            alert(error);
        }
    };

    const handleGoBack = () => {
        setShowTemplateForm(false);
    };

    return (
        <div className="my-5">
            <form className="max-w-sm mx-auto w-1/2" onSubmit={submit}>
                <h1 className="text-center fw-bold text-3xl">
                    
                    Make Your Website
                </h1>
                {!showTemplateForm ? (
                    <div>
                        {/* Industry  */}
                        <div className="my-3">
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-90"
                            >
                                Select Industry
                            </label>
                            <select
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => handleIndustryChange(e)}
                            >
                                <option value="" selected={true}>
                                    
                                    Choose Industry
                                </option>
                                {industries.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Sub Industry  */}
                        <div className="my-3">
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-90"
                            >
                                Select SubIndustry
                            </label>
                            <select
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => handleSubIndustryChange(e)}
                            >
                                <option value="" selected={true}>
                                    
                                    Choose SubIndustry
                                </option>
                                {subIndustries.length > 0 &&
                                    subIndustries.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {/* Category */}
                        <div className="my-3">
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-90"
                            >
                                Select Category
                            </label>
                            <select
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => handleCategoryChange(e)}
                            >
                                <option value="" selected={true}>
                                    
                                    Choose Category
                                </option>
                                {categories.length > 0 &&
                                    categories.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {/* Template  */}
                        <div className="my-3">
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-90"
                            >
                                Select Templates
                            </label>
                            <div className="flex">
                                {templates.length > 0 &&
                                    templates.map((item) => (
                                        <div
                                            className={
                                                item.id == selectedTemplate
                                                    ? "w-1/4 border-2 border-violet-700"
                                                    : "w-1/4"
                                            }
                                            key={item.id}
                                            onClick={() =>
                                                handleTemplateChange(item.id)
                                            }
                                        >
                                            <img
                                                src="https://cdn.dribbble.com/userupload/7943937/file/original-357c3c4e007dd397244e389411cc85c7.jpg?resize=400x0"
                                                alt=""
                                                className="w-full"
                                            />
                                            {item.name}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="p-2 bg-slate-800 text-white rounded-md"
                            onClick={handleCreateTemplate}
                        >
                            Create Template
                        </button>
                    </div>
                ) : (
                    <div className="my-10">
                        <div className="text-end">
                            <button
                                type="button"
                                className="p-2 bg-slate-800 text-white rounded-md"
                                onClick={handleGoBack}
                            >
                                
                                Go Back
                            </button>

                            {/* Webiste Name  */}
                            <div className="my-3">
                                <label
                                    htmlFor="countries"
                                    className="block mb-2 text-sm font-medium text-gray-90"
                                >
                                    Website Name 
                                </label>
                                <input
                                    type="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Enter Website Name"
                                    className="w-full p-2 rounded-md border-2 border-slate-900"
                                />
                            </div>
                            {/* General Data  */}
                            <GeneralData
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

Create.layout = (page) => (
    <FrontendLayout children={page} title="Create Website" />
);
export default Create;
