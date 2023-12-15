import Rodal from "rodal";
import React, { useContext, useEffect, useState } from "react";
import { SectionDataContext } from "@/Context/SectionDataContext";
import { useForm, usePage } from "@inertiajs/react";
import CharCount from "./Cpt/CharCount";
import FileAccept from "./Cpt/FileAccept";
import FileTypeAccept from "./Cpt/FileTypeAccept";
import FileDimension from "./Cpt/FileDimension";

const EditField = () => {
    const { setEditFieldVisible, editFieldVisible } =
        useContext(SectionDataContext);
    const {fieldResponse} = usePage().props;
    const [openLimittedCharCount, setOpenLimittedCharCount] = useState(false);
    const [openFileSize, setOpenFileSize] = useState(false);
    const [openFileType, setOpenFileType] = useState(false);
    const [openFileDimension, setOpenFileDimension] = useState(false);
    const { data, setData } = useForm({
        name: fieldResponse.name,
        value: fieldResponse.value,
        type: fieldResponse.type,
        default_value : "",
        required : "",
        unique : "",
        helper_text : "",
    });

    const [errors, setErrors] = useState([]);

    function submit(e) {
        e.preventDefault();
        console.log(data)
    }

    const hanldeCharChange = (e) => {
        if (e.target.checked == true) {
            setOpenLimittedCharCount(true);
        } else {
            setOpenLimittedCharCount(false);
        }
    };

    const hanldeFileSize = (e) => {
        if (e.target.checked == true) {
            setOpenFileSize(true);
        } else {
            setOpenFileSize(false);
        }
    };

    const hanldeFileType = (e) => {
        if (e.target.checked == true) {
            setOpenFileType(true);
        } else {
            setOpenFileType(false);
        }
    };

    const hanldeFileDimension = (e) => {
        if (e.target.checked == true) {
            setOpenFileDimension(true);
        } else {
            setOpenFileDimension(false);
        }
    };

    return (
        <div>
            <Rodal
                visible={editFieldVisible}
                width={1300}
                height={700}
                onClose={() => setEditFieldVisible(false)}
            >
                <div className="relative">
                    <div className="flex">
                        <div className="w-3/12 border-r-2">
                            <div className="sticky top-0">
                                <ul>
                                    <li className="py-3">
                                        <a href="#fieldAndData">
                                            Field And Data
                                        </a>
                                    </li>
                                    <li className="py-3">
                                        <a href="#validation"> Validation </a>
                                    </li>
                                    <li className="py-3">
                                        <a href="#defaultValue"> Default </a>
                                    </li>
                                    <li className="py-3">
                                        <a href="#apperance">Apperance </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-9/12">
                            <form onSubmit={submit}>
                                <div id="fieldAndData" className="m-5">
                                    <h3 className="text-2xl font-bold">
                                        Name and field
                                    </h3>
                                    {/* Name  */}
                                    <div className="my-3">
                                        <p className="text-slate-800 font-bold text-xl">
                                            Name
                                        </p>
                                        <input
                                            type="text"
                                            className="p-2 w-full rounded-md"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="text-red-700 my-3">
                                            {errors.name}
                                        </div>
                                    )}
                                    {/* Value  */}
                                    <div className="my-3">
                                        <p className="text-slate-800 font-bold text-xl">
                                            Variable Name used in template
                                        </p>
                                        <input
                                            type="text"
                                            className="p-2 w-full rounded-md"
                                            value={data.value}
                                            onChange={(e) =>
                                                setData("value", e.target.value)
                                            }
                                        />
                                    </div>
                                    {errors.value && (
                                        <div className="text-red-700 my-3">
                                            {errors.value}
                                        </div>
                                    )}

                                    <div className="text-end">
                                        <button
                                            type="submit"
                                            className="p-2 bg-black text-white rounded-md"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <div id="validation" className="m-5">
                                    <h3 className="text-2xl font-bold">
                                        Validation
                                    </h3>
                                    {/* required  */}
                                    <div className="my-3">
                                        <input
                                            id="required"
                                            type="checkbox"
                                            className="p-2 rounded-md me-3"
                                            defaultChecked={data.required}
                                            onChange={(e) =>
                                                setData(
                                                    "required",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <label htmlFor="required">
                                            Required
                                        </label>
                                    </div>
                                    {/* unique  */}
                                    {data.type !== "file" && (
                                        <div className="my-3">
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur, adipisicing elit.
                                            </p>
                                            <input
                                                id="unique"
                                                type="checkbox"
                                                className="p-2 rounded-md me-3"
                                                defaultChecked={data.unique}
                                                onChange={(e) =>
                                                    setData(
                                                        "unique",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <label htmlFor="unique">
                                                Unique
                                            </label>
                                        </div>
                                    )}
                                    {/* limit char count  */}
                                    <div className="my-3">
                                        <p>
                                            Lorem ipsum dolor sit amet
                                            consectetur, adipisicing elit.
                                        </p>
                                        <input
                                            id="required"
                                            type="checkbox"
                                            className="p-2 rounded-md me-3"
                                            defaultChecked={data.loopable}
                                            onChange={(e) =>
                                                hanldeCharChange(e)
                                            }
                                        />
                                        <label htmlFor="required">
                                            Limited Character Count
                                        </label>
                                    </div>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit.
                                    </p>
                                    {openLimittedCharCount && (
                                        <CharCount
                                            data={data}
                                            setData={setData}
                                        />
                                    )}
                                    {/* file size  */}
                                    <div className="my-3">
                                        <input
                                            id="required"
                                            type="checkbox"
                                            className="p-2 rounded-md me-3"
                                            defaultChecked={data.loopable}
                                            onChange={(e) => hanldeFileSize(e)}
                                        />
                                        <label htmlFor="required">
                                            Accepted File Size
                                        </label>
                                    </div>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit.
                                    </p>
                                    {openFileSize && (
                                        <FileAccept
                                            data={data}
                                            setData={setData}
                                        />
                                    )}
                                    {/* file type accept  */}
                                    <div className="my-3">
                                        <input
                                            id="required"
                                            type="checkbox"
                                            className="p-2 rounded-md me-3"
                                            defaultChecked={data.loopable}
                                            onChange={(e) => hanldeFileType(e)}
                                        />
                                        <label htmlFor="required">
                                            Accepted File Types
                                        </label>
                                    </div>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit.
                                    </p>
                                    {openFileType && (
                                        <FileTypeAccept
                                            data={data}
                                            setData={setData}
                                        />
                                    )}
                                    {/* file dimension  */}
                                    <div className="my-3">
                                        <input
                                            id="required"
                                            type="checkbox"
                                            className="p-2 rounded-md me-3"
                                            defaultChecked={data.loopable}
                                            onChange={(e) =>
                                                hanldeFileDimension(e)
                                            }
                                        />
                                        <label htmlFor="required">
                                            Accepted File Dimensions
                                        </label>
                                    </div>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit.
                                    </p>
                                    {openFileDimension && (
                                        <FileDimension
                                            data={data}
                                            setData={setData}
                                        />
                                    )}
                                </div>
                                <div id="defaultValue" className="m-5">
                                    <h3 className="text-2xl font-bold">
                                        Default Value
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    {data.type !== "file" && (
                                        <div className="my-3">
                                            <input
                                                onChange={e => setData('default_value', e.target.value)}
                                                type="text"
                                                className="w-full rounded-md"
                                                placeholder="Your Default Value"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div id="apperance" className="m-5">
                                    <h3 className="text-2xl font-bold">
                                        Apperance
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    <div className="my-3">
                                        <input
                                            onChange={e => setData('helper_text', e.target.value)}
                                            type="text"
                                            className="w-full rounded-md"
                                            placeholder="Helper Text"
                                        />
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button 
                                        type="submit"
                                        className="p-2 rounded-md bg-slate-800 text-white">
                                        Submit 
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Rodal>
        </div>
    );
};

export default EditField;
