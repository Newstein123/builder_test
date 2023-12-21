import { router, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Rodal from "rodal";

const CreateFile = ({ visible, setVisible }) => {
    const {parent_id} = usePage().props;
    const {data, setData, reset}  = useForm({
        name : '',
        type : 'file',
        file : '',
        parent_id  : parent_id
    })

    function submit(e) {
        e.preventDefault();
        router.post(route('media.store'), data, {
            forceFormData : true,
            onSuccess : () => {
                setVisible(false);
                reset();
                toast.success("File created successfully");
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }
    return (
        <div>
            <Rodal
                visible={visible}
                onClose={() => setVisible(false)}
                width={400}
                height={300}
            >
                <form onSubmit={submit}>
                    <div className="my-3">
                        <label htmlFor="name" className="text-xl font-bold">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="p-2 w-full rounded-md my-3"
                            onChange={e => setData('name', e.target.value)}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="file"> Upload File </label>
                        <input
                            type="file"
                            name="file"
                            className="p-2 w-full rounded-md my-3"
                            onChange={e => setData('file', e.target.files[0])}
                        />
                    </div>
                    <div className="text-end my-3">
                        <button type="submit" className="p-2 bg-slate-900 text-white rounded-md"> Save </button>
                    </div>
                </form>
            </Rodal>
        </div>
    );
};

export default CreateFile;
