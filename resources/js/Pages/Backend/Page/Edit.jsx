import React, { useContext, useState } from "react";
import Rodal from "rodal";
import MyCodeEditor from "@/Components/Template/MyCodeEditor";
import { PageContext } from "@/Context/PageContext";
import { router, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

const Edit = () => {
    const {page} = usePage().props;
    const {editVisible, setEditVisible} = useContext(PageContext)
    const [errors, setErrors ] = useState([])

    const {data, setData, reset} = useForm({
        'name' : page?.name,
        'value' : page?.value,
        'content' : page?.content,
    })

    function submit (e) {
        e.preventDefault();
        router.put(route('page.update', page.id), data, {
            onSuccess : () => {
                reset()
                setEditVisible(false)
                toast.success('Updated');
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
                <h2 className="text-2xl font-bold"> Edit Page Data </h2>
                {page && (
                    <div>
                        <form onSubmit={submit}>
                            {/* Name */}
                            <div className="my-3">
                                <p className="text-xl font-bold"> Name </p>
                                <input
                                    value={data.name}
                                    type="text"
                                    className="p-2 rounded-md w-full"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </div>
                            {/* Variable Used in Layout  */}
                            <div className="my-3">
                                <p className="text-xl font-bold">
                                    Variable Name
                                </p>
                                <input
                                    value={data.value}
                                    type="text"
                                    className="p-2 rounded-md w-full"
                                    onChange={(e) =>
                                        setData("value", e.target.value)
                                    }
                                />
                            </div>
                            {/* Content  */}
                            <div className="my-3">
                                <MyCodeEditor
                                    value={data.content}
                                    setData={setData}
                                    data="content"
                                    lang="html"
                                    name="Add Content"
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
