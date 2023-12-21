import { TemplateContext } from "@/Context/TemplateContext";
import React from "react";
import { useContext } from "react";
import Rodal from "rodal";
import { router, useForm, usePage } from "@inertiajs/react";
import "./app.css";
import { useState } from "react";
import toast from "react-hot-toast";
import MyCodeEditor from "@/Components/Template/MyCodeEditor";

const Edit = ({}) => {
    const { editVisible, setEditVisible } = useContext(TemplateContext);
    const { template } = usePage().props;
    const [errors, setErrors] = useState([]);

    const { data, setData, reset } = useForm({
        layout: template?.layout,
        content: template?.content,
        css: template?.css,
        js: template?.js,
        scripts: template?.scripts,
        links: template?.links,
        css_assets: null,
        js_assets: null,
    });

    function submit(e) {
        e.preventDefault();
        router.post(route("template.update", template.id), {
            _method : 'put',
            data : data,
        } , {
            forceFormData : true,
            onSuccess: () => {
                toast.success("Template Updated Successfully");
                setEditVisible(false);
                reset();
            },
            onError: (err) => {
                setErrors(err);
            },
        });
    }

    return (
        <div>
            <Rodal
                visible={editVisible}
                onClose={() => setEditVisible(false)}
                width={1200}
                height={600}
            >
                {template && (
                    <div>
                        <form onSubmit={submit}>
                            {/* layout  */}
                            <div className="my-3">
                                <MyCodeEditor
                                    value={data.layout}
                                    setData={setData}
                                    data="layout"
                                    lang="html"
                                    name="Add Layout"
                                />
                            </div>
                            {/* Js  */}
                            <div className="my-3">
                                <MyCodeEditor
                                    value={data.js}
                                    setData={setData}
                                    data="js"
                                    lang="js"
                                    name="Add Javascript Code"
                                />
                            </div>
                            {/* css */}
                            <div className="my-3">
                                <MyCodeEditor
                                    value={data.css}
                                    setData={setData}
                                    data="css"
                                    lang="css"
                                    name="Add Css Code"
                                />
                            </div>
                            {/* css links  */}
                            <div className="my-3">
                                <MyCodeEditor
                                    value={data.links}
                                    setData={setData}
                                    data="links"
                                    lang="css"
                                    name="Add Css Links"
                                />
                            </div>
                            {/* js scripts  */}
                            <div className="my-3">
                                <MyCodeEditor
                                    value={data.scripts}
                                    setData={setData}
                                    data="scripts"
                                    lang="js"
                                    name="Add Scripts Links"
                                />
                            </div>
                            {/* css assets files  */}
                            <div className="my-3">
                                <label htmlFor="css_assets" className="text-xl font-bold">
                                     Add Css Asset Files 
                                </label>
                                <input
                                    type="file"
                                    className="p-2 my-3 w-full rounded-md border-2 border-slate-500"
                                    name="css_assets"
                                    onChange={(e) => setData('css_assets', e.target.files)}
                                    multiple
                                />
                            </div>
                            {/* js assets files  */}
                            <div className="my-3">
                                <label htmlFor="js_assets" className="text-xl font-bold"> 
                                    Add Js Asset Files 
                                </label>
                                <input
                                    type="file"
                                    className="p-2 my-3 w-full rounded-md border-2"
                                    name="js_assets"
                                    onChange={(e) => setData('js_assets', e.target.files)}
                                    multiple
                                />
                            </div>
                            <div className="text-end">
                                <button
                                    type="submit"
                                    className="p-2 bg-black text-white rounded-md"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </Rodal>
        </div>
    );
};

export default Edit;
