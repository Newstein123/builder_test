import React from 'react';
import { router, usePage, useForm} from "@inertiajs/react";
import {useContext, useState} from "react"
import Rodal from "rodal";
import MyCodeEditor from "@/Components/Template/MyCodeEditor";
import toast from "react-hot-toast";
import { ComponentContext } from '@/Context/ComponentContext';
import '../Template/app.css'

const Edit = () => {
    const { editVisible, setEditVisible } = useContext(ComponentContext);
    const { cpt_design} = usePage().props;
    const [errors, setErrors] = useState([]);

    const { data, setData, reset } = useForm({
        content: cpt_design?.content,
        skeleton: cpt_design?.skeleton,
    });

    function submit(e) {
        e.preventDefault();
        router.put(route('component.design.update', cpt_design.id), data, {
            onSuccess : () => {
                toast.success('ComponentDesign Updated Successfully');
                setEditVisible(false)
                reset();
            },
            onError : (err) => {
                setErrors(err)
            }
        })
    }
    return (
        <div>
            <Rodal
                visible={editVisible}
                onClose={() => setEditVisible(false)}
                width={1200}
                height={600}
            > 
            <h2 className="text-2xl font-bold"> Edit Component Design Data </h2>
                {cpt_design && (
                    <div>
                        <form onSubmit={submit}>
                            {/* content  */}
                            <div className="my-3">
                                <MyCodeEditor
                                    value={data.content}
                                    setData={setData}
                                    data="content"
                                    lang="html"
                                    name="Add Content"
                                />
                            </div>
                            {/* skeleton  */}
                            <div className="my-3">
                                <MyCodeEditor
                                    value={data.skeleton}
                                    setData={setData}
                                    data="skeleton"
                                    lang="html"
                                    name="Add Skeleton Structure"
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