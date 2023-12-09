import FrontendLayout from "@/Layouts/FrontendLayout";
import { Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import TemplateItems from "./TemplateItems";
import Edit from "./Edit";
import { TemplateProvider } from "@/Context/TemplateContext";

const Index = ({ templates }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            toast.success("Template Created Successfully");
        }
    }, []);

    return (
        <div className="mx-10 my-10">
            <Toaster />
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold"> All Templates </h2>
                <button className="text-green-800">
                    <Link href={route("template.create")}>
                        Create Template
                    </Link>
                </button>
            </div>

            {/* Template Items  */}
            <TemplateItems  
                templates={templates}
            />

            {/* Edit Template  */}
            <Edit />
            
        </div>
    );
};

Index.layout = (page) => 
<TemplateProvider>
    <FrontendLayout children={page} />;
</TemplateProvider>
export default Index;
