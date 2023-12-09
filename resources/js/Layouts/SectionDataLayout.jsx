import React from "react";
import { Link, usePage} from "@inertiajs/react";
import {toast} from "react-hot-toast";
import { SectionDataContext } from "@/Context/SectionDataContext";
import { useContext } from "react";
import FieldModal from "@/Pages/Backend/SectionData/FieldModal";
import CreateFieldModal from "@/Pages/Backend/SectionData/CreateFieldModal";
import CreateCptModal from "@/Pages/Backend/SectionData/CreateCptModal";

const SectionDataLayout = ({ children}) => {
    const {setVisibleField, setVisibleComponent, section_id} = useContext(SectionDataContext)
    const {template_id} = usePage().props;
    return (
        <div className="m-10">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">All Sections Data</h2>
                        <button className="text-red-700">
                            <Link href={route("section.index", {template_id: template_id})}>Back</Link>
                        </button>
                    </div>
                    <div className="flex">
                        <button
                            className="text-green-800 me-3"
                            onClick={() => setVisibleField(true)}
                        >
                            Add Fields
                        </button>
                        <button
                            className="text-green-800"
                            onClick={() => setVisibleComponent(true)}
                        >
                            Add Components
                        </button>
                    </div>
                </div>
                <div className="flex my-5">
                    <div className="text-xl me-3">
                        <Link href={route('section.data.index', {section_id : section_id})}> Fields </Link>
                    </div>
                    <div className="text-xl">
                        <Link href={route('section.data.component.index', {section_id : section_id})}> Components </Link>
                    </div>
                </div>

                {/* Create Field Modal  */}
                <FieldModal/>

                {/* Create Section Modal  */}
                <CreateFieldModal />

                {/* Create Component Modal  */}
                <CreateCptModal />
                {children}
        </div>
    );
};

export default SectionDataLayout;
